import React from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';


export default function CollectionItem(props) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/announcement/${props.collectionName}`);
  }

  return (
    <div className='collection-item'>
    <h3>{props.collectionName}</h3>
    <img src={props.collectionImage}></img>
    <button onClick={props.buttonClick}>SELECT</button>
    </div>
  )
}
