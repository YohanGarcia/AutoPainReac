import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

const Empleado = () => {

    const [name, setName] = useState('')
    const [lestname, setLestname] = useState('')
    const [telefono, setTelefono] = useState('')
    const [cedula, setCedula] = useState('')
    const [direccion, setDireccion] = useState('')
    const [codigo_postal, setCodigoPT] = useState('')

    const [empleados, setEmpleados] = useState([])

    const getEmpleados = async () => {
        const res = await fetch("/empleados")
        const data = await res.json();
        console.log(data);
        setEmpleados(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/empleados", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                lestname,
                telefono,
                cedula,
                direccion,
                codigo_postal
            }),
        });
        const data = await res.json();
        console.log(data);
        await getEmpleados();
        setName('');
        setLestname('');
        setTelefono('');
        setCedula('');
        setDireccion('');
        setCodigoPT('')
    }

    useEffect(() => {
        getEmpleados();
    }, []);

    return (
        <>
            <div className="card-body">
                <div className="row">
                    <div className="col-xl-8 col-md-12 m-b-30">
                        <h5>Registrar Empleado</h5>
                        <hr />
                        <form onSubmit={handleSubmit}>
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
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        onChange={e => setDireccion(e.target.value)}
                                        value={direccion}
                                        placeholder="Direccion"
                                        className="mb-3 form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        onChange={e => setCodigoPT(e.target.value)}
                                        value={codigo_postal}
                                        placeholder="Codigo Postal"
                                        className="mb-3 form-control"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                               Registrar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-xl-8 col-md-12 m-b-30">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Today</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active show" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">This Week</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">All</a>
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
                                        empleados.map(empleado => (
                                            <tr key={empleado.id}>
                                                <td>
                                                    <h6 className="m-0">
                                                        {empleado.name} {empleado.lestname}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h6 className="m-0">
                                                        {empleado.telefono}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h6 className="m-0">
                                                        {empleado.fecha}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <h6 className="m-0">
                                                        {empleado.cedula ? `${empleado.cedula}` : 'No hay Datos'}
                                                    </h6>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                    >
                                                        editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        delete
                                                    </button>
                                                    <Link to={`/${empleado.name}${empleado.lestname}/${empleado.id}/vehiculos`}>
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

export default Empleado
