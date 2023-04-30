import React, { useEffect, useRef, useState } from 'react'
import '../App.css';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

const timestampFormats = {
    'D': { dateStyle: 'long' },
    't': { timeStyle: 'short' },
    'd': { dateStyle: 'short' },
    'T': { timeStyle: 'medium' },
    'R': { style: 'long', numeric: 'auto' },
    'f': { dateStyle: 'long', timeStyle: 'short' },
    'F': { dateStyle: 'full', timeStyle: 'short' },
};

function automaticRelativeDifference(timestamp) {
    const diff = -((Date.now() - timestamp)/1000)|0;
    const absDiff = Math.abs(diff);
    if (absDiff > 86400*30*10) {
        return { duration: Math.round(diff/(86400*365)), unit: 'years' };
    }
    if (absDiff > 86400*25) {
        return { duration: Math.round(diff/(86400*30)), unit: 'months' };
    }
    if (absDiff > 3600*21) {
        return { duration: Math.round(diff/86400), unit: 'days' };
    }
    if (absDiff > 60*44) {
        return { duration: Math.round(diff/3600), unit: 'hours' };
    }
    if (absDiff > 30) {
        return { duration: Math.round(diff/60), unit: 'minutes' };
    }
    return { duration: diff, unit: 'seconds' };
}

function convertTimestamp(type, timestamp) {
    timestamp *= 1000;

    if (type === 'R') {
        const formatter = new Intl.RelativeTimeFormat(navigator.language || 'en', timestampFormats[type] || {});
        const format = automaticRelativeDifference(timestamp);
        return formatter.format(format.duration, format.unit);
    }
    
    const formatter = new Intl.DateTimeFormat(navigator.language || 'en', timestampFormats[type] || {});
    return formatter.format(new Date(timestamp));
}

function convertNewsNode(node) {
    if (typeof(node) === 'string') {
        return node;
    }

    if (node.type === 'text') {
        return node.content;
    }

    if (node.type === 'twemoji') {
        return node.name;
    }

    if (node.type === 'br') {
        return <br />;
    }

    if (node.type === 'user') {
        return <span className="dc-user">@{node.tag}</span>;
    }

    if (node.type === 'here' || node.type === 'everyone') {
        return <span className="dc-user">@{node.type}</span>;
    }

    if (node.type === 'role') {
        return <span className="dc-role" style={{color: node.color}}>@{node.name}</span>;
    }

    if (node.type === 'channel') {
        return <span className="dc-channel">#{node.name}</span>;
    }

    if (node.type === 'emoji') {
        return <img src={node.url} alt={node.name} />
    }

    if (node.type === 'codeBlock') {
        return <code className="dc-multi-code">{convertNews(node.content)}</code>;
    }

    if (node.type === 'blockQuote') {
        return <blockquote className="dc-quote">{convertNews(node.content)}</blockquote>;
    }

    if (node.type === 'inlineCode') {
        return <pre className="dc-code">{convertNews(node.content)}</pre>;
    }

    if (node.type === 'em') {
        return <i>{convertNews(node.content)}</i>;
    }

    if (node.type === 'strong') {
        return <b>{convertNews(node.content)}</b>;
    }

    if (node.type === 'strikethrough') {
        return <s>{convertNews(node.content)}</s>;
    }

    if (node.type === 'underline') {
        return <u>{convertNews(node.content)}</u>;
    }

    if (node.type === 'spoiler') {
        return <span className="dc-spoiler">{convertNews(node.content)}</span>;
    }

    if (node.type === 'url' || node.type === 'autolink') {
        return <a className="dc-link" href={node.target} rel="noreferrer">{convertNews(node.content)}</a>;
    }

    if (node.type === 'timestamp') {
        return <span className="dc-timestamp" title={new Date(node.timestamp * 1000).toLocaleString()}>{convertTimestamp(node.format, node.timestamp)}</span>;
    }

    if (node.content) {
        return convertNewsNode(node.content);
    }

    console.warn("parser missing node:", node);

    return "<ERROR>";
}

function convertNews(nodes) {
    if (typeof(nodes) === 'string') {
        return nodes;
    }

    return nodes.flatMap((node, i) => <span key={i}>{convertNewsNode(node)}</span>);
}

export default function AnnouncementItem(props) {
    const [showDetails, setshowDetails] = useState(false)
    const [imageNum, setimageNum] = useState(0)
    const [zoomImg, setzoomImg] = useState(false)
    const announcementImages = props.annouImages
    const { announcementDesc } = props;
    const content = convertNews(announcementDesc);
    
    function nextImage(){
        if(imageNum === announcementImages.length-1){return}
        else{setimageNum(imageNum+1)}
    }
    
    function prevImage(){
        if(imageNum === 0){return}
        else{setimageNum(imageNum-1)}
    }

    useEffect(() => {
        console.log(announcementImages)
        setshowDetails(props.isDetailsShown);
      }, [props.isDetailsShown]);
    
      const announcementDetails = () => {
        props.onDetailsToggle();
        setshowDetails(!showDetails);
        scrollToElement()
      };
    
    function zoomImage(){
        setzoomImg(!zoomImg)
    }

    const myRef = useRef(null)
    const scrollToElement = () => {
        if (myRef.current) {
          setTimeout(() => {
            window.scrollTo({
              top: myRef.current.offsetTop -50,
              behavior: "smooth"
            });
          }, 200);
        }
      };
    
    return (
        <>
        {zoomImg && <Modal modalTitle= {"IMAGE "+(imageNum+1)} modalContent = {<img src={announcementImages[imageNum].url} alt="Modal" />} button = {zoomImage}/> }
        
        <div className='news-table-element'>
        <img src={props.collectionImage} alt="Collection"></img>
        <div className='news-author'>
        <FontAwesomeIcon size='1x' icon={faUser} /> &nbsp;&nbsp;&nbsp;
        <h2>{props.announcementTitle}</h2>
        </div>
        <h3 ref={myRef} >{props.announcementDate}</h3>
        <button onClick={announcementDetails}>{showDetails ? "HIDE" : "SHOW" }</button>
        </div>
        
        {showDetails &&
            <>
            <div className="news-details">
            {announcementImages.length > 0 &&
                <div className='news-image-gallery'>

                {announcementImages[imageNum].type === 'image' && (
                    <img onClick={zoomImage} src={announcementImages[imageNum].url} alt={props.announcementTitle} /> 
                )}

                {announcementImages[imageNum].type === 'video' && (
                    <video muted autoPlay height={200} src={announcementImages[imageNum].url} controls />
                )}

                {announcementImages.length > 1 &&
                    <div className='news-image-control-panel'>
                    <button onClick={prevImage} id='news-image-prev'> PREV </button>
                    <h3>{imageNum+1}/{announcementImages.length}</h3>
                    <button onClick={nextImage} id='news-image-next'> NEXT </button>
                    </div>
                }
                </div>
            }
            <div className="news-content">
            {content}
            </div>
            </div>
            </>
        }
        </>
        )
    }
    