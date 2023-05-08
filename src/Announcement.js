import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Announcement() {
  const { slug } = useParams();


  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = `https://cronos.news/${slug}`;
    }, 2000);

    return () => clearTimeout(timeout);
  });

  return (
    <div className='main-container'>
       <h1 id='redirect-text'>You are redirecting to https://cronos.news/{slug}</h1>
    </div>
  )
}
