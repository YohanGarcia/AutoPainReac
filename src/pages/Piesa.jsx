import React, { useEffect, useState } from 'react'

function Piesa() {

    const [piesa, setPiesa] = useState('')
    const [piesas, setPiesas] = useState([])
    const [precio, setPrecioPiesa] = useState([])
    const [piesaId, setPiesaId] = useState('')

    const piesa_id = Number(piesaId)
    console.log(piesa_id);

    //Recibir los datos del formulario y enviarlo a la api
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/piesa", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                piesa,
            }),
        });
        const data = await res.json();
        console.log(data);
        await getPiesa();
        setPiesa('');
    }

    const handleSubmitPrecioPiesa = async (e) => {
        e.preventDefault();

        const res = await fetch("/piesa/preciopiesa", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                precio,
                piesa_id
            }),
        });
        const data = await res.json();
        console.log(data);
        await getPiesa();
        setPiesa('');
    }

    //optener los datos de la api
    const getPiesa = async () => {
        const res = await fetch("/piesa")
        const data = await res.json();
        setPiesas(data);
    }

   

    useEffect(() => {
        getPiesa();
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit} className="card card-body">
                        <div className="from-group">
                            <input
                                type="text"
                                onChange={e => setPiesa(e.target.value)}
                                value={piesa}
                                autoFocus
                                placeholder="Nombre de la piesa"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Create
                        </button>
                    </form>
                </div>
                <div className="col-md-4">
                    <form onSubmit={handleSubmitPrecioPiesa} className="card card-body">
                        <div className="form-group">
                            <select name="modelo" onChange={e => setPiesaId(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="Defaut">Selecione una marca</option>
                                {
                                    piesas.map((item, index) => (
                                        <option key={index} value={item.id}>{item.piesa}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="from-group">
                            <input
                                type="text"
                                onChange={e => setPrecioPiesa(e.target.value)}
                                value={precio}
                                autoFocus
                                placeholder='Precio de la piesa'
                                className="form-control"
                            />
                        </div>
                        <button type='submit' className='btn btn-primary btn-block'>Crear</button>
                    </form>
                </div>
                <div className="col-md-8">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Piesa</th>
                                <th>precios</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                piesas.map(piesa => (
                                    <tr key={piesa.id}>
                                        <td>{piesa.id}</td>
                                        <td>{piesa.piesa} </td>
                                        {
                                            piesa.precio.map((item, index) => (
                                                <td key={index}>{item.precio}</td>
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
    )
}

export default Piesa
