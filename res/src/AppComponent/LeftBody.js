import React from 'react'
import Booking from './LeftBodyContent/Booking';
import Menu from './LeftBodyContent/Menu';
import Login from './LeftBodyContent/Login'
import Home from './LeftBodyContent/Home';

import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'
import Footer from './Footer';

export default function LeftBody() {
    return (
        <div className='BodyLeft' id='OpacityChange'>
            <div className='PaddingBody'/>
            <div className='BodyContentLeft'>
                <div id='LineBetweenTopBarAndLeftBody'/>
                <div  className='BodyContentLeft2'>
                <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/Booking' component={Booking}/>
                <Route path='/Menu' component={Menu}/>
                <Route path='/Login' exact component={Login}/>
                </Switch>
                </div>
                <div id='LineBetweenLeftBodyAndFooter'/>
            </div>
            <Footer/>
        </div>
    )
}
