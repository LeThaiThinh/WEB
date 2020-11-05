import React from 'react'
import '../App.css'
import Booking from './MainBodyContent/Booking';
import Menu from './MainBodyContent/Menu';
import Login from './MainBodyContent/Login'
import Home from './MainBodyContent/Home';
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'

export default function MainBody() {
    return (
        <div  className='MainBody' id='OpacityChange'>
                <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/Booking' component={Booking}/>
                <Route path='/Menu' component={Menu}/>
                <Route path='/Login' exact component={Login}/>
                </Switch>
        </div>
    )
}