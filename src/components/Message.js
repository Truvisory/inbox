import React from 'react';

const Message = (props) => {
  const messageReadOrSelected = `row message 
          ${props.message.read 
            ? "read" 
            : "unread"}
          ${props.message.selected
            ? "selected" 
            : ""}`
  const checked = 
          props.message.selected
            ? "checked"
            : ""
  const star = 
          props.message.starred
            ? "star fa fa-star"
            : "star fa fa-star-o"
  const devLabel =
          props.message.labels.includes("dev") 
            ? "label label-warning"
            : "hidden"
  const personalLabel = 
          props.message.labels.includes("personal")
            ? "label label-warning"
            : "hidden"
  const gschoolLabel = 
          props.message.labels.includes("gschool")
            ? "label label-warning" 
            : "hidden"
  const displayBody = 
          props.displayMessage
            ? "row message-body"
            : "hidden"
    
    return ( 
      <div>
        <div 
          className={messageReadOrSelected}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input 
                  checked={checked}
                  onChange={() => props.selected(props.message.id)}
                  type="checkbox"/>
              </div>
              <div className="col-xs-2">
                <i 
                  className={star}
                  onClick={() => props.starClick(props.message.id)} >
                </i>
              </div>
            </div>
          </div>
          <div
            className="col-xs-11" 
            onClick={() => props.messageRead(props.message.id)} >
            <span className={devLabel}>dev</span>
            <span className={personalLabel}>personal</span>
            <span className={gschoolLabel}>gschool</span>
            <a href="/#">{props.message.subject}</a>
          </div>
        </div>
        <div className={displayBody}>
          <div className="col-xs-11 col-xs-offset-1">
            {props.message.body}
          </div>
        </div>
      </div>
    )
}

export default Message