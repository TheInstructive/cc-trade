import React, { useEffect, useState } from 'react'
import Slider from './components/Slider';
import loaded from './images/ll.jpg'
import { Link, useParams } from 'react-router-dom';

export default function Launchpad() {
    const { id } = useParams();

    return (
        <div>
            <Slider/>

            <div className='launchpad-container'>
                <div className='live-collections-wrapper'>
                    <div className='live-collections'>
                    <h1>LIVE COLLECTIONS</h1>

                        <div className='launchpad-collection-item'>
                            <div className='launchpad-collection-image'>
                                <img src={require('../src/images/banner.png')}></img>
                            </div>

                            <div className='launchpad-collection-details'>
                                <h2>AFE: Baby Aliens</h2>
                                <div className='launchpad-info'>
                                    <div className='launchpad-price'>Price: 200CRO</div>
                                    <div className='launchpad-supply'>Supply: 5000</div>
                                </div>
                                <Link to="/affiliate"><button>Details</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}
