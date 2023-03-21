import React, { useState } from 'react'
import '../App.css';
import Modal from './Modal';

export default function AnnouncementItem(props) {
    const [showDetails, setshowDetails] = useState(false)
    const [imageNum, setimageNum] = useState(0)
    const [zoomImg, setzoomImg] = useState(false)

    const announcementImages = props.annouImages

    function nextImage(){
        console.log(announcementImages.length)
        console.log(imageNum)
        if(imageNum === announcementImages.length-1){return}
        else{setimageNum(imageNum+1)}
    }

    function prevImage(){
        console.log(announcementImages.length)
        console.log(imageNum)
        if(imageNum === 0){return}
        else{setimageNum(imageNum-1)}
    }


    function announcementDetails(){
        setshowDetails(!showDetails)
    }

    function zoomImage(){
        setzoomImg(!zoomImg)
    }

  return (
    <div>
    {zoomImg && <Modal modalTitle= {"IMAGE "+(imageNum+1)} modalContent = {<img src={announcementImages[imageNum]}></img>} button = {zoomImage}/> }

    <div className='news-table-element'>
        <img src={props.collectionImage}></img>
        <h3>{props.announcementTitle}</h3>
        <h3>{props.announcementDate}</h3>
        <button onClick={announcementDetails}>{showDetails ? "HIDE" : "SHOW" }</button>
    </div>

    {showDetails &&
    <>
    <div className="news-details">
    {announcementImages.length > 0 &&
        <div className='news-image-gallery'>
            <img onClick={zoomImage} src={announcementImages[imageNum]}></img>
            {announcementImages.length > 1 &&
            <div className='news-image-control-panel'>
            <button onClick={prevImage} id='news-image-prev'> PREV </button>
            <h3>{imageNum+1}/{announcementImages.length}</h3>
            <button onClick={nextImage} id='news-image-next'> NEXT </button>
            </div>
            }
        </div>
    }
            <p>
            {props.announcementDesc}
            </p>
    </div>
    </>
    }
</div>
  )
}
