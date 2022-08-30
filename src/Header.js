import React from 'react'

import { Link, useHistory } from 'react-router-dom'

import './Header.css'
import Logo from './coronahalf.png'

function Header() {
    
    

    const history = useHistory()
    
    return (
        <div className="header">    
            
            <Link to='/home' className= "header__icon">
                <img className="header__icon" src={Logo} alt="AGME_Logo" />
            </Link>

            <Link to='/home' className= "title">
                <h1 className="title">
                COVID-19
                </h1>
                <h2 className="title">
                Live Tracker
                </h2>

            </Link>
              
            <div className="header__center">

                <button className="home__button" onClick={() => history.push('/home')} >HOME</button>
                <button className="What__button" onClick={() => history.push('/what')} >WHAT IS COVID-19</button>
                <button className="Ana__button" onClick={() => history.push('/analytics')} >ANALYTICS</button>
                <button className="Abt__button" onClick={() => history.push('/about')} >ABOUT</button>
                <button className="Contact__button" onClick={() => history.push('/contact')} >CONTACT</button>





            </div>

      
        </div>

            
    )
}

export default Header