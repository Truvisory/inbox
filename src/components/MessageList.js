import React from 'react';
import Message from '../components/Message'

const MessageList = (props) => {
    return ( 
      props.messages.map((message, idx) => 
        <Message
          key={idx}
          message={message} 
          messageRead={props.messageRead}
          starClick={props.starClick}
          selected={props.selected} />
      )
    )
}

export default MessageList