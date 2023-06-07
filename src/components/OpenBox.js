import React, { useState } from 'react';
import './OpenBox.css';

const items = [
    {
      skin: "Baby Alien #1147",
      img: require('../images/collections/ballies.png')
    },
    {
      skin: "Baby Alien #3000",
      img: require('../images/collections/BabyAlienDivision.png')
    },
    {
      skin: "Baby Alien #1",
      img: require('../images/collections/afe.png')
    },
    {
      skin: "Baby Alien #50",
      img: require('../images/collections/aiko.png')
    }
];
  

const OpenBox = () => {
    const [openedItem, setOpenedItem] = useState('');

    const generate = () => {
        const selectedItems = [];
        const container = document.querySelector('.raffle-roller-container');
      
        // Clear the container
        container.innerHTML = '';
      
        // Generate the item elements
        for (let i = 0; i < 101; i++) {
          const selectedItem = items[Math.floor(Math.random() * items.length)];
          selectedItems.push(selectedItem);
      
          const element = document.createElement('div');
          element.id = `CardNumber${i}`;
          element.className = 'item class_red_item';
          element.style.backgroundImage = `url(${selectedItem.img})`;
      
          container.appendChild(element);
        }
      
        setTimeout(() => {
          const randomIndex = 2;
          const selectedItem = items[randomIndex];
          goRoll(selectedItem.skin, selectedItem.img);
        }, 500);
      };
      
  
    const goRoll = (skin, skinimg) => {
      const container = document.querySelector('.raffle-roller-container');
      const cardNumber78 = document.getElementById('CardNumber78');
  
      container.style.transition = 'all 8s cubic-bezier(.08,.6,0,1)';
      cardNumber78.style.backgroundImage = `url(${skinimg})`;
  
      setTimeout(() => {
        cardNumber78.classList.add('winning-item');
        setOpenedItem(skin);
  
        const winElement = document.createElement('div');
        winElement.className = 'item class_red_item';
        winElement.style.backgroundImage = `url(${skinimg})`;
  
        document.querySelector('.inventory').appendChild(winElement);
      }, 8500);
  
      container.style.marginLeft = '-6770px';
    };
  
  
    return (
      <div>
        <div className="raffle-roller">
          <div className="raffle-roller-holder">
            <div className="raffle-roller-container"></div>
          </div>
        </div>
        <center>
          You winning is <span id="rolled">{openedItem || 'rolling'}</span>
          <button onClick={generate}>go</button>
          <button onClick={() => window.location.reload()}>reset</button>
        </center>
        <div className="inventory"></div>
      </div>
    );
  };
export default OpenBox;
