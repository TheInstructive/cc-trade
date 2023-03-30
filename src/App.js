import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandshake, faRocket, faSackDollar, faNewspaper, faScaleBalanced, faCaretRight, faCircleArrowRight, faArrowsLeftRight,faCheck} from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from './images/logo1.png'


function App() {
  return (
    <div>
      <div style={{width:"100%", backgroundColor:"#212121", display:"flex", justifyContent:"center", borderBottom:'1px solid #181818'}}>
        <div className='navigation'>
          <div className='logo'><a href='/'><img src={logo}/></a></div>
          <div className='menu'>
            <ul>
            <li><Link to='/trade'><FontAwesomeIcon icon={faHandshake} /> &nbsp;&nbsp;TRADE</Link></li>
            <li><Link to='/launchpad'><FontAwesomeIcon icon={faRocket} /> &nbsp;&nbsp;LAUNCHPAD</Link></li>
            <li><Link to='/stake'><FontAwesomeIcon icon={faSackDollar} /> &nbsp;&nbsp;STAKE</Link></li>
            <li><Link to='/newsletter'><FontAwesomeIcon icon={faNewspaper} /> &nbsp;&nbsp;NEWSLETTER</Link></li>
            <li><Link to='/dao'><FontAwesomeIcon icon={faScaleBalanced} /> &nbsp;&nbsp;DAO</Link></li>
            </ul>
          </div>

          <div className='right'>
            <button>CONNECT WALLET</button>
          </div>
        </div>
      </div>

    <div className='App'>
      <Outlet/>
    </div>
    </div>
  );
}

export default App;
