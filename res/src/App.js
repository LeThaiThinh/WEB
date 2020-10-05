import React, { Component } from 'react';
import './App.css';
import TopBar from './AppComponent/TopBar';
import BodyLeft from './AppComponent/BodyLeft.js/BodyLeft';
import MainBody from './AppComponent/MainBody/MainBody';

export class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='PaddingBody'/>
        <BodyLeft />
        <TopBar/>
        <MainBody/>
        
      </div>
    )
  }
}
export default App
