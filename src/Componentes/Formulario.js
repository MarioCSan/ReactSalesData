import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const Formulario = ({idCliente}) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [fechaCreacion, setFechaCreacion] = useState("");
    const [pais, setPais] = useState("");
  
    const urlbase = `https://localhost:7062/api/Clientes/ModificarCliente/${idCliente}`;
  
    console.log(idCliente)

    const cambiarFormatofecha = (fechaCreacion) =>{

        const fecha = new Date(fechaCreacion.replace(' ', 'T'));

        if (!isNaN(fecha)) {
        const fechaISO = fecha.toISOString();
        setFechaCreacion(fechaISO)
        } else {
        console.log("La fecha en formato texto no es válida.");
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        cambiarFormatofecha(fechaCreacion)
        if (idCliente === undefined){
            fetch(
              "https://localhost:7062/api/Clientes/CrearCliente?email=" +
                email +
                "&nombre=" +
                nombre +
                "&apellido=" +
                apellido +
                "&empresa=" +
                empresa +
                "&pais=" +
                pais,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((response) => {
                if (response.ok) {
                  alert("Usuario insertado con éxito");
                }
              })
              .then((data) => {
                console.log(data);
              });
        } else{

            let urlCompleta = urlbase + '?email=' + email + '&nombre=' + nombre + '&apellido=' + apellido + '&empresa=' + empresa + '&fechaCreacion=' + fechaCreacion + '&pais=' + pais
            fetch(urlCompleta, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(res => {
              if (res.ok){
                  alert("Usuario modificado con éxito")
              }
            })
            .catch(error => console.error('Error:', error));
        }
    
  
  
        
      // Reiniciar el form
      setEmail('')
      setNombre('')
      setApellido('')
      setEmpresa('')
      setPais('')
  
    };
  
  
    return (
      <>
        <h1>Formulario {idCliente === undefined ? ('nuevo cliente') : ('modificar cliente')}</h1>
        <div className="form-container">
          <div >
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="apellido">Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="alta">Empresa</label>
                <input
                  id="empresa"
                  type="text"
                  placeholder="Empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="alta">Fecha creacion</label>
                <input
                  id="empresa"
                  type="date"
                  value={fechaCreacion}
                  onChange={(e) => setFechaCreacion(e.target.value)}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="pais">País</label>
                <input
                  id="pais"
                  placeholder="País"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                />
              </div>

              <input
                type="submit"
                className="button"
                style={{ backgroundColor: "green" }}
              />
            </form>
          </div>
          <div style={{paddingTop: '20%'}}>
            <Link to="/" className="button btn-nuevo" >
              Volver a inicio
            </Link>
          </div>
        </div>
      </>
    );
}
