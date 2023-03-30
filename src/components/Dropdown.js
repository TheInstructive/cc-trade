import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown, faSquare, faSquareCheck} from '@fortawesome/free-solid-svg-icons'

export default function Dropdown(props) {
    const { resetThenSet } = props;
    const [isListOpen, setIsListOpen] = useState(false);
    const [headerTitle, setHeaderTitle] = useState(props.title);
    const list = props.list
    const staticTitle = props.title
  
    const toggleList = () => {
        setIsListOpen(prevIsListOpen => !prevIsListOpen);
    };
  
    const selectItem = (item) => {
        const { title, id, key } = item;

        if(item.selected === true)
        {
        setHeaderTitle(staticTitle)
        }
        else{
            setHeaderTitle(title);
        }

        setIsListOpen(false);
        resetThenSet(id, key);

      };

  return (
    <div className="dd-wrapper">
      <button
        type="button"
        className="dd-header"
        onClick={toggleList}
      >
        <div className="dd-header-title">{headerTitle} &nbsp;</div>
        {isListOpen
          ? <FontAwesomeIcon icon={faAngleUp} />

          : <FontAwesomeIcon icon={faAngleDown} />}
      </button>

      {isListOpen && (
        <div
          role="list"
          className="dd-list"
        >
          {list.map((item) => (
            <button
              type="button"
              className="dd-list-item"
              key={item.id}
              onClick={() => selectItem(item)}
            >
              {item.selected && <FontAwesomeIcon color='#4a7dc0' icon={faSquareCheck} />}
              {!item.selected && <FontAwesomeIcon icon={faSquare} />}
              &nbsp;&nbsp;
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
