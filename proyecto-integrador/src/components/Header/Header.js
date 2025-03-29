import React from "react";
import Navegador from "./Navegador";
import './styles.css';

function Header() {
    let barraNavegador = [
        {
            name: 'Home',
            path: '/'
        }, {
            name: 'Favoritos',
            path: '/favoritos'
        }, {
            name: 'Más populares',
            path: '/peliculasPopulares'
        }, {
            name: 'En cartelera',
            path: '/peliculasEnCartelera'
        }, {
            name: 'Top Rated',
            path: '/peliculasEnCartelera'
        }, {
            name: 'Proximamente',
            path: '/peliculasProximamente'
        }, {
            name: 'Ver Todas',
            path: '/verTodas'
        }
    ]

    return (
        <header className="site-header">
            <ul className="logoTV">
                <img src="/logo/image.png" alt="" />
            </ul>
            <Navegador barraNavegador = {barraNavegador} />
        </header>
    )
};

export default Header;