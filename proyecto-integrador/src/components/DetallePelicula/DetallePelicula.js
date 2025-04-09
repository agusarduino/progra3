import React, { Component } from 'react';
import './styles.css';

class DetallePelicula extends Component {
    constructor(props) {
        super(props)
        this.state={
            pelicula: '',
            imagenes: ''
        }
    }

    llamadoApi(url, consecuencia) {
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(error => console.error( error))
    }

    componentDidMount(props) {
        const id = this.props.id; 
        const apiKey = 'd248f742e95238b743a56f9e1b92dc9b';
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-MX`;
        this.llamadoApi(url, (data) => {
            this.setState({ pelicula: data });
            console.log(data); 
        });

        const imagesUrl = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`;
        console.log(imagesUrl)

        this.llamadoApi(imagesUrl, (data) => {
            this.setState({ imagenes: data});
        });
        
    }

    agregarFavoritos(id) {
        // completar despues
    }

    render () {
        const { pelicula } = this.state;
        
        return(
            <div className='contenedor'>
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={`Póster de ${pelicula.title}`} className="imagenDetalle"></img>
                <div className='contenedor2'>
                    <h1>{pelicula.title}</h1>
                    <p>Rating: {pelicula.vote_average}</p>
                    <p>Fecha de estreno: {pelicula.release_date}</p>
                    <p>Duración: {pelicula.runtime} minutos</p>
                    <p>Sinópsis: {pelicula.overview}</p>
                    <p>Géneros: {pelicula.genres && pelicula.genres.map(g => g.name).join(' y ')}</p>
                    <button> Agregar a favoritos </button>
                </div>
            </div>
        )
    }
}

export default DetallePelicula;