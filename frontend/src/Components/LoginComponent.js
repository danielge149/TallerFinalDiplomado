// En el componente IniciarSesion:
//importaciones
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { mostrarAlerta } from "../functions.js";

const IniciarSesion = () => {
  // Estado local para almacenar el nombre y la contraseña
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Hook de navegación para redireccionar después del inicio de sesión
  const navigate = useNavigate();

  // Función para manejar cambios en el input del nombre de usuario
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  // Función para manejar cambios en el input de la contraseña
  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };
  
  //Funcion iniciar sesión 
  const handleIniciarSesion = async () => {
    try {
      // Realizar la solicitud al servidor para autenticar al usuario
      const response = await axios.post('http://localhost:8000/usuarios/autenticarUsuario', {
        nombre,
        contrasena,
      });

      // Verificar la respuesta del servidor
      if (response.data.autenticado) {
        // Si el usuario es autenticado, redirigir a la página de admin o a donde desees
        mostrarAlerta('inicio de sesión exitoso', response)
        navigate('/admin');
      } else {
        // Manejar el caso en que la autenticación falla
        mostrarAlerta(`Error: ${response.data.mensaje}`);
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión', error);
      mostrarAlerta('Error al intentar iniciar sesión', error);

      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado diferente de 2xx
        mostrarAlerta(`Error: ${error.response.data.mensaje}`);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        mostrarAlerta('Error: No se recibió respuesta del servidor.');
      } else {
        // Algo sucedió en la configuración de la solicitud que provocó un error
        mostrarAlerta('Error interno del cliente.');
      }
    }
  };

  // Función para manejar el botón de regreso
  const handleRegresar = () => {
    // Navegar de vuelta a la página principal
    navigate("/");
  };

  return (
    <div className="login-container text-center">
      <h2>Iniciar Sesión</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre de Usuario:</label>
          <input 
            type="text"
            id="nombre" 
            className="form-control custom-input" // Clase personalizada para estilos adicionales
            placeholder="Nombre"
            value={nombre} 
            onChange={handleNombreChange} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña:</label>
          <input 
            type="password" 
            id="contrasena" 
            className="form-control custom-input" // Clase personalizada para estilos adicionales
            placeholder="Contraseña"
            value={contrasena} 
            onChange={handleContrasenaChange} 
          />
        </div>
        <button
          type="button"
          onClick={handleIniciarSesion}
          className="btn btn-success custom-btn"
        >
          <i className="fa-solid fa-heart"></i> Logiarse
        </button>

        <button
          className="btn btn-danger custom-btn"
          onClick={handleRegresar}
        >
          <i className="fa-solid fa-arrow-left"></i> Regresar
        </button>

      </form>
    </div>
  );
};

export default IniciarSesion;
