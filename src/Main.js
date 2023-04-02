import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";
import animation from "./images/animation.webp";
import nft from "./images/trade.png";
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
              Our trade system allows users to securely trade their NFTs without the risk of scams. Every user has a trade URL where their NFTs are stored, and other users can create offers to trade for any NFTs they are interested in. This system makes it easy and safe for users to trade their NFTs and expand their collections.
              </p>
            <div>
              <button>Trade Now</button> &nbsp; <button>Learn More</button>
            </div>
          </div>

          <div className="project-item">
            <img width={100} src={nft}></img>
            <h1>LAUNCHPAD</h1>
            <p>
            Our launchpad system includes an affiliate program where every user is provided with a unique affiliate URL that can be shared with their community. When NFTs are minted from this URL, the affiliate owner earns a percentage of the profit. This system allows users to earn passive income by promoting NFT collections on our platform.
            </p>
            <div>
              <button>Launchpad</button> &nbsp; <button>Learn More</button>
            </div>
          </div>

          <div className="project-item">
            <img width={100} src={nft}></img>
            <h1>NEWS</h1>
            <p>
            Newsletter page is regularly updated with the latest developments, announcements, and updates from various NFT collections on the chain. This ensures that our users are always in the know about the latest trends, releases, and upcoming events in the Cronos Chain, and helps them make informed decisions about their investments.
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

      
    </div>
  );
}

export default App;
