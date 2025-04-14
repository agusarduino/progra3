import React, { Component } from 'react';
import DetallePelicula from '../../components/DetallePelicula/DetallePelicula';
import { Link } from 'react-router-dom';
import './styles.css';

class PeliculasFavoritas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculasFavorito: [],
            hayPeliculasEnFavoritos: false
        }
    }

    componentDidMount() {
        const storageFavoritos = localStorage.getItem('favoritos')
        if(storageFavoritos !== null){
            let favoritosParseado = JSON.parse(storageFavoritos)
            if(favoritosParseado.length > 0){
                Promise.all(
                    favoritosParseado.map((id) => 
                        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d248f742e95238b743a56f9e1b92dc9b&language=es-MX`)
                        .then((respuesta) => respuesta.json())
                        .catch(error => console.log(error))
                    )
                )
                .then((data) => this.setState({
                    peliculasFavorito: data,
                    hayPeliculasEnFavoritos: true
                }))
                .catch(error => console.log(error))
            }
        }
    }

    filtrarPeliculasFavoritos(id) {
        const peliculasFiltradas = this.state.peliculasFavorito.filter(
            elemento => elemento.id !== id
        )
        this.setState({
            peliculasFavorito: peliculasFiltradas,
            hayPeliculasEnFavoritos: peliculasFiltradas.length > 0
        })
    }

    render() {
        const { peliculasFavorito, hayPeliculasEnFavoritos } = this.state;
      
        const storageFavoritos = localStorage.getItem('favoritos');
        const hayFavoritosEnStorage = storageFavoritos && JSON.parse(storageFavoritos).length > 0;
        
        if (hayFavoritosEnStorage && peliculasFavorito.length === 0) {
            return <div>
                    <img src="/gif/loader.gif"></img>
                    <h1>Cargando favoritos...</h1>
                </div>
        }

        return (
            <div>
                <h1>Películas Favoritas</h1>
                {
                    peliculasFavorito.length > 0 
                    ?
                    peliculasFavorito.map((elemento, idx) => (
                        <div key={idx + elemento.id}>
                            <DetallePelicula 
                                id={elemento.id}
                                borrarDeFavoritos={(id)=> this.filtrarPeliculasFavoritos(id)} 
                                esScreenFavoritos={true}
                            />
                            <div>
                                <button>
                                    <Link to={`/detalle/${elemento.id}`} className="boton-ver-detalle">
                                        Ver Detalle
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    !hayPeliculasEnFavoritos && 
                    <h2>No hay películas en favoritos</h2>
                }
            </div>
        )
    }
};

export default PeliculasFavoritas;