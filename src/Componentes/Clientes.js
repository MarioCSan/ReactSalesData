import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from './Loader';

export const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [errorApi, setErrorApi] = useState(false);
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
                   setErrorApi(true)
                }
            })
            .then(() => {
              setClientes(
                clientes.filter((cliente) => cliente.idCliente !== idCliente)
              );
               alert("Usuario eliminado")
              
            })
            .catch(() => setErrorApi(true));


           
    }

    useEffect(() => {
      if (location.pathname !== "/") {
        setShowLoader(false);
      }

      if (clientes.length === 0) {
        setShowLoader(true);
      }

      fetch("https://localhost:7062/api/Clientes")
        .then((response) => {
          if (!response.ok) {
            setErrorApi(true);
          }
        })
        .then((data) => {
          setClientes(data);
          setShowLoader(false);
        })
        .catch(() => setErrorApi(true));
    }, [location.pathname, clientes]);

    return (
      <>
        {showLoader ? (
          <Loader setShowLoader={setShowLoader} />
        ) : (
          <div>
            {errorApi ? (
              <div className='centered-container'>
                <h1>Hay un problema con la recuperación de los datos.</h1>
                <h2>No se puede acceder a la API.</h2>
                <h3>Comprueba que todo este bien conectado</h3>
              </div>
            ) : (
              <div>
                <div style={{ padding: "2%" }}>
                  <Link to="/NuevoCliente" className="button btn-nuevo">
                    Nuevo cliente
                  </Link>
                </div>
                <div className="table-container">
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
          </div>
        )}
      </>
    );
}
