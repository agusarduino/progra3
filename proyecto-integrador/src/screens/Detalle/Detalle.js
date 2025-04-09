import React from 'react';
import DetallePelicula from '../../components/DetallePelicula/DetallePelicula';

function DetallePeli(props) {
    return (
        <React.Fragment>
            <DetallePelicula id={props.match.params.id} />
        </React.Fragment>
    )
}

export default DetallePeli;
