import React, { useEffect, useState } from 'react'
import AnnouncementItem from './components/AnnouncementItem';
import { useParams, useLocation } from 'react-router-dom';

export default function Announcement() {
    const { id } = useParams();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const name = queryParams.get('name');
    const image = queryParams.get('image');
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://cronosnft.club/cronos_club/news.php?channelid=${id}&page=0`)
        .then(response => response.json())
        .then(data => setData(data));
    }, [id]);



  return (
    <div className='main-container'>
        <div className='news-collections'>
            <button className='news-item news-active'>
                <img src='https://picsum.photos/30/30'></img>
                <h2>Collection Name</h2>
            </button>

            <button className='news-item'>
                <img src='https://picsum.photos/30/30'></img>
                <h2>Collection Name</h2>
            </button>

            <button className='news-item'>
                <img src='https://picsum.photos/30/30'></img>
                <h2>Collection Name</h2>
            </button>

            <button className='news-item'>
                <img src='https://picsum.photos/30/30'></img>
                <h2>Collection Name</h2>
            </button>
            <button className='news-item'>
                <img src='https://picsum.photos/30/30'></img>
                <h2>Collection Name</h2>
            </button>

            <button className='news-item'>
                <img src='https://picsum.photos/30/30'></img>
                <h2>Collection Name</h2>
            </button>

            <button className='news-item'>
                <img src='https://picsum.photos/30/30'></img>
                <h2>Collection Name</h2>
            </button>

            <button className='news-item'>
                <img src='https://picsum.photos/30/30'></img>
                <h2>Collection Name</h2>
            </button>
        </div>

        <div className='news-container'>
            <h1>NEWS FROM <b>{name}</b></h1>
            <div className='news-table'>
            {data && data.length > 0 && (
            data.map((announcement) => (
                <AnnouncementItem
                    key={announcement.url}
                    collectionImage = {image}
                    annouImages={announcement.attachments.filter(a => a.contentType.startsWith('image/')).map(a => a.url)}
                    announcementTitle={announcement.authorid}
                    announcementDate={announcement.timestamp ? new Date(announcement.timestamp).toLocaleString() : "???"}
                    announcementDesc={announcement.content}
                />
            ))
        )}

                

            </div>
        </div>
    </div>
  )
}
