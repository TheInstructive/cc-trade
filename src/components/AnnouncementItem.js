import React, { useState } from 'react'
import '../App.css';
import Modal from './Modal';

function replaceJSX(text, regex, replacer) {
    return text
        .split(regex)
        .flatMap((part, index) => index % 3 === 1 ? replacer(part) : part);
}

function convertMentions(part, mentions) {
    const mention = mentions[part];
    if (!mention) {
        return part;
    }

    if (mention.type === 'user') {
        return <a class="dc-user">@{mention.tag}</a>
    }
    else if (mention.type === 'role') {
        return <a class="dc-role" style={{color: mention.color}}>@{mention.name}</a>
    }
    else if (mention.type === 'channel') {
        return <a class="dc-channel">#{mention.name}</a>
    }
    else if (mention.type === 'emoji') {
        return <img src={mention.url} alt={mention.name} />
    }

    return part;
}

function convertDCToHTML(text, mentions) {
    return replaceJSX(text, /```(?:\w+\n)?(.+?)\n```/gs, part => <code class="dc-multi-code">{part}</code>)
        .flatMap(
            part => typeof(part) == 'string' ? part.split('\n')
                .flatMap(part => [
                    part, <br />
                ])
                .flatMap(part => typeof(part) == 'string' ? replaceJSX(part, /^>(.+?)$/gm, part => <blockquote class="dc-quote">{part}</blockquote>) : part)
                .flatMap(part => typeof(part) == 'string' ? replaceJSX(part, /\*\*(.+?)\*\*/g, part => <b>{part}</b>) : part)
                .flatMap(part => typeof(part) == 'string' ? replaceJSX(part, /\*(.+?)\*/g, part => <i>{part}</i>) : part)
                .flatMap(part => typeof(part) == 'string' ? replaceJSX(part, /~~(.+?)~~/g, part => <s>{part}</s>) : part)
                .flatMap(part => typeof(part) == 'string' ? replaceJSX(part, /\|\|(.+?)\|\|/g, part => <span class="dc-spoiler">{part}</span>) : part)
                .flatMap(part => typeof(part) == 'string' ? replaceJSX(part, /`(.+?)`/g, part => <pre class="dc-code">{part}</pre>) : part)
                .flatMap(part => typeof(part) == 'string' ? part.split(/(<.+?>)/g).flatMap(part => convertMentions(part, mentions)) : part) : part
        )
}

export default function AnnouncementItem(props) {
    const [showDetails, setshowDetails] = useState(false)
    const [imageNum, setimageNum] = useState(0)
    const [zoomImg, setzoomImg] = useState(false)

    const announcementImages = props.annouImages
    const { mentions, announcementDesc } = props;
    const content = convertDCToHTML(announcementDesc, mentions);

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
            {content}
            </p>
    </div>
    </>
    }
</div>
  )
}
