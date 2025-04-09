import React from "react";
import {Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './screens/Home/Home';
import Detalle from './screens/Detalle/Detalle';

import NotFound from './screens/NotFound/NotFound';
import Imagenes from './components/Peliculas';

function App() {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path='/detalle/:id' component={Detalle} />
        <Route component={NotFound} /> 
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
