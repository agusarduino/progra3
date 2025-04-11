import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Peliculas from "../../components/Peliculas/Peliculas";

function Home(){
    return(
        <React.Fragment>
            <Peliculas />
        </React.Fragment>
    )
}
export default Home;