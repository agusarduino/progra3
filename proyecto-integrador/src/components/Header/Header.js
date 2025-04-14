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
            name: 'Populares',
            path: '/populares'
        }, {
            name: 'Top Rated',
            path: '/topRated'
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