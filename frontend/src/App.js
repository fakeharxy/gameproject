import React from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import Creature from './components/Creature';


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      endpoint: "http://localhost:4000",
      creatures: []
    }

    this.socket = socketIOClient(this.state.endpoint);
  }
  send() {
    this.socket.emit('mate', this.state.creatures[0].id, this.state.creatures[1].id)
  }

  componentDidMount = () => {
    console.log("mounted")
    this.socket.on('newcreature', (creature) => {
      console.log("Creature Received!")
      this.setState({ creatures: [...this.state.creatures, creature] })
    })
  }

  render() {
    return (
      <div className="App">

        {this.state.creatures.map(creature => {
          return ( <Creature key={creature.id} creature={creature} /> )
        })}

        <button onClick={() => this.send()}>Say hello</button>
      </div>
    );
  }
}
