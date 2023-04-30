import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";
import animation from "./images/animation.webp";
import nft from "./images/trade.png";
import Typewriter from "./components/TypeWriter";
import Tutorial from "./components/Tutorial";
import testvideo from "./images/testvideo.mp4";
import newslettervideo from "./images/newsletter.mp4";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function App() {
  const [tutorialRender, setTutorialRender] = useState(0);
  const { t } = useTranslation();

  return (
    <div className="App">
      <div className="main-container">
        <div className="banner">
          <div className="banner-left">
            <Typewriter
              words={[t('safetrade'), t('launchpad'), t('collectionnews')]}
              descriptions={[t('tradeyournft'), t('shareyourref'), t('followcollection')]}
            />
            <br></br>
          <button>
          {t('connectwallet')} &nbsp;&nbsp;
              <FontAwesomeIcon icon={faCircleArrowRight} />
            </button>
          </div>

          <div className="banner-right">
            <img width={550} src={animation} />
          </div>
        </div>

        <div className="projects-container">
          <div className="project-item">
            <img width={100} src={nft}></img>
            <h1>TRADE</h1>
              <p>
              {t('tradedesc')}
              </p>
            <div>
              <button disabled>Trade Now</button> &nbsp; <button id="project-item2" disabled>Learn More</button>
            </div>
          </div>

          <div className="project-item">
            <img width={100} src={nft}></img>
            <h1>LAUNCHPAD</h1>
            <p>
            {t('launchpaddesc')}
            </p>
            <div>
              <button disabled>Launchpad</button> &nbsp; <button id="project-item2" disabled>Learn More</button>
            </div>
          </div>

          <div className="project-item">
            <img width={100} src={nft}></img>
            <h1>NEWS</h1>
            <p>
            {t('newsdesc')}
            </p>
            <div>
              <button id="project-item1"><Link to='/newsletter'>Show News</Link></button> &nbsp; <button id="project-item2"><Link to='/newsletter' >Learn More</Link></button>
            </div>
          </div>
        </div>

        <div className="note">
          <h2>
            {t('ourvision')}
          </h2>
        </div>

        {tutorialRender == 0 && (
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

        {tutorialRender == 1 && (
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

        
        {tutorialRender == 2 && (
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
      </div>

      
    </div>
  );
}

export default App;
