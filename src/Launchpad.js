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
                    <div className='launchpad-collection-image'>
                    <div className='launchpad-time'>10:14:20</div>
                    <div className='launchpad-price'>200CRO</div>
                    <img src={loaded}></img>
                    </div>

                    <div className='launchpad-collection-details'>
                        <h2>AFE: Baby Aliens</h2>
                        <p>Koleksiyon açıklaması, kısa.</p>
                        <button>Details</button>
                    </div>
                </div>
            </div>
        </div>
  );
}
