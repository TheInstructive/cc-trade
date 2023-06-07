import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandshake, faRocket, faSackDollar, faNewspaper, faScaleBalanced, faHome, faBook, faMoon, faLightbulb} from '@fortawesome/free-solid-svg-icons'
import {faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons'
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from './images/logos.svg'
import { web3Modal, useWeb3Modal, getWalletName, WalletContext } from "./web3/WalletConnect";

import Settings from './components/Settings';

import { useTranslation } from 'react-i18next';
import Dropdown from './components/Dropdown'
import DarkMode from './theme/DarkMode';

const languages = [
  { id: 1, title: 'English', key: 'en', image:"https://flagicons.lipis.dev/flags/4x3/gb.svg" },
  { id: 2, title: 'Español', key: 'es', image:"https://flagicons.lipis.dev/flags/4x3/es.svg" },
  { id: 2, title: 'Italiano', key: 'it', image:"https://flagicons.lipis.dev/flags/4x3/it.svg" },
  { id: 2, title: 'Turkish', key: 'tr', image:"https://flagicons.lipis.dev/flags/4x3/tr.svg" },
];

function App() {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useWeb3Modal();
  const { address, isConnected } = useContext(WalletContext);
  const [ walletName, setWalletName ] = useState("");

  useEffect(() => {
    if (address && isConnected) {
      getWalletName().then(setWalletName);
    } else {
      setWalletName("");
    }
  }, [address, isConnected]);

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
      <div className='navigation-container'>
        <div className='navigation'>
          <div className='logo'><a href='/'><img src={logo}/></a></div>
          <div className='menu'>
            <ul>
            <li><Link to='/newsletter'><FontAwesomeIcon icon={faNewspaper} /> &nbsp;&nbsp;NEWSLETTER</Link></li>
            <li><Link to='/trade'><FontAwesomeIcon icon={faHandshake} /> &nbsp;&nbsp;TRADE</Link></li>
            <li><Link to='/launchpad'><FontAwesomeIcon icon={faRocket} /> &nbsp;&nbsp;LAUNCHPAD</Link></li>
            <li><Link to='/stake'><FontAwesomeIcon icon={faSackDollar} /> &nbsp;&nbsp;STAKE</Link></li>
            </ul>
          </div>

          <div className='right'>
            {!isConnected ? <button onClick={onConnectClick}>{t('connectwallet')}</button>: <div className='right-walletaddress'>{walletName}</div> }
          </div>

          <Settings/>

          <div style={{display:'none'}}><DarkMode></DarkMode></div>

        </div>
      </div>

      <Outlet/>

      <div className="footer">
        <div className="footer-menus">
          <div className="footer-menu">
            <h4>About</h4>
            <li>
              <a target='blank' href='https://docs.cronos.club/cronos.club/about-us/'>About US</a>
            </li>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a target='blank' href='https://aliensfromearth.com/'>AFE</a>
            </li>
          </div>

          <div className="footer-menu">
            <h4>Terms</h4>
            <li>
              <a>Privacy Policy</a>
            </li>
            <li>
              <a>Terms of Use</a>
            </li>
            <li>
              <a>Smart Contract</a>
            </li>
          </div>

          <div className="footer-menu">
            <h4>Profile</h4>
            <li>
              <a>Trade</a>
            </li>
            <li>
              <a>Security</a>
            </li>
          </div>
        </div>

        <div className="social-box">
          <a target='_blank' href='https://twitter.com/CronosClubAFE'>
          <FontAwesomeIcon icon={faTwitter} /> &nbsp; Twitter
          </a>
          <a target='_blank' href='https://discord.gg/Nn3hqfmZgT'>
          <FontAwesomeIcon icon={faDiscord} /> &nbsp; Discord
          </a>
          <a target='_blank' href='https://cronosclub.gitbook.io/'>
            <FontAwesomeIcon icon={faBook} /> &nbsp; Gitbook
          </a>
        </div>

        <div className="footer-info">
          <p>
            <br></br> Contact us at <a>support@cronos.club</a> or via{" "}
            <a>Discord</a>.
          </p>
          <p>© 2023 CronosClub | All Rights Reserved.</p>
        </div>
    </div>

    <div className='mobile-menu'>
    <button><Link to='/'><FontAwesomeIcon icon={faHome} /></Link></button>
    <button><Link to='/trade'><FontAwesomeIcon icon={faHandshake} /></Link></button>
    <button><Link to='/newsletter'><FontAwesomeIcon icon={faNewspaper} /></Link></button>
    </div>

</div>
  );
}

export default App;
