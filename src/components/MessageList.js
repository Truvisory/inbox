import React from 'react';
import Message from '../components/Message'

const MessageList = (props) => {
    return ( 
      props.messages.map((message, idx) => 
        <Message
          message={message} key={idx}/>
      )
    )
}

export default MessageList