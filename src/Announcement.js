import React, { useEffect, useState } from 'react'
import AnnouncementItem from './components/AnnouncementItem';
import { useParams } from 'react-router-dom';
import { bySlug } from './collections';

function filterImages(item) {
  return item.attachments.filter(
    file => file.contentType && file.contentType.startsWith('image/')
  ).map(file => file.url);
}

function getDate(item) {
  return item.timestamp ? new Date(item.timestamp).toLocaleString() : "-";
}

export default function Announcement() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const collection = bySlug(slug);
  const page = 0;

  useEffect(() => {
    fetch(`https://cronosnft.club/cronos_club/news.php?channelid=${collection.id}&page=${page}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [collection.id]);

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
            <h1>NEWS FROM <b>{collection.name}</b></h1>
            <div className='news-table'>
            {data && data.length > 0 && (
            data.map((announcement) => (
                <AnnouncementItem
                    key={announcement.url}
                    collectionImage = {collection.image}
                    annouImages={filterImages(announcement)}
                    announcementTitle={announcement.authorid}
                    announcementDate={getDate(announcement)}
                    announcementDesc={announcement.content}
                    mentions={announcement.mentions}
                />
            ))
        )}

                

            </div>
        </div>
    </div>
  )
}
