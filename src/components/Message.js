import React from 'react';

const Message = (props) => {
    return ( 
      <div 
        className={`row message 
          ${props.message.read 
            ? "read" 
            : "unread"}
          ${props.message.selected
            ? "selected" 
            : ""}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input 
                checked={props.message.selected
                  ? "checked"
                  : ""}
                onChange={() => props.selected(props.message.id)}
                type="checkbox"/>
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
          <span 
            className={props.message.labels.includes("dev") 
              ? "label label-warning"
              : "hidden"}>dev</span>
          <span 
            className={props.message.labels.includes("personal")
              ? "label label-warning"
              : "hidden"}>personal</span>
          <span 
            className={props.message.labels.includes("gschool")
              ? "label label-warning" 
              : "hidden"}>gschool</span>
          <a href="/#">
            {props.message.subject}
          </a>
        </div>
      </div>
    )
}

export default Message