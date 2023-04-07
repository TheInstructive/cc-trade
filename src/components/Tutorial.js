import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

export default function Tutorial(props) {
  return (
    <div>      
        <h2 id='tutorial-title'>{props.maintitle}</h2>
        <div className='tutorial'>
            <div className='bar-container'>
            <div className='ghost-line'></div>
            <div className='bar-line'></div>
              <div className='dot-container'>
                <div id='dot1' className='bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
                <div id='dot2' className='bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
                <div id='dot3' className='bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
                <div id='dot4' className='bar-dot'><FontAwesomeIcon icon={faCheck} /></div>
              </div>

            </div>

            <div className='tutorial-text'>
              <div id='step1' className='tutorial-step'>
              <h2>{props.title1}</h2>
              <p>{props.desc1}</p>
              </div>

              <div id='step2' className='tutorial-step'>
              <h2>{props.title2}</h2>
              <p>{props.desc2}</p>
              </div>

              <div id='step3' className='tutorial-step'>
              <h2>{props.title3}</h2>
              <p>{props.desc3}</p>
              </div>

              <div id='step4' className='tutorial-step'>
              <h2>{props.title4}</h2>
              <p>{props.desc4}</p>
              </div>
            </div>

            <div className='tutorial-video'>
            <video autoPlay controls={false} loop>
            <source src={props.videosource} type="video/mp4" />
            </video>
            </div>
          </div>
    </div>
  )
}
