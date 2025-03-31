import React from "react";
import {Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './screens/Home/Home';
import NotFound from './components/NotFound/NotFound';


function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/notfound" component={NotFound} /> 
      </Switch>
    </div>
  );
}

export default App;
