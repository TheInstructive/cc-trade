import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";
import animation from "./images/animation.webp";
import nft from "./images/trade.png";
import Typewriter from "./components/TypeWriter";
import Tutorial from "./components/Tutorial";
import testvideo from "./images/testvideo.mp4";
import newslettervideo from "./images/newsletter.mp4";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Player } from '@lottiefiles/react-lottie-player';
import { useWeb3Modal } from "@web3modal/react";
import { WalletContext } from "./web3/WalletConnect";


function App() {
  const [tutorialRender, setTutorialRender] = useState(0);
  const { t } = useTranslation();
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useWeb3Modal();
  const { isConnected } = useContext(WalletContext);

  function onConnectClick() {
    if (isModalOpen) {
      closeModal();
    } else {
      openModal();
    }
  }

  return (
    <div className="App App-1280">
      <div className="main-container">
        <div className="banner">
          <div className="banner-left">
            <Typewriter
              words={[t('safetrade'), t('launchpad'), t('collectionnews')]}
              descriptions={[t('tradeyournft'), t('shareyourref'), t('followcollection')]}
            />
            <br></br>
          {!isConnected &&
          <button className="button" onClick={onConnectClick}>
          {t('connectwallet')} &nbsp;&nbsp;
              <FontAwesomeIcon icon={faCircleArrowRight} />
          </button>}
          </div>

          <div className="banner-right">
            <img width={550} src={animation} />
          </div>
        </div>

        <div className="projects-container">
          <div className="project-item">
            <Player 
            src={require("./images/lottie/trade.json")}
            style={{ height: '200px'}}
            loop
            autoplay
            />

            <h1>TRADE</h1>
              <p>
              {t('tradedesc')}
              </p>
              <button><Link to='/trade'>Trade Now</Link></button>
          </div>

          <div className="project-item">
            <Player 
            src={require("./images/lottie/launchpad.json")}
            style={{ height: '200px'}}
            loop
            autoplay
            />

            <h1>LAUNCHPAD</h1>
            <p>
            {t('launchpaddesc')}
            </p>
              <button disabled>Launchpad</button>
          </div>

          <div className="project-item">
            <Player 
            src={require("./images/lottie/newsletter.json")}
            style={{ height: '200px'}}
            loop
            autoplay
            />

            <h1>NEWS</h1>
            <p>
            {t('newsdesc')}
            </p>
              <button><Link to='/newsletter'>Show News</Link></button>
          </div>
        </div>


        <div className="statements-container">
        <h2 style={{marginTop:0, paddingBottom:'10px'}} id='tutorial-title'>DIRECTION</h2>
          <div className="statement-item">
          <div className="statement-image">
            <Player 
            src={require("./images/lottie/vision.json")}
            style={{ height: '200px'}}
            loop
            autoplay
            />
          </div>
          <div className="statement-desc">
              <h1>VISION</h1>
              <p>
              Our vision for Cronos Club goes beyond just providing a user-friendly platform for NFT trading and launching. We see ourselves as pioneers in the blockchain industry, aiming to leverage the potential of this revolutionary technology to its fullest extent. Our ultimate goal is to create an ecosystem that empowers creators, collectors, and enthusiasts alike, while also contributing to the broader adoption of blockchain technology. We believe that by continuously improving and enhancing our systems, such as our Trade, Launchpad, Staking and Newsletter systems, we can unlock new and exciting use cases for blockchain technology and take the industry to new heights.              </p>
          </div>
          </div>

          <div id="mission" className="statement-item">
            <div className="statement-desc">
            <h1>MISSION</h1>
            <p>
            Our mission is to provide a user-friendly and secure platform that enables seamless NFT trading and launching for creators and collectors alike. We strive to promote the adoption and advancement of blockchain technology by fostering an inclusive community that values innovation, creativity, and transparency. Our goal is to empower individuals and businesses to leverage the power of blockchain to unlock new opportunities and redefine the future of digital ownership.
            </p>
            </div>

            <div className="statement-image">
            <Player 
            src={require("./images/lottie/mission.json")}
            style={{ height: '200px'}}
            loop
            autoplay
            />
            </div>
          </div>

          <div className="statement-item">
          <div className="statement-image">
            <Player 
            src={require("./images/lottie/focus.json")}
            style={{ height: '200px'}}
            loop
            autoplay
            />
          </div>

          <div className="statement-desc">
            <h1>FOCUS</h1>
            <p>
            At our core, we are committed to providing a seamless and secure NFT trading and launching experience for our users. Our team is dedicated to continuously innovating and expanding the platform's capabilities to meet the evolving needs of the blockchain community. We strive to be a trusted and transparent partner for all our users, helping them unlock the full potential of this exciting new technology.
            </p>
          </div>

          </div>
        </div>


        {tutorialRender == 5 && (
          <Tutorial
            maintitle="NEWS"
            title1={t('tutorial1title1')}
            desc1={t('tutorial1desc1')}
            title2={t('tutorial1title2')}
            desc2={t('tutorial1desc2')}
            title3={t('tutorial1title3')}
            desc3={t('tutorial1desc3')}
            title4={t('tutorial1title4')}
            desc4={t('tutorial1desc4')}
            videosource={newslettervideo}
          />
        )}

        {tutorialRender == 5 && (
          <Tutorial
            maintitle="LAUNCHPAD"
            title1="Soon!"
            desc1="Soon!"
            title2="Soon!"
            desc2="Soon!"
            title3="Soon!"
            desc3="Soon!"
            title4="Soon!"
            desc4="Soon!"
            videosource={testvideo}
          />
        )}

        
        {tutorialRender == 5 && (
          <Tutorial
            maintitle="TRADE"
            title1="Soon!"
            desc1="Soon!"
            title2="Soon!"
            desc2="Soon!"
            title3="Soon!"
            desc3="Soon!"
            title4="Soon!"
            desc4="Soon!"
            videosource={testvideo}
          />
        )}


{tutorialRender == 5 && (
        <div className="tutorial-buttons">
          <button
            className={
              tutorialRender == 0
                ? "tutorial-button activebutton"
                : "tutorial-button"
            }
            onClick={() => setTutorialRender(0)}
          >
            News
          </button>
          <button
            className={
              tutorialRender == 1
                ? "tutorial-button activebutton"
                : "tutorial-button"
            }
            onClick={() => setTutorialRender(1)}
          >
            Launchpad
          </button>
          <button
            className={
              tutorialRender == 2
                ? "tutorial-button activebutton"
                : "tutorial-button"
            }
            onClick={() => setTutorialRender(2)}
          >
            Trade
          </button>
        </div>
        )}
      </div>
      
      
    </div>
  );
}

export default App;
