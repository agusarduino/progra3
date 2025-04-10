import { Component } from "react";
import FiltroPeliculas from "../FiltroPeliculas/FiltroPeliculas";
import './style.css';

class Peliculas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            populares: [],
            topRated: [],
            busqueda: null,
            mostrarContenido: false
        }
    }

    apiCall(url, stateKey) {
        fetch(url)
            .then(response => response.json())
            .then((data) => this.setState({
                [stateKey]: data.results.slice(0, 5) // Usamos slice para obtener solo 5 resultados
            }))
            .catch(error => console.error(error))
    }

    componentDidMount() {
        const apiKey = 'd248f742e95238b743a56f9e1b92dc9b';
        const popularesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        this.apiCall(popularesUrl, 'populares');

        const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-MX&page=1`;
        this.apiCall(topRatedUrl, 'topRated');
    }


    // verTodas(id) {
    // completar despues
    //}

    filtrarPeliculas(busquedaUsuario) {
        this.setState({
            busqueda: busquedaUsuario === '' ? null : busquedaUsuario.toLowerCase()
        });
    }
    peliculasFiltradas(lista) {
        if (this.state.busqueda === null) {
            return lista;
        }
        if (this.state.busqueda === '') {
            return lista;
        }
        return lista.filter(pelicula =>
            pelicula.title.toLowerCase().includes(this.state.busqueda)
        );
    }

    ocultar() {
        this.setState({
            mostrarContenido: !this.state.mostrarContenido
        })
    }


    render() {
        const { populares, topRated } = this.state;
        const popularesFiltradas = this.peliculasFiltradas(populares);
        const topRatedFiltradas = this.peliculasFiltradas(topRated);

        return (
            <div>
                <FiltroPeliculas filtro={(busqueda) => this.filtrarPeliculas(busqueda)} />

                <h1>Populares</h1>
                <div className="movie-list">
                    {popularesFiltradas.length > 0 && popularesFiltradas.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <button onClick={() => this.ocultar()} >
                                Sinópsis: {movie.overview}
                            </button>
                        </div>
                    ))
                    }{popularesFiltradas.length === 0 &&
                        <p>No se encontraron películas populares con ese nombre</p>
                    }
                </div>
                <h1>Top Rated</h1>
                <div className="movie-list">
                    {topRatedFiltradas.length > 0 && topRatedFiltradas.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>Sinópsis: {movie.overview}</p>
                            
                        </div>
                    ))
                    }{topRatedFiltradas.length === 0 &&
                        <p>No se encontraron películas mejor valoradas con ese nombre</p>
                    }
                </div>
            </div>
        )
    }
}

export default Peliculas; 