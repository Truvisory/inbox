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

  starClick = (e) => {
    // console.log(e.target.value)
    let filteredProducts = 
      this.state.messages.filter((message) => message.id === e.target.id * 1 )
      console.log(e.target[2])
    this.setState({starred: !this.state.starred})
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="container">
        <Toolbar />
        {this.state.messages[0]
          ? <MessageList 
              messages={this.state.messages}
              starClick={this.starClick} />
          : <div></div>}
      </div>
    );
  }
}

export default App;