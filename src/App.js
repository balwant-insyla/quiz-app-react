import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => (
  <BrowserRouter>
  
    <Container disableGutters maxWidth={false}>
      {!Auth && <Navbar />}
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/dashboard" exact component={Home} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;
