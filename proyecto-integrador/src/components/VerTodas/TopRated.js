import { Component } from "react";
import FiltroPeliculas from "../FiltroPeliculas/FiltroPeliculas";
import MovieCard from "../MovieCard/MovieCard";
import './style.css';
import { Link } from 'react-router-dom';

class Peliculas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            populares: [],
            backupPopulares: [],
            topRated: [],
            backupTopRated: [],
        }
    }

    apiCall(url, stateKey, backupKey) {
        fetch(url)
            .then(response => response.json())
            .then((data) => this.setState({
                [stateKey]: data.results,
                [backupKey]: data.results
            }))
            .catch(error => console.error(error))
    }

    componentDidMount() {
        const apiKey = 'd248f742e95238b743a56f9e1b92dc9b';

        const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-MX&page=1`;
        this.apiCall(topRatedUrl, 'topRated', 'backupTopRated');
    }

    filtrarPeliculas(busquedaUsuario) {
        const topRatedFiltradas = this.state.backupTopRated.filter(
            (pelicula) => pelicula.title.toLowerCase().includes(busquedaUsuario.toLowerCase())
        );

        this.setState({
            topRated: topRatedFiltradas
        });
    }

    render() {
        return (
            <div>
                <FiltroPeliculas filtro={(busqueda) => this.filtrarPeliculas(busqueda)} />

                <h1>Top Rated</h1>
                <div className="movie-list">
                    {this.state.topRated.length === 0 ?
                        <h1>Cargando películas mejor valoradas...</h1>
                        :
                        this.state.topRated.map((pelicula) => (
                            <div key={pelicula.id} className="movie-card-container">
                                <MovieCard data={pelicula} />
                                <Link to={`/detalle/${pelicula.id}`}>
                                    <button className="detalle-button">
                                        Ver Detalle
                                    </button>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Peliculas;