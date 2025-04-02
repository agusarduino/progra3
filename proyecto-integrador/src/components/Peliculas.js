import { Component } from "react";
const apiKey = "d248f742e95238b743a56f9e1b92dc9b";
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;

// Hay un error en el navegador asi que no se si esto esta bien o no porque no aparece en la consola lo que deberia aparecer

class Peliculas extends Component {
    constructor(props){
        super(props);
        this.state = {
            peliculas: []
            }
    }
    apiCall(url, concecuencia){
        fetch(url, concecuencia)
        .then(response => response.json())
        .then(data => concecuencia(data))
        .catch(error => console.error(error))
    }

    
    componentDidMount(){
        console.log("Me monte")
        this.apiCall(url, this.mostrarPeliculas)
    }
    mostrarPeliculas = (data) => {
        console.log(data)
        this.setState({
            peliculas: data.results // no se que variable es la que contiene las imagenes
        })
    }


    componentDidUpdate(){
        console.log("Me actualice")
        alert("hay peliculas nuevas")
    }
    render(){
        console.log("Estoy renderizando")
        let contenido;
        if(this.state.peliculas.length > 0) {
            contenido = <p>Cargando...</p>
        }else{
            contenido = <img  src="{this.state.peliculas}"></img> // no se que variable es la que contiene las imagenes
        }
        return (
            <div>
                {contenido}
            </div>
        )    
}

}
export default Peliculas; 