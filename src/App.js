import React, { Component } from 'react';
import logo from 'logo.svg';
import 'App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit
            <code>src/App.js</code>
            and save to reload.
          </p>
          <button type="button" className="button is-primary is-large">Learn React</button>
        </header>
      </div>
    );
  }
}

export default App;
