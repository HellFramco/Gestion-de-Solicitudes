import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import BtnSubmitDashboard from '../../components/btnSubmitDashboard';
import InputDashboard from '../../components/inputDashboard';

const Create = ({ onSubmitState }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    fechaIngreso: '',
    salario: '',
  });

  const API_URL_POST = 'https://back-endsistemadegestiondeproyectos-production.up.railway.app/api/projects/create';
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { nombre, fechaIngreso, salario } = formData;

    const requestBody = {
      nombre: nombre,
      fechaIngreso: fechaIngreso,
      salario: salario,
    };

    try {
      await axios.post(API_URL_POST, requestBody, {
        headers: {
          'session_token': token || '',
          'Content-Type': 'application/json',
        },
      });

      setFormData({
        nombre: '',
        fechaIngreso: '',
        salario: '',
      });

      onSubmitState(true);
    } catch (error) {
      console.error('Error creating data:', error);
      toast.error('Hubo un error al crear. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="modal_user_content">
      <form className="modal_form" method="POST" onSubmit={handleCreate}>
        <div className="modal_form_item">
          <InputDashboard
            name="nombre"
            label="Nombre"
            placeholder="nombre"
            value={formData.nombre}
            onChange={handleChange}
            colClassName=""
          />
        </div>
        <div className="modal_form_item">
          <InputDashboard
            name="fechaIngreso"
            label="Fecha Ingreso"
            placeholder="fecha de ingreso"
            value={formData.fechaIngreso}
            onChange={handleChange}
            colClassName=""
          />
        </div>
        <div className="modal_form_item">
          <InputDashboard
            name="salario"
            label="Salario"
            placeholder="salario"
            value={formData.salario}
            onChange={handleChange}
            colClassName=""
          />
        </div>
        <BtnSubmitDashboard text="Guardar" />
      </form>
    </div>
  );
};

export default Create;
