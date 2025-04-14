import { Component } from "react";
import './styles.css';

class MovieCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataPelicula: props.data,
            favorito: false,
            mostrarContenido: false // Mantengo tu estructura original para ocultar
        }
    }

    componentDidMount() {
        let storage = localStorage.getItem('favoritos')
        if (storage !== null) {
            let storageParseado = JSON.parse(storage)
            let estaMiId = storageParseado.includes(this.state.dataPelicula.id)

            if (estaMiId) {
                this.setState({ favorito: true })
            }
        }
    }

    agregarAFavoritos(id) {
        let storage = localStorage.getItem('favoritos')
        if (storage !== null) {
            let arrParseado = JSON.parse(storage)
            arrParseado.push(id)
            let arrStringificado = JSON.stringify(arrParseado)
            localStorage.setItem('favoritos', arrStringificado)
        } else {
            let primerID = [id]
            let arrStringificado = JSON.stringify(primerID)
            localStorage.setItem('favoritos', arrStringificado)
        }

        this.setState({
            favorito: true
        })
    }

    sacarDeFavoritos(id) {
        const storage = localStorage.getItem('favoritos')
        const storageParseado = JSON.parse(storage)
        const filtrarStorage = storageParseado.filter((elm) => elm !== id)
        const storageStringificado = JSON.stringify(filtrarStorage)
        localStorage.setItem('favoritos', storageStringificado)

        this.setState({
            favorito: false
        })
    }

    ocultar() {
        this.setState({
            mostrarContenido: !this.state.mostrarContenido
        })
    }

    render() {
        const { dataPelicula, favorito, mostrarContenido } = this.state;

        return (
            <div className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w200${dataPelicula.poster_path}`} alt={dataPelicula.title} />
                <h3>{dataPelicula.title}</h3>

                <div>
                     <button onClick={() => this.ocultar()}>
                        {mostrarContenido ? 'Ocultar' : 'Mostrar'} Sinópsis
                    </button>
                    <div className={mostrarContenido ? '' : 'hide'}>
                        <p>{dataPelicula.overview}</p>
                    </div>
                </div>

                {favorito ?
                    <button onClick={() => this.sacarDeFavoritos(dataPelicula.id)}>
                        Sacar de favoritos
                    </button>
                    :
                    <button onClick={() => this.agregarAFavoritos(dataPelicula.id)}>
                        Agregar a favoritos
                    </button>
                }
                
            </div>
        )
    }
}

export default MovieCard;

