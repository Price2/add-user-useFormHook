import './App.css';
import React, { Component } from 'react'
import PersistentDrawerLeft from './components/Layout'
class App extends Component {
constructor () {
  super();
  this.state = {}
}

  render() {
    return (
      <PersistentDrawerLeft/>
    )
  }
}

export default App;
