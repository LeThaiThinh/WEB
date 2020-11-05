import React, { Component } from 'react';
import './App.css';
import TopNavBar from './AppComponent/TopNavBar';
import LeftBody from './AppComponent/LeftBody'
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'
import  MainBody from './AppComponent/MainBody';

export class App extends Component {
  render() {
    return (
      <Router>
      <div className='App'>
        <LeftBody/>
        <TopNavBar/>
        <MainBody/>
      </div>
      </Router>
    )
  }
}
export default App
