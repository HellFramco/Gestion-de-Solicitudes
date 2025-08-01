import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";

import Show from "./show";
import Create from "./create";
import Update from "./update";

import Modal from "../../components/modalDashboard";
import IconSVG from "../../components/icon";
import SeacrhData from "../../components/searchData";

import ViewToggle from "../../components/viewToggle";
import SortFilter from "../../components/sortFilter";

import ListView from "../../components/listView";
import CardView from "../../components/cardView";

const DeleteModal = ({ projectName, onConfirm, onCancel }) => {
  const [deleteType, setDeleteType] = useState("soft");

  return (
    <div className="delete-modal-content">
      <div className="mb-3">
        <h5>¿Estás seguro de que deseas eliminar este proyecto?</h5>
        <p><strong>Proyecto:</strong> {projectName}</p>
      </div>

      <div className="mb-3">
        <label htmlFor="deleteType" className="form-label">Tipo de eliminación:</label>
        <select
          id="deleteType"
          className="form-select"
          value={deleteType}
          onChange={(e) => setDeleteType(e.target.value)}
        >
          <option value="soft">Eliminación suave (soft)</option>
          <option value="hard">Eliminación permanente (hard)</option>
        </select>
        <div className="form-text">
          {deleteType === "soft"
            ? "El proyecto será desactivado pero sus datos se mantendrán en la base de datos."
            : "El proyecto será eliminado permanentemente de la base de datos. Esta acción no se puede deshacer."}
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button
          type="button"
          className={`btn ${deleteType === "hard" ? "btn-danger" : "btn-warning"}`}
          onClick={() => onConfirm(deleteType)}
        >
          {deleteType === "hard" ? "Eliminar permanentemente" : "Desactivar proyecto"}
        </button>
      </div>
    </div>
  );
};

