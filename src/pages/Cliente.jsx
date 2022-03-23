import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react";


function Cliente() {
    const [clientes, setClientes] = useState([])
    const [vehiculos, setVehiculos] = useState([])
   


    const { id } = useParams();




    useEffect(() => {
        //optener los datos de la api
        const getCliente = async () => {
            const res = await fetch(`/clientes/${id}`)
            const data = await res.json();
            setClientes(data);
            setVehiculos(data['vehiculos']);
        };

        getCliente();
    }, [id]);


    return (
        <>
            <ul className="list-group list-group-flush">

                <li className="list-group-item"><strong>Nombre: </strong> {clientes.name} {clientes.lestname}</li>
                {vehiculos.map((cliente, index) =>
                    <ul key={index}>
                        <li className="list-group-item"><strong>Coche: </strong>{cliente.marca} {cliente.modelo}</li>
                        <li className="list-group-item"><strong>Año: </strong>{cliente.age}</li>
                        <li className="list-group-item"><strong>color: </strong>{cliente.color}</li>
                        <li className="list-group-item"><strong>placa: </strong>{cliente.placa}</li>
                    </ul>

                )}

            </ul>




        </>
    )
}

export default Cliente
