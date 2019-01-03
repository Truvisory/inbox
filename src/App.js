import React, { Component } from 'react';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
const url = 'http://localhost:8082/api/messages'

class App extends Component {
  constructor(){
    super()
      this.state = {
        messages: []
      }
  }

  async componentDidMount() {
    const response = await fetch(url)
    const json = await response.json()
    this.setState({messages: json})
  }

  messageRead = async (id) => {
    const read = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": [id],
        "command": "read",
        "read": true
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const readMessages = this.state.messages.map(message => {
      if(message.id === id) {
        message.read = true
      }
    return message
    })
    this.setState({messages: readMessages})
  }

  starClick = async (id) => {
    const starred = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": [id],
        "command": "star",
        "starred": true
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const clickedStar = this.state.messages.map(message => {
      if(message.id === id) {
        message.starred = !message.starred
      }
    return message
    })
    
    this.setState({messages: clickedStar})
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="container">
        <Toolbar />
        {this.state.messages[0]
          ? <MessageList 
              messages={this.state.messages}
              messageRead={this.messageRead}
              starClick={this.starClick}
            />
          : <div></div>}
      </div>
    );
  }
}

export default App;