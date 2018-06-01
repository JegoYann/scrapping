import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teslas: []
    };
  }

  async componentDidMount() {
    let teslas = await fetch('http://127.0.0.1:4000/get');
    let arrayTeslas = teslas.json();
    console.log(arrayTeslas);
    this.setState({
      teslas: arrayTeslas
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.state.teslas.map((oneTesla)=>{
            console.log(oneTesla);
            return <p>{oneTesla.name}</p>
          })
        }
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
