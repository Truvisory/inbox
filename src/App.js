import React, { Component } from 'react';
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'
import MessageList from './components/MessageList'
const url = 'https://peaceful-inlet-98478.herokuapp.com/api/messages'

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
    const addSelected = json.map(message => {
      message.selected = false
      message.opened = false
      return message
    })
    this.setState({messages: addSelected})
  }

  updates = async (id, command, key, value) => {
    await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        "messageIds": id,
        "command": command,
        [key]: value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  sendMessage = async (subject, body) => {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        subject: subject,
        body: body,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  messageRead = (id) => {
    const readMessages = this.state.messages.map(message => {
      if(message.id === id) {
        message.read = true
        message.opened = !message.opened
      }
      return message
    })
    this.setState({ messages: readMessages })
    this.updates([id], "read", "read", true)
  }

  starClick = (id) => {
    const clickedStar = this.state.messages.map(message => {
      if(message.id === id) message.starred = !message.starred
      return message
    })
    this.setState({ messages: clickedStar })
    this.updates([id], "star", "starred", true)
  }

  selected = (id) => {
    const select = this.state.messages.map(message => {
      if(message.id === id) message.selected = !message.selected
      return message
    })
    this.setState({ messages: select })
  }

  bulkSelect = () => {
    const selectedMessages = this.state.messages.filter(message => message.selected === true)
    const allSelected = this.state.messages.map(message => {
      selectedMessages.length !== this.state.messages.length
        ? message.selected = true
        : message.selected = false
      return message
    })
    this.setState({ messages: allSelected })
  }

  markedRead = () => {
    const arrId = []
    const selectedMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        message.read = true
        arrId.push(message.id)
      }
      return message
    })
    this.setState({ messages: selectedMessages })
    this.updates(arrId, "read", "read", true)
  }

  markedUnread = () => {
    const arrId = []
    const selectedMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        message.read = false
        arrId.push(message.id)
      }
      return message
    })
    this.setState({ messages: selectedMessages })
    this.updates(arrId, "read", "read", false)
  }

  delete = () => {
    const arrId = []
    const selectedMessages = this.state.messages.filter(message => {
      if (message.selected === true) arrId.push(message.id)
      return !message.selected === true
    })
    this.setState({ messages: selectedMessages })
    this.updates(arrId, "delete")
  }

  applyLabel = (e) => {
    const arrId = []
    const selectedMessages = this.state.messages.map(message => {
      if(message.selected === true && e.target.value !== "Apply label") {
        message.labels = Array.from(new Set([...message.labels, e.target.value]))
        arrId.push(message.id)
      }
      return message
    })
    this.setState({ messages: selectedMessages })
    this.updates(arrId, "addLabel", "label", e.target.value)
  }

  removeLabel = (e) => {
    const arrId = []
    const selectedMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        message.labels = message.labels.filter(label => label !== e.target.value)
        arrId.push(message.id) 
      }
      return message
    })
    this.setState({ messages: selectedMessages })
    this.updates(arrId, "removeLabel", "label", e.target.value)
  }

  composeFormButton = () => {
    this.setState({ composeForm: !this.state.composeForm })
  }

  composeData = (e) => { e.preventDefault()
    let newMessage = {
      body: e.target[1].value,
      id: Math.random().toString(36).substr(2, 9),
      labels: [],
      read: false,
      starred: false,
      subject: e.target[0].value
    }
    this.setState({
      messages: [newMessage, ...this.state.messages],
      composeForm: !this.state.composeForm})
    this.sendMessage(newMessage.subject, newMessage.body)
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