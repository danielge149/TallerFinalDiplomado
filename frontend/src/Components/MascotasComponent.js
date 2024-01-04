import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { FaSignInAlt } from 'react-icons/fa';

const MascotasComponent = () => {
  const url = "http://localhost:8000/mascotas";
  const [mascotasOriginales, setMascotasOriginales] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const mascotasPerPage = 3;
  const [busqueda, setBusqueda]= useState("");

  useEffect(() => {
    getMascotas();
  }, []);

  // Función para obtener mascotas desde la API
  const getMascotas = async () => {
    // Realiza una solicitud GET a la URL específica (asumiendo que url está definida)
    const response = await axios.get(`${url}/buscarMascota`);
    // Actualiza tanto la lista original de mascotas como la lista actual con los datos obtenidos
    setMascotasOriginales(response.data);
    setMascotas(response.data);
  };
  // Función que se ejecuta cada vez que hay un cambio en el input de búsqueda
  const handleChange = (e) => {
    // Almacena el término de búsqueda en el estado busqueda
    const terminoBusqueda = e.target.value;
    setBusqueda(terminoBusqueda);
    console.log('busqueda' + terminoBusqueda);
    // Si el término de búsqueda está vacío, restaura la lista original de mascotas
    if (terminoBusqueda.trim() === "") {
      setMascotas(mascotasOriginales);
    } else {
      // Si hay un término de búsqueda, llama a la función filtrar para actualizar la lista de mascotas
      filtrar(terminoBusqueda);
    }
  };
  // Función que filtra las mascotas en base al término de búsqueda
  const filtrar = (terminoBusqueda) => {
    // Filtra las mascotas originales en función del término de búsqueda
    var resultadosBusqueda = mascotasOriginales.filter((elemento) => {
      return (
        elemento.raza.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        elemento.edad.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    });
    // Actualiza la lista de mascotas con los resultados de la búsqueda
    setMascotas(resultadosBusqueda);
  };
  
  // Función que maneja el cambio de página en la paginación
  const handlePageClick = (data) => {
    // Actualiza la página actual según la información proporcionada por el parámetro data.selected
    setCurrentPage(data.selected);
  };



  const offset = currentPage * mascotasPerPage;
  const currentMascotas = mascotas.slice(offset, offset + mascotasPerPage);

  return (
    <div className="App">
      <div className="container" style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
        <div style={{ marginRight: '20px' }}>
          <img src="/mascota.webp" alt="Toggle Navigation" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
        </div>
        
          <input
            className="form-control text-center containerInput"
            value={busqueda}
            placeholder="Búsqueda por Raza o Edad"
            onChange={handleChange}
            style={{ width: '100%', border: '3px solid #ccc', borderRadius: '5px', padding: '8px', marginLeft:'100px' }}
          />
        
        <ul className="navbar-nav" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <li className="nav-item">
            <Link className="nav-link" to="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
              <FaSignInAlt style={{ fontSize: '20px' }} /> Iniciar sesión
            </Link>
          </li>
          {/* Agrega más elementos según tus necesidades */}
        </ul>
      </div>

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {currentMascotas.map((mascota) => (
                <div key={mascota.id_mascota} className="col">
                  <div className="card">
                    <h5 className="card-title text-center">{mascota.nombre}</h5>
                    <img
                      src={`http://localhost:8000/imagenes/${mascota.imagen}`}
                      alt={`Imagen de ${mascota.nombre}`}
                      style={{ width: '100%', height: '300px' }}
                    />
                    <div className="card-body">
                      <p className="card-text mb-1">
                        <strong>Tipo:</strong> {mascota.tipo}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Raza:</strong> {mascota.raza}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Edad:</strong> {mascota.edad}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Descripción:</strong> {mascota.descripcion}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Disponible:</strong>{" "}
                        {mascota.disponible ? "Sí" : "No"}
                      </p>
                      <div className="d-flex justify-content-between ">
                        <Link to={`/detalles/${mascota.id_mascota}`} className="btn btn-info">
                          <i className="fa-solid fa-eye"></i> Detalles
                        </Link>
                        <Link to={`/adoptar/${mascota.id_mascota}`} className="btn btn-success">
                          <i className="fa-solid fa-heart"></i> Adoptar
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination-container text-center mt-4">
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                breakLabel={"..."}
                pageCount={Math.ceil(mascotas.length / mascotasPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// EXPORT
export default MascotasComponent;
