import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight, faArrowsLeftRight,faCheck} from '@fortawesome/free-solid-svg-icons'
import animation from './images/animation.webp'
import loaded from './images/ll.jpg'
import ballies from './images/ballies.png'
import twitter from './images/twitter.svg'
import instagram from './images/instagram.svg'
import discord from './images/discord.svg'




function App() {
  return (
    <div className="App">
      <div className='main-container'>
        <div className='banner'>
            <div className='banner-left'>
              <h2>TRADE <b>CRONOS</b> NFTS!</h2>
              <p>Welcome to decentralized NFT trading on Cronos Club.</p>
              <p>We have made NFT trade transactions on the  <br></br>Cronos Network <b>100% reliable</b> for you.</p>
              <p>Trade your NFTs safely with lowest fees!</p>
              <br></br>
              <button>TRADE NOW! &nbsp;&nbsp;<FontAwesomeIcon icon={faCircleArrowRight} /></button>
            </div>

            <div className='banner-right'>
            <img width={550} src={animation}/>
            </div>
        </div>

        <div className='information-box'>
          <div className='info-box'>
            <h2>COMPLATED TRADES</h2>
            <h1 id='counter'>878</h1>
          </div>

          <div className='info-box'>
            <h2>CONNECTED WALLET</h2>
            <h1 id='counter'>1456</h1>
          </div>
          
          <div className='info-box'>
            <h2>COMPLATED TRADES</h2>
            <h1 id='counter'>421</h1>
          </div>
        </div>

        <h2 id='trade-title'>LAST TRADES</h2>

         <div className='last-trades'>
          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Loaded Lion #1146</h4>
              <img width={150} src={loaded}></img>
              <button>Details</button>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Ballie #1146</h4>
              <img width={150} src={ballies}></img>
              <button>Details</button>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Loaded Lion #1146</h4>
              <img width={150} src={loaded}></img>
              <button>Details</button>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Ballie #1146</h4>
              <img width={150} src={ballies}></img>
              <button>Details</button>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Loaded Lion #1146</h4>
              <img width={150} src={loaded}></img>
              <button>Details</button>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Ballie #1146</h4>
              <img width={150} src={ballies}></img>
              <button>Details</button>
            </div>
          </div>

          <div className='last-trade-container'>
            <div className='last-trade-item'>
              <h4>Loaded Lion #1146</h4>
              <img width={150} src={loaded}></img>
              <button>Details</button>
            </div>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
            <div className='last-trade-item'>
              <h4>Ballie #1146</h4>
              <img width={150} src={ballies}></img>
              <button>Details</button>
            </div>
          </div>

          

         </div>
         
         <h2 id='trade-title'>HOW TO TRADE NFT?</h2>

          <div className='tutorial'>
            <div className='bar-container'>
            <div className='ghost-line'></div>
            <div className='bar-line'></div>
              <div className='dot-container'>
                <div id='dot1' className='bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
                <div id='dot2' className='bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
                <div id='dot3' className='bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
                <div id='dot4' className='bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
              </div>

            </div>

            <div className='tutorial-text'>
              <div id='step1' className='tutorial-step'>
              <h2>Connect your wallet.</h2>
              <p>Connect your wallet on top right.</p>
              </div>

              <div id='step2' className='tutorial-step'>
              <h2>Connect your wallet.</h2>
              <p>Connect your wallet on top right. Connect your wallet on top right. Connect your wallet on top right. Connect your wallet on top right. </p>
              </div>

              <div id='step3' className='tutorial-step'>
              <h2>Connect your wallet.</h2>
              <p>Connect your wallet on top right.</p>
              </div>

              <div id='step4' className='tutorial-step'>
              <h2>Connect your wallet.</h2>
              <p>Connect your wallet on top right.</p>
              </div>
            </div>

            <div className='tutorial-video'>
              Video Area
            </div>
          </div>
      </div>

      <div className='footer'>
        <div className='footer-menus'>
          <div className='footer-menu'>
            <h4>About</h4>
              <li><a>About US</a></li>
              <li><a>FAQ</a></li>
              <li><a>Help</a></li>
              <li><a>AFE</a></li>
          </div>

          <div className='footer-menu'>
          <h4>Terms</h4>
              <li><a>Privacy Policy</a></li>
              <li><a>Terns of Use</a></li>
              <li><a>Smart Contract</a></li>
          </div>

          <div className='footer-menu'>
          <h4>Profile</h4>
              <li><a>Personal Area</a></li>
              <li><a>Trade History</a></li>
              <li><a>Secutiry</a></li>
          </div>

        </div>

        <div className='social-box'>
          <a><img width={20} src={twitter}></img> Twitter</a>
          <a><img width={20} src={instagram}></img> Instagram</a>
          <a><img width={20} src={discord}></img> Discord</a>
        </div>

        <div className='footer-info'>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
          <br></br> Contact us at <a>support@cronos.club</a> or via <a>Discord</a>.</p>
          <p>© 2023 CronosClub | All Rights Reserved.</p>
        </div>
      </div>
      
    </div>
  );
}

export default App;
