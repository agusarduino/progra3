import { Component } from "react";
import FiltroPeliculas from "../FiltroPeliculas/FiltroPeliculas";
import MovieCard from "../MovieCard.js/MovieCard";
import { Link } from "react-router-dom";
import './styles.css';

class Populares extends Component {
    constructor(props) {
        super(props)
        this.state = {
            populares: [],
            backupPopulares: [],
            pagActual: 0,
        }
    }

    apiCall(url, stateKey, backupKey) {
        fetch(url)
            .then(response => response.json())
            .then((data) => this.setState({
                [stateKey]: data.results,
                [backupKey]: data.results,
                peliculas: data.results,
                backup: data.results,
                pagActual: 1
            }))
            .catch(error => console.error(error))
    }

    componentDidMount() {
        const apiKey = 'd248f742e95238b743a56f9e1b92dc9b';
        const popularesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX`;
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

    loadMore(){ 
        const apiKey = 'd248f742e95238b743a56f9e1b92dc9b';
        const nuevaPag = this.state.pagActual + 1;
        fetch (`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${nuevaPag}`)
        .then(response => response.json())
        .then(data => {
            console.log("RESULTADOS", data.results)
            this.setState( 
                {backup: this.state.backupPopulares.concat(data.results),
                populares: this.state.backupPopulares.concat(data.results),
                pagActual: nuevaPag
            }
            );
        })
        .catch(err=> console.log(err));
    } 

    render() {
        return (
            <div>
                <FiltroPeliculas filtro={(busqueda) => this.filtrarPeliculas(busqueda)} />
                <div className="section-header">
                   <h1>Populares</h1> 
                </div>
                
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
                <button className="cargar-mas" onClick={()=> this.loadMore()}>Cargar más</button>

            </div>
        )
    }
}

export default Populares;