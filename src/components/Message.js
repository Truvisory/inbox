import React from 'react';

const Message = (props) => {
    return ( 
      <div className={props.message.read ? "row message read" : "row message unread"} onClick={() => props.messageRead(props.message.id)}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={props.message.selected ? "checked" : ""}/>
            </div>
            <div className="col-xs-2">
              <i onClick={props.starClick} className={props.message.starred ? "star fa fa-star" : "star fa fa-star-o"}>
              </i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="/#">
            {props.message.subject}
          </a>
        </div>
      </div>
    )
}

export default Message