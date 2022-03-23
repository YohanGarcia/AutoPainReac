import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"



const Vehiculo = () => {

    const { id } = useParams();
    const { cliente } = useParams();


    const [clientes, setClientes] = useState([])
    const [coches, setCoches] = useState([])
    const [modelos, setModelos] = useState([])


    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [color, setColor] = useState('')
    const [age, setAge] = useState('')
    const [placa, setPlaca] = useState('')
    console.log(color);


    const coche_id = coches.filter(function (coche) {
        return coche.marca === marca;
    })
    const cocheid = coche_id.map(item => {
        return item.id
    })
    const marca_id = Number(cocheid)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`/vehiculo/${id}/${cliente}`, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                marca,
                modelo,
                color,
                age,
                placa,
            }),
        });
        await res.json();

        await getCliente();
        setMarca('');
        setModelo('');
        setColor('');
        setPlaca('');
        setAge('');
    }

    //optener los datos de la api
    const getCliente = async () => {
        const res = await fetch(`/clientes/${id}`)
        const data = await res.json();
        setClientes(data);
    };


    //optener los datos de la api
    const getCoche = async () => {
        const res = await fetch("/coche")
        const data = await res.json();
        setCoches(data);

    }
    const getModelo = async () => {
        const res = await fetch(`/coche/modelos/${marca_id}`)
        const data = await res.json();
        setModelos(data);

    }

    useEffect(() => {

        getCliente();
        getCoche();
        getModelo()
    }, [id, marca_id]);


    return (
        <>
            <div className="card-body">
                <div className="row">
                    <div className="col-xl-8 col-md-12 m-b-30">
                        <h5 className="text-center">Agregar Coche al Cliente: {clientes.map(cliente => (<>{cliente.name} {cliente.lestname}</>))}</h5>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <select name="marca" onChange={e => setMarca(e.target.value)} className="mb-3 form-select" aria-label="Default select example">
                                        <option value="Defaut">Seleciona el modelos</option>
                                        {
                                            coches.map((coche, index) =>
                                                <option key={index} value={coche.marca}>{coche.marca}</option>

                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <select name="modelo" onChange={e => setModelo(e.target.value)} className="form-select" aria-label="Default select example">
                                        <option value="Defaut">Seleciona la marca</option>
                                        {
                                            modelos.map((coche, index) =>
                                                <option key={index} value={coche.modelo}>{coche.modelo}</option>

                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        onChange={e => setColor(e.target.value)}
                                        value={color}
                                        placeholder="color"
                                        className="mb-3 form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        onChange={e => setAge(e.target.value)}
                                        value={age}
                                        placeholder="Año"
                                        className="mb-3 form-control"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        onChange={e => setPlaca(e.target.value)}
                                        value={placa}
                                        placeholder="placa"
                                        className="mb-3 form-control"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">
                                Create
                            </button>
                        </form>
                    </div>
                    <div className="col-xl-8 col-md-6">
                        <div className="card Recent-Users">
                            <div className="card-header">
                                <h5>Datos del Cliente</h5>
                            </div>
                            <div className="card-block px-0 py-3">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <tbody>
                                            {
                                                clientes.map((cliente, index) => (
                                                    <tr key={index} className="unread">
                                                        <td>
                                                            <h6 className="mb-1">{cliente.name} {cliente.lestname}</h6>
                                                            <p className="mb-1">Fecha de registro: {cliente.fecha}</p>
                                                        </td>
                                                        <td>
                                                            <h6 className="mb-1">Numero de Cedula:  {cliente.cedula ? `${cliente.cedula}` : 'No hay Datos'}</h6>
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
                    <div className="col-xl-8 col-md-12 m-b-30">
                        <div className="tab-content" id="myTabContent">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Coche</th>
                                        <th>Color</th>
                                        <th>Año</th>
                                        <th>Placa</th>
                                        <th>Servicio</th>
                                    </tr>
                                </thead>
                                {
                                    clientes.map(cliente => (
                                        <tbody key={cliente.id}>
                                            {
                                                cliente.vehiculos.map((vehiculo, index) => (
                                                    <tr key={index}>
                                                        <td><h6 className="m-0">{vehiculo.id}</h6></td>
                                                        <td><h6 className="m-0">{vehiculo.marca} {vehiculo.modelo}</h6></td>
                                                        <td><h6 className="m-0">{vehiculo.color}</h6></td>
                                                        <td><h6 className="m-0">{vehiculo.age}</h6></td>
                                                        <td><h6 className="m-0">{vehiculo.placa}</h6></td>
                                                        <td>

                                                            <Link to={`/${cliente.name}${cliente.lestname}/${cliente.id}/vehiculos/${vehiculo.marca}${vehiculo.modelo}/${vehiculo.id}/servicios`} className="label theme-bg2 text-white f-12">Agregar Servicio</Link>

                                                        </td>

                                                    </tr>
                                                ))
                                            }
                                        </tbody>

                                    ))
                                }
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}

export default Vehiculo
