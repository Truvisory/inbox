import React from 'react';

const Message = (props) => {
    return ( 
      <div 
        className={props.message.read && props.message.selected
          ? "row message read selected"
          : !props.message.read && props.message.selected 
          ? "row message unread selected"
          : !props.message.read && !props.message.selected
          ? "row message unread" 
          : "row message read" } >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={props.message.selected ? "checked" : ""}/>
            </div>
            <div className="col-xs-2">
              <i 
                className={props.message.starred
                  ? "star fa fa-star"
                  : "star fa fa-star-o"}
                onClick={() => props.starClick(props.message.id)} >
              </i>
            </div>
          </div>
        </div>
        <div
          className="col-xs-11" 
          onClick={() => props.messageRead(props.message.id)} >
          <a href="/#">
            {props.message.subject}
          </a>
        </div>
      </div>
    )
}

export default Message