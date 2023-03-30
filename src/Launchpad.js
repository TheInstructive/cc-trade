import React, { useEffect, useState } from 'react'
import Slider from './components/Slider';
import loaded from './images/ll.jpg'

export default function Launchpad() {
    return (
        <div>
            <Slider/>

            <div className='launchpad-container'>
                <h1>COLLECTIONS</h1>
                <div className='launchpad-collection-item'>
                    <img src={loaded}></img>
                </div>
            </div>

        </div>
  );
}
