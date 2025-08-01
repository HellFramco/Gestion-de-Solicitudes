import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import BtnSubmitDashboard from '../../components/btnSubmitDashboard';
import InputDashboard from '../../components/inputDashboard';

const Update = ({
  onUPSubmitState,
  idDefault,
  nameDefault,
  descriptionDefault,
  statusDefault,
}) => {
  const [formData, setFormData] = useState({
    id: idDefault,
    name: nameDefault,
    description: descriptionDefault,
    status: statusDefault,
    priority: '',
    startDate: '',
    endDate: '',
    managerId: '',
    developers: []
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      id: idDefault,
      name: nameDefault,
      description: descriptionDefault,
      status: statusDefault,
    }));
  }, [idDefault, nameDefault, descriptionDefault, statusDefault]);

  const API_URL_PUT = 'https://back-endsistemadegestiondeproyectos-production.up.railway.app/api/projects/put';
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const {
      id,
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
      managerId,
      developers
    } = formData;

    const requestBody = {
      id,
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
      managerId,
      developersIds: developers
    };

    try {
      await axios.put(API_URL_PUT, requestBody, {
        headers: {
          'session_token': token ?? '',
          'Content-Type': 'application/json',
        },
      });

      onUPSubmitState(true);
    } catch (error) {
      console.error('Error al actualizar:', error);
      toast.error('Hubo un error al editar. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="modal_user_content">
      <form className="modal_form" method="POST" onSubmit={handleUpdate}>
        <div className="modal_form_item">
          <InputDashboard
            name="name"
            label="Nombre"
            placeholder="nombre"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="modal_form_item">
          <InputDashboard
            name="startDate"
            label="Fecha Ingreso"
            placeholder="fecha de ingreso"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="modal_form_item">
          <InputDashboard
            name="priority"
            label="Prioridad"
            placeholder="prioridad"
            value={formData.priority}
            onChange={handleChange}
          />
        </div>
        <BtnSubmitDashboard text="Guardar" />
      </form>
    </div>
  );
};

export default Update;
