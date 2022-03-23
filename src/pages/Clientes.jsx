import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Clientes = () => {

    const [name, setName] = useState('')
    const [lestname, setLestname] = useState('')
    const [telefono, setTelefono] = useState('')
    const [cedula, setCedula] = useState('')

    const [clientes, setClientes] = useState([])
    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')


    //Recibir los datos del formulario y enviarlo a la api
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing) {
            const res = await fetch("/clientes", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    lestname,
                    telefono,
                    cedula
                }),
            });
            const data = await res.json();
            console.log(data);
        } else {
            const res = await fetch(`/clientes/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    lestname,
                    telefono,
                    cedula
                }),
            });
            const data = await res.json();
            console.log(data);
            setEditing(false);
            setId('');
        }

        await getClientes();

        setName('');
        setLestname('');
        setTelefono('');
        setCedula('');
    }
    //optener los datos de la api
    const getClientes = async () => {
        const res = await fetch("/clientes")
        const data = await res.json();
        setClientes(data);
    }

    //Eliminar datos de la api
    const deleteCliente = async (id) => {
        const res = await fetch(`/clientes/${id}`, {
            method: 'DELETE'
        });
        await res.json();
        await getClientes();
    }
    //Editar datos de la api
    const editCliente = async (id) => {
        const res = await fetch(`/clientes/${id}`)
        const data = await res.json();

        setEditing(true);
        setId(id);
        setName(data.name);
        setLestname(data.lestname);
        setTelefono(data.telefono);
        setCedula(data.cedula)
    }


    useEffect(() => {
        getClientes();
    }, [])
    return (
        <>
            <div className="card-body">
                <div className="row">
                    <div className="col-xl-8 col-md-12 m-b-30">
                        <h5>Registrar Cliente</h5>
                        <hr />
                        <form onSubmit={handleSubmit} >
                            <div className="row">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        autoFocus
                                        placeholder="Nombre"
                                        className="mb-3 form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        onChange={e => setLestname(e.target.value)}
                                        value={lestname}
                                        placeholder="Apellido"
                                        className="mb-3 form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        onChange={e => setTelefono(e.target.value)}
                                        value={telefono}
                                        placeholder="Número  Telefónico"
                                        className="mb-3 form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        onChange={e => setCedula(e.target.value)}
                                        value={cedula}
                                        placeholder="Cedula de Identidad"
                                        className="mb-3 form-control"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                {editing ? "Update" : "Create"}
                            </button>
                        </form>
                    </div>
                </div>
              
                <div className="col-xl-8 col-md-12 m-b-30">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Lista de Clientes registados</a>
                        </li>
                        
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Telefono</th>
                                        <th>Fecha</th>
                                        <th>Cedula de Identidad</th>
                                        <th>Operaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clientes.map(cliente => (
                                            <tr key={cliente.id}>
                                                <td>
                                                    <h6 className="m-0">
                                                        {cliente.name} {cliente.lestname}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h6 className="m-0">
                                                        {cliente.telefono}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h6 className="m-0">
                                                        {cliente.fecha}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h6 className="m-0">
                                                        {cliente.cedula ? `${cliente.cedula}` : 'No hay Datos'}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={(e) => editCliente(cliente.id)}
                                                    >
                                                        editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={(e) => deleteCliente(cliente.id)}
                                                    >
                                                        delete
                                                    </button>
                                                    <Link to={`/${cliente.name}${cliente.lestname}/${cliente.id}/vehiculos`}>
                                                        <button
                                                            className="btn btn-info btn-sm"
                                                        >
                                                            asinar coche
                                                        </button>
                                                    </Link>

                                                </td>
                                            </tr>
                                        ))

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>


    )
}

export default Clientes;