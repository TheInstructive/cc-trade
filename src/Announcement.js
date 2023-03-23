import React, { useEffect, useState } from 'react'
import AnnouncementItem from './components/AnnouncementItem';
import { useParams } from 'react-router-dom';
import { bySlug } from './collections';
import miniCollections from './collections';
import { useNavigate } from 'react-router-dom';

function getDate(item) {
  return item.timestamp ? new Date(item.timestamp).toLocaleString() : "-";
}

export default function Announcement() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const collection = bySlug(slug);
  const page = 0;
  

  useEffect(() => {
    fetch(`https://mellifluous-centaur-e6602b.netlify.app/news?id=${collection.id}&page=${page}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [collection.id]);

  return (
    <div className='main-container'>
        <div className='news-collections'>
            {miniCollections.map((collection) => (
             
             <button onClick={() => navigate(`/announcement/${collection.slug}`)} className='news-item' key={collection.slug}>
             <img src={collection.image} alt={collection.name}></img>
             <h2>{collection.name}</h2>
             </button>
             
             ))}

        </div>

        <div className='news-container'>
            <h1>NEWS FROM <b>{collection.name}</b></h1>
            <div className='news-table'>
            {data && data.length > 0 && (
            data.map((announcement) => (
                <AnnouncementItem
                    key={announcement.id}
                    collectionImage={collection.image}
                    annouImages={announcement.images}
                    announcementTitle={announcement.author.tag}
                    announcementDate={getDate(announcement)}
                    announcementDesc={announcement.content}
                    announcementAuthor = {`https://cdn.discordapp.com/avatars/${announcement.author.id}/${announcement.author.avatar}.png`}
                />
            ))
        )}

            {data && data.length  < 1 && 
            <h2>NO ANNOUNCEMENTS YET</h2>
            }

                

            </div>
        </div>
    </div>
  )
}
