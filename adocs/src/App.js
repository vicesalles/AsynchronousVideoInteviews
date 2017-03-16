import React, { Component } from 'react';
import Header from './layouts/header/Header';
import Main from './layouts/Main/Main';
import Footer from './layouts/Footer/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header name="Max"/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default App;
