import React from 'react'
import animation from "./images/animation.webp";
import Xox from './xox';
import { Link } from 'react-router-dom';


export default function NotFound() {
  return (
    <div className='not-found'>
        <img width={550} src={animation} />
        <h1>PAGE NOT FOUND</h1>
        <h4><Link to={"/"}>go back the home</Link> or play TicTacToe against a pro</h4>
        <Xox></Xox>
    </div>
  )
}
