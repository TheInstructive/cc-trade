import React from "react";
import videoBG from "./images/Slower.mp4";
import './afewl.css'

export default function AfeWhitelist() {
  return (
    <div className="afewl-container">
      <div className="background-video">
        <video autoPlay loop muted>
          <source src={videoBG} type="video/mp4" />
        </video>
      </div>

      <div className="afe-desc">
        <h1>ALIENS FROM EARTH: BABY ALIENS</h1>
        <p>
          BABY ALIENS is a collection of 5.000 uniquely generated NFTs that'll
          be minted on Cronos Chain. Each NFT has different attributes with
          different rarities. A BABY ALIEN is also the key of the Cronos Club's
          other projects.
        </p>
        <div className="mint-prices">
          <p><b>PUBLIC MINT PRICE:</b> 199CRO</p>
          <p><b>WL MINT PRICE:</b> 145CRO</p>
        </div>
      </div>

      <iframe
        className="wl-form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSczwyCnitkjazMVAdk3TO7TxI5ExTdHrziHPj-bPnyvK4YpZQ/viewform?embedded=true"
        width="100%"
        height="1200px"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading...
      </iframe>

    </div>
  );
}
