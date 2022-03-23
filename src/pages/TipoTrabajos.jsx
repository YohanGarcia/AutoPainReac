import React, { useState, useEffect } from 'react';

const Tipothabajos = () => {

    const [precio, setPrecio] = useState([])
    const [trabajos, setTrabajos] = useState([])
    const [trabajo_tipo, setTrabajo_tipo] = useState('')
    const [trabaId, setTrabajoId] = useState('')
    const trabajo_id = Number(trabaId)
    console.log(trabajo_id);

    const getTrabajos = async () => {
        const res = await fetch("/trabajos")
        const data = await res.json();
        setTrabajos(data)
        console.log(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/trabajos", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trabajo_tipo
            }),
        });
        const data = await res.json();
        console.log(data);
        await getTrabajos();
        setTrabajo_tipo('');
    }

    const handleSubmitPrecioTrabajo = async (e) => {
        e.preventDefault();

        const res = await fetch("/trabajos/preciotrabajos", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                precio,
                trabajo_id,

            }),
        });
        const data = await res.json();
        console.log(data);
        await getTrabajos();
        setPrecio('');


    }

    useEffect(() => {
        getTrabajos();
    }, [])

    return (
        <>
            <h1>Tipos de Trabajos</h1>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit} className='card card-body'>
                        <div className="from-group">
                            <input
                                type="text"
                                onChange={e => setTrabajo_tipo(e.target.value)}
                                value={trabajo_tipo}
                                autoFocus
                                placeholder='Tipo de trabajo'
                                className="form-control"
                            />
                        </div>
                        <button type='submit' className='btn btn-primary btn-block'>Crear</button>
                    </form>
                </div>
                <div className="col-md-4">
                    <form onSubmit={handleSubmitPrecioTrabajo} className="card card-body">
                        <div className="form-group">
                            <select name="modelo" onChange={e => setTrabajoId(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="Defaut">Selecione una marca</option>
                                {
                                    trabajos.map((item, index) => (
                                        <option key={index} value={item.id}>{item.trabajo_tipo}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="from-group">
                            <input
                                type="text"
                                onChange={e => setPrecio(e.target.value)}
                                value={precio}
                                autoFocus
                                placeholder='Precio del Trabajo'
                                className="form-control"
                            />
                        </div>
                        <button type='submit' className='btn btn-primary btn-block'>Crear</button>
                    </form>
                </div>
                <div className="col-md-8">
                    <table className='table table-sthiped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipos de thabajo</th>
                                <th>Precios del thabajo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                trabajos.map((trabajo, index) => (
                                    <tr key={index}>
                                        <td>{trabajo.id}</td>
                                        <td>{trabajo.trabajo_tipo}</td>
                                        {
                                            trabajo.preciotrabajo.map((precio, index) => (
                                                <td key={index}>{precio.precio}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Tipothabajos;
