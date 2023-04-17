import React from 'react'
import animation from "./images/animation.webp";
export default function Soon(props) {

  return (
    <div className='soon'>
        <img width={550} src={animation} />
        <h2>TRADE - NEWSLETTER - LAUNCHPAD</h2>
        <h1>COMING SOON</h1>

        <h4>{props.title}</h4>
        <p>{props.desc}</p>
    </div>
  )
}
