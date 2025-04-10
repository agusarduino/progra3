import { Component } from "react";
import FiltroPeliculas from "../FiltroPeliculas/FiltroPeliculas";
import MovieCard from "../MovieCard/MovieCard";
import './style.css';

class Populares extends Component {
    constructor(props) {
        super(props)
        this.state = {
            populares: [],
            backupPopulares: [],
            paginaActual: 0
        }
    }

    apiCall(url, stateKey, backupKey) {
        fetch(url)
            .then(response => response.json())
            .then((data) => this.setState({
                [stateKey]: data.results,
                [backupKey]: data.results,
                paginaActual: 1,
                peliculas: data.results,
                backup: data.results
            }))
            .catch(error => console.error(error))
    }

    componentDidMount() {
        const apiKey = 'd248f742e95238b743a56f9e1b92dc9b';
        const popularesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=1`;
        this.apiCall(popularesUrl, 'populares', 'backupPopulares');
    }

    filtrarPeliculas(busquedaUsuario) {
        const popularesFiltradas = this.state.backupPopulares.filter(
            (pelicula) => pelicula.title.toLowerCase().includes(busquedaUsuario.toLowerCase())
        );

        this.setState({
            populares: popularesFiltradas,
        });
    }

    render() {
        return (
            <div>
                <FiltroPeliculas filtro={(busqueda) => this.filtrarPeliculas(busqueda)} />
                <h1>Populares</h1>
                <div className="movie-list">
                    {this.state.populares.length === 0 ?
                        <h1>Cargando películas populares...</h1>
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
            </div>
        )
    }
}

export default Populares;