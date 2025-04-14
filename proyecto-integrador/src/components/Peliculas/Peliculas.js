import { Component } from "react";
import FiltroPeliculas from "../FiltroPeliculas/FiltroPeliculas";
import MovieCard from "../MovieCard.js/MovieCard";
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
                [stateKey]: data.results.slice(0, 5),
                [backupKey]: data.results
            }))
            .catch(error => console.error(error))
    }

    componentDidMount() {
        const apiKey = 'd248f742e95238b743a56f9e1b92dc9b';
        const popularesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=1`;
        this.apiCall(popularesUrl, 'populares', 'backupPopulares');

        const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-MX&page=1`;
        this.apiCall(topRatedUrl, 'topRated', 'backupTopRated');
    }

    filtrarPeliculas(busquedaUsuario) {
        const popularesFiltradas = this.state.backupPopulares.filter(
            (pelicula) => pelicula.title.toLowerCase().includes(busquedaUsuario.toLowerCase())
        ).slice(0, 5);

        const topRatedFiltradas = this.state.backupTopRated.filter(
            (pelicula) => pelicula.title.toLowerCase().includes(busquedaUsuario.toLowerCase())
        ).slice(0, 5);

        this.setState({
            populares: popularesFiltradas,
            topRated: topRatedFiltradas
        });
    }

    render() {
        return (
            <div>
                <FiltroPeliculas filtro={(busqueda) => this.filtrarPeliculas(busqueda)} />

                <div className="section-header">
                    <h1>Populares</h1>
                    <Link to="/populares" className="section-button">
                        Ver todas
                    </Link>
                </div>
                <div className="movie-list">
                    {this.state.populares.length === 0 ?
                        <div>
                        <img src="/gif/loader.gif"></img>
                        <h1>Cargando películas populares...</h1>
                    </div>
                        :
                        this.state.populares.map((pelicula) => (
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

                <div className="section-header">
                    <h1>Top Rated</h1>
                    <Link to="/toprated" className="section-button">
                        Ver todas
                    </Link>
                </div>
                <div className="movie-list">
                    {this.state.topRated.length === 0 ?
                        <div>
                            <img src="/gif/loader.gif"></img>
                            <h1>Cargando películas mejor valoradas...</h1>
                        </div>
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