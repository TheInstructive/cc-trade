import React, { useEffect } from 'react'
import './App.css';


export default function Newsletter() {
    useEffect(() => {
      const timeout = setTimeout(() => {
        window.location.href = 'https://cronos.news/';
      }, 2000);
        return () => clearTimeout(timeout);
    });

    
  return (
      <div className='newsletter-container'>
          <h1 id='redirect-text'>You are redirecting to Cronos.News</h1>
      </div>
  )
}