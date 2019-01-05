import React, { Component } from 'react';
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'
import MessageList from './components/MessageList'
const url = 'http://localhost:8082/api/messages'

class App extends Component {
  constructor(){
    super()
      this.state = {
        messages: [],
        composeForm: false
      }
  }

  async componentDidMount() {
    const response = await fetch(url)
    const json = await response.json()
    this.setState({messages: json})
  }

  updates = async (id, command, key, value) => {
    await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": [id],
        "command": command,
        [key]: value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  sendMessage = async (id, subject, body) => {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        "messageIds": [id],
        subject: subject,
        body: body,
        read: false,
        starred: false,
        labels: [],
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  messageRead = (id) => {
    const readMessages = this.state.messages.map(message => {
      if(message.id === id) message.read = true
      return message
    })
    this.setState({
      messages: readMessages})
    this.updates(id, "read", "read", true)
  }

  starClick = (id) => {
    const clickedStar = this.state.messages.map(message => {
      if(message.id === id) message.starred = !message.starred
      return message
    })
    this.setState({messages: clickedStar})
    this.updates(id, "star", "starred", true)
  }

  selected = (id) => {
    const select = this.state.messages.map(message => {
      if(message.id === id) message.selected = !message.selected
      return message
    })
    this.setState({messages: select})
  }

  bulkSelect = () => {
    const selectedMessages = this.state.messages.filter(message => message.selected === true)
    const allSelected = this.state.messages.map(message => {
      selectedMessages.length !== this.state.messages.length
        ? message.selected = true
        : message.selected = false
      return message
    })
    this.setState({messages: allSelected})
  }

  markedRead = () => {
    const selectedMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        message.read = true
        this.updates(message.id, "read", "read", true)
      }
      return message
    })
    this.setState({messages: selectedMessages})
  }

  markedUnread = () => {
    const selectedMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        message.read = false
        this.updates(message.id, "read", "read", false)
      }
      return message
    })
    this.setState({messages: selectedMessages})
  }

  delete = () => {
    const selectedMessages = this.state.messages.filter(message => {
      if (message.selected === true) {
        this.updates(message.id, "delete")
      }
      return !message.selected === true
    })
    this.setState({messages: selectedMessages})
  }

  applyLabel = (e) => {
    const selectedMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        message.labels = Array.from(new Set([...message.labels, e.target.value]))
        this.updates(message.id, "addLabel", "label", e.target.value)
      }
      return message
    })
    this.setState({messages: selectedMessages})
  }

  removeLabel = (e) => {
    const selectedMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        message.labels = message.labels.filter(label => label !== e.target.value) 
        this.updates(message.id, "removeLabel", "label", e.target.value)
      }
      return message
    })
    this.setState({messages: selectedMessages})
  }

  composeFormButton = () => {
    this.setState({composeForm: !this.state.composeForm})
  }

  composeData = (e) => { e.preventDefault()
    let newMessage = {
      body: e.target[1].value,
      id: this.state.messages.length + 1,
      labels: [],
      read: false,
      starred: false,
      subject: e.target[0].value
    }
    this.setState({
      messages: [newMessage, ...this.state.messages],
      composeForm: !this.state.composeForm})
    this.sendMessage(newMessage.id, newMessage.subject, newMessage.body)
  }

  render() {
      console.log(this.state.messages)
      const unreadCount = this.state.messages.filter(message => message.read === false).length
      const selectedIndicator = this.state.messages.filter(message => message.selected === true).length
      const messageCount = this.state.messages.length
    return (
      <div className="container">
        <Toolbar 
          messageCount={messageCount}
          bulkSelect={this.bulkSelect} 
          markedRead={this.markedRead}
          markedUnread={this.markedUnread}
          delete={this.delete}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}
          unreadCount={unreadCount} 
          selectedIndicator={selectedIndicator}
          composeFormButton={this.composeFormButton} />
        {this.state.composeForm
          ? <ComposeForm composeData={this.composeData}/>
          : <div></div> }
        {this.state.messages[0]
          ? <MessageList 
              messages={this.state.messages}
              messageRead={this.messageRead}
              starClick={this.starClick}
              selected={this.selected} />
          : <div></div>}
      </div>
    );
  }
}

export default App;