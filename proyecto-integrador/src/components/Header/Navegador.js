import React from "react";

function Navegador(props) {
    return (
        <ul className="header">
            {
                props.barraNavegador.map((elemento, i) => <li key={elemento + i}> {elemento.name}</li>)
                
            }
            
        </ul>
    )
}

export default Navegador;