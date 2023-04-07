import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandshake, faRocket, faSackDollar, faNewspaper, faScaleBalanced, faHome} from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from './images/logo1.png'
import twitter from "./images/twitter.svg";
import instagram from "./images/instagram.svg";
import discord from "./images/discord.svg";
import { web3Modal, useWeb3Modal, onWalletChange, isWalletConnected, getWalletAddress } from "./web3/WalletConnect";


import { useTranslation } from 'react-i18next';
import Dropdown from './components/Dropdown'

const languages = [
  { id: 1, title: 'English', key: 'en', image:"https://flagicons.lipis.dev/flags/4x3/gb.svg" },
  { id: 2, title: 'Español', key: 'es', image:"https://flagicons.lipis.dev/flags/4x3/es.svg" },
  { id: 2, title: 'Italiano', key: 'it', image:"https://flagicons.lipis.dev/flags/4x3/it.svg" },
  { id: 2, title: 'Turkish', key: 'tr', image:"https://flagicons.lipis.dev/flags/4x3/tr.svg" },
];

function App() {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useWeb3Modal();
  const [ isConnected, setConnected ] = useState(false);
  const [ walletAddress, setWalletAddress ] = useState("");


  useEffect(() => {
    setConnected(isWalletConnected());

    setWalletAddress(getWalletAddress())
    onWalletChange((account) => {
      setConnected(account.isConnected);
    });
  }, []);

  function onConnectClick() {
    if (isModalOpen) {
      closeModal();
    } else {
      openModal();
    }
  }

  const { t } = useTranslation();

  const selectLanguage = (key) => {
    localStorage.setItem('language', key);
    window.location.reload();
  };

  return (
    <div>
      { web3Modal }
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
            {!isConnected ? <button onClick={onConnectClick}>{t('connectwallet')}</button>: <div className='right-walletaddress'>{walletAddress}</div> }
          </div>

          <Dropdown
            title="Select Collection"
            list={languages}
            selectLanguage={selectLanguage}
            />

        </div>
      </div>

    <div className='App'>
      <Outlet/>
      <div className="footer">
        <div className="footer-menus">
          <div className="footer-menu">
            <h4>About</h4>
            <li>
              <a>About US</a>
            </li>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a>Help</a>
            </li>
            <li>
              <a>AFE</a>
            </li>
          </div>

          <div className="footer-menu">
            <h4>Terms</h4>
            <li>
              <a>Privacy Policy</a>
            </li>
            <li>
              <a>Terns of Use</a>
            </li>
            <li>
              <a>Smart Contract</a>
            </li>
          </div>

          <div className="footer-menu">
            <h4>Profile</h4>
            <li>
              <a>Personal Area</a>
            </li>
            <li>
              <a>Trade</a>
            </li>
            <li>
              <a>Security</a>
            </li>
          </div>
        </div>

        <div className="social-box">
          <a>
            <img width={20} src={twitter}></img> Twitter
          </a>
          <a>
            <img width={20} src={instagram}></img> Instagram
          </a>
          <a>
            <img width={20} src={discord}></img> Discord
          </a>
        </div>

        <div className="footer-info">
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
            <br></br> Contact us at <a>support@cronos.club</a> or via{" "}
            <a>Discord</a>.
          </p>
          <p>© 2023 CronosClub | All Rights Reserved.</p>
        </div>
      </div>
    </div>

    <div className='mobile-menu'>
    <button><Link to='/'><FontAwesomeIcon icon={faHome} /></Link></button>
    <button><Link to='/trade'><FontAwesomeIcon icon={faHandshake} /></Link></button>
    <button><Link to='/launchpad'><FontAwesomeIcon icon={faRocket} /></Link></button>
    <button><Link to='/stake'><FontAwesomeIcon icon={faSackDollar} /></Link></button>
    <button><Link to='/newsletter'><FontAwesomeIcon icon={faNewspaper} /></Link></button>
    <button><Link to='/dao'><FontAwesomeIcon icon={faScaleBalanced} /></Link></button>
    </div>

</div>
  );
}

export default App;
