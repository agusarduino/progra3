import React, { Component } from 'react';

class DetallePelicula extends Component {
    constructor(props) {
        super(props)
        this.state={
            pelicula: '',
        }
    }

    llamadoApi(url, consecuencia) {
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(error => console.error( error))
    }

    componentDidMount(props) {
        const id = this.props.match.params.id;
         // ver esto de api porque no anda
        const url = ``;
        this.llamadoApi(url, (data) => {
            this.setState({ pelicula: data });
            console.log(data); 
        });
    }

    agregarFavoritos(id) {
        
    }

    render () {
        const { pelicula } = this.state;
        
        return(
            <div>
                
                <img src='https://api.themoviedb.org/3/collection/`${pelicula.poster.path}`/images' alt='Portada de ${}'></img>
                <h1>{pelicula.title}</h1>
                <p>Rating: {pelicula.vote_average}</p>
                <p>Fecha de estreno: {pelicula.release_date}</p>
                <p>Duración: {pelicula.runtime} minutos</p>
                <p>Sinópsis: {pelicula.overview}</p>
                <p>Géneros: {pelicula.genres?.map((genero)=> genero.name)} </p>
                <button> Agregar a favoritos </button>

            </div>
        )
    }
}

export default DetallePelicula;