const Emplooyes = () => {
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();
  const [activeMenuActions, setActiveMenuActions] = useState(null);
  const menuRef = useRef(null);
  const [viewType, setViewType] = useState("cards");
  const [sortConfig, setSortConfig] = useState({ key: "dateCreation", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");

  const API_URL = "${import.meta.env.VITE_API_URL}";
  const DELETE_API_URL = "https://back-endsistemadegestiondeproyectos-production.up.railway.app/api/projects/delete";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuActions(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    axios.get(API_URL + "/api/projects/getAll", {
      headers: { session_token: token, "Content-Type": "application/json" },
      params: { page: currentPage, limit: itemsPerPage },
    })
    .then((response) => {
      const rawData = response.data?.data;
      if (!Array.isArray(rawData)) return;
      const cleanedData = rawData.map((item) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        status: item.status,
        priority: item.priority,
        startDate: item.startDate,
        endDate: item.endDate,
        managerId: item.managerId,
        developers: item.developersIds,
      }));
      setApiData(cleanedData);
    })
    .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSort = (value) => {
    const sortOptions = {
      fechaDesc: { key: "dateCreation", direction: "desc" },
      fechaAsc: { key: "dateCreation", direction: "asc" },
      nombreAsc: { key: "username", direction: "asc" },
      nombreDesc: { key: "username", direction: "desc" },
      emailAsc: { key: "email", direction: "asc" },
      emailDesc: { key: "email", direction: "desc" },
      tipoAsc: { key: "type", direction: "asc" },
      tipoDesc: { key: "type", direction: "desc" },
    };
    if (sortOptions[value]) setSortConfig(sortOptions[value]);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredData = apiData.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm) ||
    item.description?.toLowerCase().includes(searchTerm)
  );

  const executeDelete = (projectId, deleteType) => {
    axios.delete(DELETE_API_URL, {
      headers: { session_token: token, "Content-Type": "application/json" },
      data: { projectId, deleteType },
    })
    .then(() => {
      toast.success(deleteType === "hard" ? "Proyecto eliminado permanentemente" : "Proyecto desactivado con éxito");
      closeModal();
      fetchData();
    })
    .catch(() => toast.error("Error al eliminar el proyecto"));
  };

  const handleDelete = (projectId, projectName) => {
    setIsModalOpen(true);
    setModalContent(
      <DeleteModal
        projectName={projectName}
        onConfirm={(deleteType) => executeDelete(projectId, deleteType)}
        onCancel={closeModal}
      />
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleChangecrear = () => {
    toast.success("Se gestionaron los datos con éxito");
    closeModal();
    fetchData();
  };

  const handleChangeeditar = () => {
    toast.success("Se editaron los datos con éxito");
    closeModal();
    fetchData();
  };

  const handleCreateClick = (FormComponent) => {
    setIsModalOpen(true);
    setModalContent(<FormComponent onSubmitState={handleChangecrear} />);
  };

  const handleEditClick = (FormComponent, ...props) => {
    setIsModalOpen(true);
    setModalContent(<FormComponent onUPSubmitState={handleChangeeditar} {...props} />);
  };

  const handleShowClick = (FormComponent, ...props) => {
    setIsModalOpen(true);
    setModalContent(<FormComponent onUPSubmitState={handleChangeeditar} {...props} />);
  };

  const actionMenuProps = (item) => {
    const realItem = apiData.find((i) => String(i.id) === String(item.id));
    const isActive = String(activeMenuActions) === String(realItem?.id);
    return {
      isActive,
      onClose: () => setActiveMenuActions(null),
      actions: [
        {
          label: 'Tareas',
          icon: 'IconPermisos',
          onClick: () => navigate('/dashboard/allocationTasks', { state: { id_proyect: item.id } }),
        },
        {
          label: "Ver",
          icon: "IconVer",
          onClick: () => handleShowClick(Show, realItem),
        },
        {
          label: "Editar",
          icon: "IconEditar",
          onClick: () => handleEditClick(Update, realItem),
          className: "menu_acciones_editar",
        },
        {
          label: "Eliminar",
          icon: "IconEliminar",
          onClick: () => handleDelete(String(realItem.id), realItem.name),
          className: "menu_acciones_eliminar",
        },
      ],
    };
  };

  return (
    <div className="dashboard_content">
      <main className="main__dashboard_content">
        <div className="form_content">
          <section className="dashboard_titulo">
            <h2>Empleados</h2>
          </section>
          <div className="main__dashboard_primera_parte">
            <div className="btn_nuevo_dashboard" onClick={() => handleCreateClick(Create)}>
              <IconSVG name="Icon_mas_talentic" /> Crear Nuevo
            </div>
          </div>
          <div className="form_content_dashboard">
            <div className="filters_dashboard">
              <div className="buscador_dashboard">
                <SeacrhData searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
              </div>
              <div className="filtros_content_dashboard">
                <SortFilter sortConfig={sortConfig} onSortChange={handleSort} />
                <ViewToggle viewType={viewType} showCards={() => setViewType("cards")} showList={() => setViewType("list")} />
              </div>
            </div>
            {viewType === "cards" ? (
              <div className="layout_cards">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <CardView
                      key={item.id}
                      titulo={item.name}
                      subtitulo={item.description}
                      parrafo="2024-08-26 14:01:51"
                      actionMenuProps={actionMenuProps}
                      item={item}
                      toggleMenuActions={setActiveMenuActions}
                      svg="IconProyectos"
                    />
                  ))
                ) : (
                  <p>No se encontraron registros</p>
                )}
              </div>
            ) : (
              <div className="layout_list_dashboard">
                <table>
                  <thead>
                    <tr>
                      <th onClick={() => handleSort("nombreAsc")}><h4>Nombre<IconSVG name="IconFlechas" /></h4></th>
                      <th><h4>Descripción</h4></th>
                      <th><h4>Fecha</h4></th>
                      <th><h4>Acciones</h4></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <ListView
                          key={item.id}
                          titulo={item.name}
                          subtitulo={item.description}
                          parrafo="2024-08-26 14:01:51"
                          actionMenuProps={actionMenuProps}
                          item={item}
                          toggleMenuActions={setActiveMenuActions}
                          svg="IconProyectos"
                        />
                      ))
                    ) : (
                      <tr><td colSpan={4}>No se encontraron registros</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="pagination_controls">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Anterior</button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Siguiente</button>
          </div>
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={closeModal} titulo={"Empleados"}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Emplooyes;
