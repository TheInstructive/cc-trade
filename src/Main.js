import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";
import animation from "./images/animation.webp";
import nft from "./images/trade.png";
import twitter from "./images/twitter.svg";
import instagram from "./images/instagram.svg";
import discord from "./images/discord.svg";
import Typewriter from "./components/TypeWriter";
import Tutorial from "./components/Tutorial";
import testvideo from "./images/testvideo.mp4";
import { useState } from "react";

function App() {
  const [tutorialRender, setTutorialRender] = useState(0);

  return (
    <div className="App">
      <div className="main-container">
        <div className="banner">
          <div className="banner-left">
            <Typewriter
              words={["SAFE TRADE", "LAUNCHPAD", "COLLECTION NEWS"]}
              descriptions={[
                "Trade your NFT without any risk.",
                "Share your refferal url with your community and earn.",
                "Follow collection announcements easily.",
              ]}
            />
            <br></br>
            <button>
              CONNECT WALLET &nbsp;&nbsp;
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <div>
              <button>Trade Now</button> &nbsp; <button>Learn More</button>
            </div>
          </div>

          <div className="project-item">
            <img width={100} src={nft}></img>
            <h1>LAUNCHPAD</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <div>
              <button>Launchpad</button> &nbsp; <button>Learn More</button>
            </div>
          </div>

          <div className="project-item">
            <img width={100} src={nft}></img>
            <h1>NEWS</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <div>
              <button>Show News</button> &nbsp; <button>Learn More</button>
            </div>
          </div>
        </div>

        <div className="note">
          <h2>
            Our vision is to build a platform that not only simplifies NFT
            trading and launching, but also helps advance the potential of
            blockchain technology in new and exciting ways.
          </h2>
        </div>

        {tutorialRender == 0 && (
          <Tutorial
            maintitle="TRADE"
            title1="Connect your wallet."
            desc1="Connect your wallet top right."
            title2="Connect your wallet."
            desc2="Connect your wallet top right."
            title3="Connect your wallet."
            desc3="Connect your wallet top right."
            title4="Connect your wallet."
            desc4="Connect your wallet top right."
            videosource={testvideo}
          />
        )}

        {tutorialRender == 1 && (
          <Tutorial
            maintitle="LAUNCHPAD"
            title1="Connect your wallet."
            desc1="Connect your wallet top right."
            title2="Connect your wallet."
            desc2="Connect your wallet top right."
            title3="Connect your wallet."
            desc3="Connect your wallet top right."
            title4="Connect your wallet."
            desc4="Connect your wallet top right."
            videosource={testvideo}
          />
        )}

        {tutorialRender == 2 && (
          <Tutorial
            maintitle="NEWS"
            title1="Connect your wallet."
            desc1="Connect your wallet top right."
            title2="Connect your wallet."
            desc2="Connect your wallet top right."
            title3="Connect your wallet."
            desc3="Connect your wallet top right."
            title4="Connect your wallet."
            desc4="Connect your wallet top right."
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
            Trade
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
            News
          </button>
        </div>
      </div>

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
              <a>Trade History</a>
            </li>
            <li>
              <a>Secutiry</a>
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
  );
}

export default App;
