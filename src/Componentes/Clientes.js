import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from './Loader';

export const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const location = useLocation();

    function eliminarCliente(idCliente) {
           fetch(
            "https://localhost:7062/api/Clientes/EliminarCliente/" + idCliente,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la respuesta");
                }
            })
            .then(() => {
               alert("Usuario eliminado. En breve se actualizará la página")
            })
            .catch((error) => console.log(error + "Error en la llamada"));


            fetch("https://localhost:7062/api/Clientes")
            .then((response) => response.json())
            .then((data) => {
                setClientes(data);
            });
            
    }

    useEffect(() => {
        // Mostrar el loader inicialmente
        setShowLoader(true);
    
        if (location.pathname !== "/" && clientes == []) {
            setShowLoader(false);
        } else {
            fetch("https://localhost:7062/api/Clientes")
                .then((response) => response.json())
                .then((data) => {
                    setClientes(data);
                    setShowLoader(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setShowLoader(false); 
                });
        }
    }, [location.pathname]);
    return (
      <>
        {showLoader ? (
          <Loader setShowLoader={setShowLoader}/>
        ) : (
          <div>
            <div style={{padding:'2%'}}>
              <Link to="/NuevoCliente"  className="button btn-nuevo">
                Nuevo cliente
              </Link>
            </div>
            <div className='table-container'>
              <table border={1}>
                <thead>
                  <tr>
                    <td>IdCliente</td>
                    <td>email</td>
                    <td>Nombre</td>
                    <td>Apellido</td>
                    <td>Empresa</td>
                    <td>fecha creación</td>
                    <td>País</td>
                    <td>Acciones</td>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td key={item.idCliente}>{item.idCliente}</td>
                        <td>{item.email}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido}</td>
                        <td>{item.empresa}</td>
                        <td>{item.fechaCreacion}</td>
                        <td>{item.pais}</td>
                        <td>
                          <Link
                            to={`/EditarCliente/${item.idCliente}`}
                            state={{ from: item.idCliente }}
                            className="button btn-warning"
                          >
                            Editar cliente
                          </Link>
                          <button
                            className="button btn-danger"
                            onClick={() => eliminarCliente(item.idCliente)}
                          >
                            Eliminar Cliente
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    );
}
