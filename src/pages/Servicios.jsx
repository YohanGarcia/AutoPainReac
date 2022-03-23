import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Servicios = () => {


    const { cliente_id } = useParams();
    const { coche_id } = useParams();
    const vehiculo_id = Number(coche_id)
    const idCliente = Number(cliente_id)

    const [clientes, setClientes] = useState([])
    const [typo, setTypo] = useState([])
    const [piesas, setPiesas] = useState([])
    const [precioPiesa, setPrecioPiesa] = useState([])
    const [servicios, setServicio] = useState([])
    const [desabolladura, setDesabolladura] = useState([])
    const [precio, setPrecio] = useState('')
    const [tipoServicio, setTipoServicio] = useState('')
    const [piesa, setPiesa] = useState('')

    let suma = 0;
    
    desabolladura.map( iten => (
        suma += iten.precio
    ))
    
    const piesaid = piesas.filter(function (item) {
        return item.piesa === piesa;
    })

    const idpiesa = piesaid.map(item => {
        return item.id
    })

    const piesa_id = Number(idpiesa)

    const idservicio = servicios.filter(function (servicio) {
        return servicio.typo === tipoServicio;
    })

    const servicioid = idservicio.map(item => {
        return item.id
    })

    const idservicio2 = servicios.map(item => {
        return item.id;
    })

    const servicio_id = Number(servicioid)
    console.log(servicio_id, 'id del tipo de servicio');
    const servicio_id2 = Number(idservicio2)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (tipoServicio === 'desabolladura y pintura') {
            const res = await fetch("/desabolladora", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    piesa,
                    precio,
                    servicio_id,
                    typo_id

                }),
            });
            await res.json();
        }
        await getClientes();
        setPiesa('');
        setPrecio('');

    }



    const getPiesas = async () => {
        const res = await fetch(`/piesa`)
        const data = await res.json();
        setPiesas(data);
    }

    const getServicios = async () => {
        const res = await fetch(`/servicio/${vehiculo_id}`)
        const data = await res.json();
        setServicio(data);
    }

    const getDesabolladura = async () => {
        const res = await fetch(`/desabolladora/${servicio_id2}`)
        const data = await res.json();
        setDesabolladura(data)
    }

    const getClientes = async () => {
        const res = await fetch(`/clientes/${idCliente}`)
        const data = await res.json();
        setClientes(data);
    }

    const getPrecioPiesa = async () => {
        const res = await fetch(`/piesa/preciopiesa/${piesa_id}`)
        const data = await res.json();
        setPrecioPiesa(data);
    }

    const getTypo = async () => {
        const res = await fetch('/typo')
        const data = await res.json();
        setTypo(data)
        console.log(data);
    }

    useEffect(() => {
        getTypo()
        getClientes();
        getPiesas();
        getServicios();
        getPrecioPiesa();
        getDesabolladura();
    }, [idCliente, vehiculo_id, piesa_id, servicio_id2])

    return (
        <>
            <div className="card-body">
                <div className="row">
                    <div className="col-xl-8 col-md-6">
                        <div className="card Recent-Users">
                            <div className="card-header">
                                <h5 className='text-center'>Datos del Cliente</h5>
                            </div>
                            <div className="card-block px-3 py-0">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <tbody>
                                            {
                                                clientes.map((cliente, index) => (
                                                    <tr key={index} className="unread">
                                                        <td>
                                                            <h6 className="mb-1">{cliente.name} {cliente.lestname}</h6>
                                                            <p className="m-0">{cliente.fecha}</p>
                                                        </td>
                                                        <td>
                                                            <h6 className="text-muted"><i className="fas fa-circle text-c-green f-10 m-r-15"></i>{cliente.cedula ? `${cliente.cedula}` : 'No hay Datos'}</h6>
                                                        </td>

                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card Recent-Users">
                                <div className="card-header">
                                    <h5 className='text-center'>Datos del Coche</h5>
                                </div>
                                <div className="card-block px-0 py-0">
                                    <div className="tab-content" id="myTabContent">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Coche</th>
                                                    <th>Color</th>
                                                    <th>Año</th>
                                                    <th>Placa</th>
                                                </tr>
                                            </thead>
                                            {
                                                clientes.map((cliente, index) => (
                                                    <>
                                                        {
                                                            cliente.vehiculos.filter(coche => coche.id === vehiculo_id)
                                                                .map((vehiculo, index) => (
                                                                    <tr key={index}>
                                                                        <td><h6 className="m-0">{vehiculo.id}</h6></td>
                                                                        <td><h6 className="m-0">{vehiculo.marca} {vehiculo.modelo}</h6></td>
                                                                        <td><h6 className="m-0">{vehiculo.color}</h6></td>
                                                                        <td><h6 className="m-0">{vehiculo.age}</h6></td>
                                                                        <td><h6 className="m-0">{vehiculo.placa}</h6></td>
                                                                    </tr>
                                                                ))
                                                        }
                                                    </>
                                                ))
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card-header">
                                <h5 className='text-center'>Servico</h5>

                                {
                                    idservicio.map((item, index) => (
                                        <h5 key={index} className='text-center'> {item.typo}</h5>
                                    ))
                                }
                                <h6 className="m-0">Precio Total: ${suma} </h6>
                            </div>
                            <div className="card-block px-0 py-0">
                                <div className="table-responsive">
                                    <div className="card-block px-0 py-0">
                                        <div className="tab-content" id="myTabContent">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Piesa</th>
                                                        <th>Precio</th>
                                                    </tr>
                                                </thead>
                                                {desabolladura.map((desabolladura, index) => (
                                                    <tr key={index}>
                                                        <td><h6 className="m-0">{desabolladura.id}</h6></td>
                                                        <td><h6 className="m-0">{desabolladura.piesa}</h6></td>
                                                        <td><h6 className="m-0">{desabolladura.precio}</h6></td>

                                                    </tr>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={handleSubmit} className="card card-body">
                                    <div className="form-group">
                                        <select name="servicio" onChange={e => setTipoServicio(e.target.value)} className="form-select" aria-label="Default select example">
                                            <option value="Defaut">Seleciona el tipo de servico</option>
                                            {
                                                typo.map((servicio, index) =>

                                                    <option key={index} value={servicio.id} >{servicio.name}</option>

                                                )

                                            }
                                        </select>
                                    </div>
                                    {
                                        tipoServicio === 'desabolladura y pintura' && <>
                                            <div className="form-group">
                                                <select name="piesa" onChange={e => setPiesa(e.target.value)} className="form-select" aria-label="Default select example">
                                                    <option value="Defaut">Selecione una piesa</option>
                                                    {piesas.map((item, index) => <option key={index} value={item.piesa}>{item.piesa}</option>

                                                    )}
                                                </select>
                                            </div>

                                            <div className="from-group">
                                                <select name="piesa" onChange={e => setPrecio(e.target.value)} className="form-select" aria-label="Default select example">
                                                    <option value="Defaut">Selecione el precio</option>
                                                    {
                                                        precioPiesa.map((item, index) => (

                                                            <option key={index} value={item.precio}>{item.precio}</option>

                                                        ))
                                                    }
                                                </select>

                                            </div>
                                        </>

                                    }
                                    {
                                        tipoServicio === 'soldadura' && 'servicio de soldarua'
                                    }
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Create
                                    </button>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Servicios
