import React, { useState, useEffect } from 'react';
import './OpenBox.css';

const items = [
    {
      skin: "Baby Alien #1147",
      img: require('../images/cheer/1.webp')
    },
    {
      skin: "Baby Alien #3000",
      img: require('../images/cheer/2.webp')
    },
    {
      skin: "Baby Alien #1",
      img: require('../images/cheer/3.webp')
    },
    {
      skin: "Baby Alien #50",
      img: require('../images/cheer/4.webp')
    },
    {
      skin: "Baby Alien #50",
      img: require('../images/cheer/5.webp')
    },
    {
      skin: "Baby Alien #50",
      img: require('../images/cheer/6.webp')
    },
    {
      skin: "Baby Alien #50",
      img: require('../images/cheer/7.webp')
    },
    {
      skin: "Baby Alien #50",
      img: require('../images/cheer/8.webp')
    },
    {
      skin: "Baby Alien #50",
      img: require('../images/cheer/9.webp')
    }
];
  

const OpenBox = () => {
    const [openedItem, setOpenedItem] = useState('');

    
  useEffect(() => {
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
  }, []);

    const generate = () => {
        setTimeout(() => {
          const randomIndex = 2;
          const selectedItem = items[randomIndex];
          goRoll(selectedItem.skin, selectedItem.img);
        }, 500);
      };
      
  
    const goRoll = (skin, skinimg) => {
      const container = document.querySelector('.raffle-roller-container');
      const cardNumber = getCardNumber();
      const winner = document.getElementById(`CardNumber${cardNumber}`);

      container.style.transition = 'all 8s cubic-bezier(.08,.6,0,1)';
      winner.style.backgroundImage = `url(${skinimg})`;
  
      setTimeout(() => {
        winner.classList.add('winning-item');
        setOpenedItem(skin);
  
        const winElement = document.createElement('div');
        winElement.className = 'item class_red_item';
        winElement.style.backgroundImage = `url(${skinimg})`;
  
        document.querySelector('.inventory').appendChild(winElement);
      }, 8000);
  
      container.style.marginLeft = '-6780px';
    };
  
    const getCardNumber = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 100 && screenWidth <= 260) {
          return 74;
        } else if (screenWidth >= 265 && screenWidth <= 440) {
          return 75;
        } else if (screenWidth >= 441 && screenWidth <= 625) {
          return 76;
        } else if (screenWidth >= 626 && screenWidth <= 810) {
          return 77;
        } else if (screenWidth >= 811 && screenWidth <= 999) {
          return 78;
        }else if (screenWidth >= 1000 && screenWidth <= 1180) {
          return 79;
        }else if (screenWidth >= 1181 && screenWidth <= 1360) {
            return 80;
        }else if (screenWidth >= 1361 && screenWidth <= 1545) {
            return 81;
        }else if (screenWidth >= 1546 && screenWidth <= 1730) {
            return 82;
        }else if (screenWidth >= 1731 && screenWidth <= 1915) {
            return 83;
        }else if (screenWidth >= 1916 && screenWidth <= 2100) {
            return 84;
        }else if (screenWidth >= 2101 && screenWidth <= 2285) {
            return 85;
        } else {
          return 86;
        }
      };
  
    return (
      <div>
        <div className="raffle-roller">
          <div className="raffle-roller-holder">
            <div className="raffle-roller-container"></div>
          </div>
        </div>
        <center>
          <button onClick={generate}>go</button>
        </center>
        <div className="inventory"></div>
      </div>
    );
  };
export default OpenBox;
