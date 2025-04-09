import { Component } from "react";

import './style.css';

// Hay un error en el navegador asi que no se si esto esta bien o no porque no aparece en la consola lo que deberia aparecer

class Home extends Component {
    constructor(props) {
        super(props)
        this.state={
            populares: [],
            topRated: [],
            imagenes: []
        }
    }

    llamadoApi(url, consecuencia) {
        fetch(url)
            .then(response => response.json())
            .then(( data ) => this.setState({
                personajes:data.results, 
                backupPersonajes: data.results
            }))
            .catch(error => console.error( error))
    }

    componentDidMount(props) {
        const id = this.props.id; 
        const apiKey = 'd248f742e95238b743a56f9e1b92dc9b';
        
        const popularesUrl = `https://api.themoviedb.org/{/movie/popular?api_key=${apiKey}&language=es-MX&page=1`;
        this.llamadoApi(popularesUrl, (data) => {
            this.setState({ populares: data.results.slice(0, 5) });
        });
        
        const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-MX&page=1`;
        this.llamadoApi(topRatedUrl, (data) => {
            this.setState({ topRated: data.results.slice(0, 5) });
        });
    }

    // verTodas(id) {
        // completar despues
    //}

    filtrarPeliculas(busquedaUsuario){
        const peliculasFiltradas = this.state.imagenes.filter(
            (elm) => elm.name.toLowerCase().includes(busquedaUsuario.toLowerCase())
        )
        this.setState({peliculas: peliculasFiltradas})
    }

    render () {
        
        return(
         <div>
            <h1>Populares</h1>

         </div>   
        )
    }
}

export default Home; 