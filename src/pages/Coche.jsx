import React, { useEffect, useState } from "react";


const Coche = () => {

    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')

    const [coches, setCoches] = useState([])
    const [idmodelo, setIdModelo] = useState('')
    const coche_id = Number(idmodelo)
    console.log(coche_id);





    //Recibir los datos del formulario y enviarlo a la api
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/coche", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                marca,
            }),
        });
        const data = await res.json();
        await getCoche();
        console.log(data);

    }
    const handleSubmitModelo = async (e) => {
        e.preventDefault();
        const res = await fetch("/coche/modelo", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                coche_id,
                modelo
            }),
        });
        const data = await res.json();
        await getCoche();
        console.log(data);

    }


    //optener los datos de la api
    const getCoche = async () => {
        const res = await fetch("/coche")
        const data = await res.json();
        setCoches(data);
    }

    useEffect(() => {
        getCoche();
    }, [])



    return (
        <div className="card-body">
            <h5 className="text-center">Registrar Nuevo Coche</h5>
            <hr />
            <div className="row">
                <div className="col-xl-4 col-md-6 m-b-15">
                    <form onSubmit={handleSubmit} className="card card-body">
                        <div className="row">
                            <div className="col-12">
                                <input
                                    type="text"
                                    onChange={e => setMarca(e.target.value)}
                                    value={marca}
                                    autoFocus
                                    placeholder="marca"
                                    className="mb-3 form-control"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Crear
                        </button>
                    </form>

                </div>
                <div className="col-xl-8 col-md-12 m-b-30">
                    <form onSubmit={handleSubmitModelo} className="card card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <select name="modelo" onChange={e => setIdModelo(e.target.value)} className="form-select" aria-label="Default select example">
                                    <option value="Defaut">Selecione una marca</option>
                                    {
                                        coches.map((item, index) => (
                                            <option key={index} value={item.id}>{item.marca}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                            <input
                                type="text"
                                onChange={e => setModelo(e.target.value)}
                                value={modelo}
                                autoFocus
                                placeholder='Ingrese un modelo'
                                className="mb-3 form-control"
                            />
                        </div>
                        </div>
                        
                        <button type='submit' className='btn btn-primary btn-block'>Crear</button>
                    </form>
                </div>

                <div className="col-md-12">
                    {
                        coches.map((coche, index) => (
                            <ul key={index} className="list-group">
                                <li className="list-group-item">{coche.marca}</li>
                                {coche.modelos.map((modelo, index) => (
                                    <ul key={index}>
                                        <li className="list-group-item">{modelo.modelo}</li>
                                    </ul>
                                ))}
                            </ul>
                        ))

                    }
                </div>

            </div>
        </div>
    )
}
export default Coche