import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandshake, faRocket, faSackDollar, faNewspaper, faScaleBalanced, faCaretRight, faCircleArrowRight, faArrowsLeftRight,faCheck} from '@fortawesome/free-solid-svg-icons'
import animation from './images/animation.webp'
import loaded from './images/ll.jpg'
import ballies from './images/ballies.png'
import React, { useState, useEffect } from 'react';
import twitter from './images/twitter.svg'
import instagram from './images/instagram.svg'
import discord from './images/discord.svg'
import { Link, Outlet } from 'react-router-dom';




function App() {
  return (
    <div className='App'>

      <div className='navigation'>
        <div className='logo'><a>CRONOS.CLUB <c>BETA</c></a></div>

        <div className='menu'>
          <ul>
          <li><Link to='/'><FontAwesomeIcon icon={faHandshake} /> &nbsp;&nbsp;TRADE</Link></li>
          <li><Link to='/trade'><FontAwesomeIcon icon={faRocket} /> &nbsp;&nbsp;LAUNCHPAD</Link></li>
          <li><Link to='/trade'><FontAwesomeIcon icon={faSackDollar} /> &nbsp;&nbsp;STAKE</Link></li>
          <li><Link to='/newsletter'><FontAwesomeIcon icon={faNewspaper} /> &nbsp;&nbsp;NEWSLETTER</Link></li>
          <li><Link to='/trade'><FontAwesomeIcon icon={faScaleBalanced} /> &nbsp;&nbsp;DAO</Link></li>
          </ul>
        </div>

        <div className='right'>
          <button>CONNECT WALLET</button>
        </div>

      </div>
      <Outlet/>
    </div>
  );
}

export default App;
