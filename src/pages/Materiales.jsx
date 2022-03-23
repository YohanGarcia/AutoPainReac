import React, { useEffect, useState } from "react";


const Materiales = () => {
    const [name, setName] = useState('')
    const [numero, setNumero] = useState('')
    const [precio, setPrecio] = useState('')

    const [idname, setIdNaame] = useState('')
    const matrales_id = Number(idname)
    console.log(matrales_id, 'name del material');


    const [materiales, setMateriales] = useState([])
    console.log(materiales);
    // console.log(materiales);

    const handleSumitName = async (e) => {
        e.preventDefault();
        const res = await fetch("/materiales", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
            }),
        });
        const data = await res.json();
        await getMateriales();
        setName('')
        console.log(data);
    }
    const handleSumitNumero = async (e) => {
        e.preventDefault();
        const res = await fetch("/materiales/numero", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                numero,
                precio,
                matrales_id
            }),
        });
        const data = await res.json();
        await getMateriales();
        setNumero('')
        console.log(data);
    }

    const getMateriales = async () => {
        const res = await fetch("/materiales")
        const data = await res.json();
        setMateriales(data)
    }

    useEffect(() => {
        getMateriales();

    }, []);

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSumitName} className="card card-body">
                        <div className="from-group">
                            <input
                                type="text"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                autoFocus
                                placeholder="Nombre del material"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Crear
                        </button>
                    </form>
                </div>
                <div className="col-md-4">
                    <form onSubmit={handleSumitNumero} className="card card-body">
                        <div className="form-group">
                            <select name="modelo" onChange={e => setIdNaame(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="Defaut">Selecione una Material</option>
                                {
                                    materiales.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="from-group">
                            <input
                                type="text"
                                onChange={e => setNumero(e.target.value)}
                                value={numero}
                                autoFocus
                                placeholder="Cantida o Numero del Material"
                                className="form-control"
                            />
                        </div>
                        <div className="from-group">
                            <input
                                type="text"
                                onChange={e => setPrecio(e.target.value)}
                                value={precio}
                                autoFocus
                                placeholder="Precio del Materil"
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Crear
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Materiales;
