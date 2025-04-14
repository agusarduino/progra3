import React from "react";
import {Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './screens/Home/Home';
import Detalle from './screens/Detalle/Detalle';
import Favoritos from './screens/Favoritos/Favoritos'
import Populares from "./components/VerTodas/Populares";
import TopRated from "./components/VerTodas/TopRated";

import NotFound from './screens/NotFound/NotFound';

function App() {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path='/detalle/:id' component={Detalle} />
        <Route path='/favoritos' component={Favoritos} />
        <Route path='/populares' component={Populares} />
        <Route path='/toprated' component={TopRated} />
        <Route component={NotFound} /> 
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
