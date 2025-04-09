import React from "react";
import { Link } from 'react-router-dom';

function Navegador(props) {
    return (
        <ul className="header">
            {
                props.barraNavegador.map((elemento, i) => (
                    <li key={`${elemento.name}-${i}` }>
                        <Link to={elemento.path} className="opcionesDelNav">
                            {elemento.name}
                        </Link>
                    </li>
                ))
            }
            
        </ul>
    )
}

export default Navegador;