import React, { useEffect, useState } from 'react'

function TypoServicio() {

    const [name, setName] = useState('')
    const [typoDeServicio, setTypoDeServicio] = useState([])
    console.log(name);

    const getTypo = async () => {
        const res = await fetch("/typo")
        const data = await res.json();
        setTypoDeServicio(data);
    }

    //Recibir los datos del formulario y enviarlo a la api
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/typo", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
            }),
        });
        const data = await res.json();
        await getTypo(data);

    }

    useEffect(() => {
        getTypo();
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
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    autoFocus
                                    placeholder="Nombre de Servicio"
                                    className="mb-3 form-control"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Crear
                        </button>
                    </form>

                </div>


                <div className="col-md-12">
                    {
                        typoDeServicio.map((tipo, index) => (
                            <ul key={index} className="list-group">
                                <li className="list-group-item">{tipo.name}</li>

                            </ul>
                        ))

                    }
                </div>

            </div>
        </div>
    )
}

export default TypoServicio