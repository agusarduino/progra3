import React from "react";

function Navegador(props) {
    return (
        <ul className="header">
            {
                props.barraNavegador.map((elemento) => <li> {elemento.name}</li>)
                
            }
            
        </ul>
    )
}

export default Navegador;