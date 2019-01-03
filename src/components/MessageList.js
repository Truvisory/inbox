import React from 'react';

const MessageList = (props) => {
    return ( 
      props.messages.map((messages, idx) => 
      <div key={idx} className={messages.read ? "row message read" : "row message unread"} >
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={messages.selected ? "checked" : ""}/>
            </div>
            <div className="col-xs-2">
              <i onClick={props.starClick} className={messages.starred ? "star fa fa-star" : "star fa fa-star-o"}>
              </i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          <a href="/#">
            {messages.subject}
          </a>
        </div>
      </div>
      )
    )
}

export default MessageList