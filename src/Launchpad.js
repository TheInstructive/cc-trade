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
                <h1>COLLECTIONS</h1>
                <div className='launchpad-collection-item'>
                    <div className='launchpad-collection-image'>
                    <div className='launchpad-time'>10:14:20</div>
                    <div className='launchpad-price'>200CRO</div>
                    <img src="https://pbs.twimg.com/profile_images/1621649066798059522/1NaWOQ5G_400x400.jpg"></img>
                    </div>

                    <div className='launchpad-collection-details'>
                        <h2>AFE: Baby Aliens</h2>
                        <p>Short collection description.</p>
                        <button><Link to="/affiliate">Details</Link></button>
                    </div>
                </div>
            </div>
        </div>
  );
}
