import React, { useState } from 'react'

export default function Modal(props) {


  return (
    <div className='modal'>
        <div className='modal-container'>
            <div className='modal-top'>
                <h2>{props.modalTitle}</h2>
                <button onClick={props.button}>CLOSE</button>
            </div>

            <div className='modal-content'> 
                {props.modalContent}
            </div>
        </div>
    </div>
  )
}
