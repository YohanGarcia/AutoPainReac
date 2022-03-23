import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Asignacion = () => {

    const { cliente_id } = useParams();
    const idCliente = Number(cliente_id)

    const { coche_id } = useParams();
    const vehiculo_id = Number(coche_id);

    const [clientes, setClientes] = useState([]);
    const [tipoDeTrabajos, setTipoDeTrabajos] = useState([]);
    const [precioTrabajo, setPrecioTrabajo] = useState([])
    const [empleados, setEmpleados] = useState([]);
    const [empleadoId, setEmpleadoId] = useState([]);
    const [desabolladuras, setDesabolladuras] = useState([]);
    const [asignaciones, setAsignaciones] = useState([])
    console.log(asignaciones);

    const [tipo_trabjo, setTrabajo_tip] = useState('')
    const [precio, setPrecio] = useState('')
    const [empleado, setEmpleado] = useState('');
    const [desabolladura, setDesabolladura_id] = useState('');

    const precio_trabajo = Number(precio)
    const empleados_id = Number(empleado)
    const desabolladura_id = Number(desabolladura)

    
    //buscando de la tabla asignacion el id del empleado relacionado
    const buscandoIdEmpleado = asignaciones.map(item => {
        return item.empleados_id;
    })

    const trabaId = tipoDeTrabajos.filter(function (item) {
        return item.trabajo_tipo === tipo_trabjo;
    })
    const idTrabajo = trabaId.map(item => {
        return item.id
    })

    const trabaajo_id = Number(idTrabajo)

    const getClientes = async () => {
        const res = await fetch(`/clientes/${idCliente}`)
        const data = await res.json();
        setClientes(data);
    }

    const getTrabajos = async () => {
        const res = await fetch('/trabajos');
        const data = await res.json();
        setTipoDeTrabajos(data)
    }

    const getPrecioTrabajo = async () => {
        const res = await fetch(`/trabajos/preciotrabajo/${trabaajo_id}`);
        const data = await res.json();
        setPrecioTrabajo(data)
    }

    const getEmpleados = async () => {
        const res = await fetch('/empleados');
        const data = await res.json();
        setEmpleados(data);
    }

 

    const getDesabolladuras = async () => {
        const res = await fetch('/desabollador');
        const data = await res.json();
        setDesabolladuras(data);
    }

    const getAsignacion = async () => {
        const res = await fetch(`/asignacion/${vehiculo_id}`)
        const data = await res.json();
        setAsignaciones(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/asignacion', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tipo_trabjo,
                precio_trabajo,
                empleados_id,
                desabolladura_id,
                vehiculo_id
            }),
        });
        const data = await res.json();
        console.log(data);
        await getClientes()

    }

    useEffect(() => {
        getClientes();
        getTrabajos();
        getPrecioTrabajo();
        getEmpleados();
        getDesabolladuras();
        getAsignacion();
    }, [idCliente,vehiculo_id,trabaajo_id]);

    return (
        <>
            <div className="row">
                <div className="col-md-6">

                    {
                        clientes.map((cliente, index) => (
                            <ul key={index} className="list-group">
                                <li className="list-group-item"><strong>Nombre: </strong> {cliente.name} {cliente.lestname}</li>

                                {
                                    cliente.vehiculos.filter(coche => coche.id === vehiculo_id)
                                        .map((vehiculo, index) => (
                                            < >
                                                <li key={index} className="list-group-item"><strong>Marca: </strong>{vehiculo.marca}</li>
                                                <li className="list-group-item"><strong>Modelo: </strong>{vehiculo.modelo}</li>
                                                <li className="list-group-item"><strong>Año: </strong>{vehiculo.age}</li>
                                                <li className="list-group-item"><strong>Color: </strong>{vehiculo.color}</li>
                                                <li className="list-group-item"><strong>Placa: </strong>{vehiculo.placa}</li>
                                                {
                                                    vehiculo.servicios.map((servicio, index) => (
                                                        <ul key={index}>
                                                            <li key={index} className="list-group-item"><strong>Tipo de Servicio: </strong>{servicio.typo} </li>

                                                            {servicio.desabolladuras.map((desabolladura, index) => (
                                                                <ul key={index} >
                                                                    <li className="list-group-item"><strong>Piesa: </strong>{desabolladura.piesa}, <strong>Precio: </strong>RD${desabolladura.precio}</li>
                                                                    {desabolladura.asignacion.map((item, index) => (
                                                                        <ul key={index} >
                                                                            <li className="list-group-item">Id Empleado: {item.empleados_id} Trabajo: {item.tipo_trabjo} Precio: RD${item.precio_trabajo}</li>
                                                                        </ul>
                                                                    ))}
                                                                </ul>
                                                                
                                                            ))}
                                                        </ul>
                                                    ))
                                                }

                                            </>
                                        ))
                                }
                            </ul>
                        ))
                    }
                </div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="card card-body">
                        <div className="form-group">
                            <select name="piesa" onChange={e => setEmpleado(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="Defaut">Selecione un empleado</option>
                                {
                                    empleados.map((item, index) =>
                                        <option key={index} value={item.id}>{item.name} {item.lestname}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group">

                            <select name="piesa" onChange={e => setDesabolladura_id(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="Defaut">Selecione una piesa</option>
                                {
                                    desabolladuras.map((item, index) =>
                                        <option key={index} value={item.id}>{item.piesa}</option>
                                    )
                                }
                            </select>
                        </div>


                        <div className="form-group">
                            <select name="servicio" onChange={e => setTrabajo_tip(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="Defaut">Seleciona el tipo de trabajo</option>
                                {
                                    tipoDeTrabajos.map((trabajo, index) =>
                                        <option key={index} value={trabajo.trabajo_tipo}>{trabajo.trabajo_tipo}: {trabajo.precio}</option>
                                    )

                                }
                            </select>
                            <select name="piesa" onChange={e => setPrecio(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="Defaut">Selecione un precio</option>
                                {
                                    precioTrabajo.map((item, index) =>
                                        <option key={index} value={item.precio} >{item.precio}</option>
                                    )
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Create
                        </button>
                    </form>
                    <ul>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default Asignacion