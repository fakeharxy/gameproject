import React from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import Creature from './components/Creature';
import Board from './components/Board'


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      endpoint: "http://localhost:4000",
      creatures: []
    }

    this.socket = socketIOClient(this.state.endpoint);
  }

  sendBreedRequest() {
    this.socket.emit('mate', this.state.creatures[0].id, this.state.creatures[1].id)
  }

  sendRandomCreatureRequest() {
    this.socket.emit('getRandom')
  }

  componentDidMount = () => {
    this.socket.on('newcreature', (creature) => {
      console.log("Creature Received!")
      this.setState({ creatures: [...this.state.creatures, creature] })
    })
  }

  render() {
    return (
      <div className="App">
        <Board>
          {this.state.creatures.map((creature, index) => {
            return (<Creature key={creature.id} creature={creature} layout={{ x: 10 + 170 * index, y: 10 }}/>)
          })}
        </Board>
        <button onClick={() => this.sendRandomCreatureRequest()}>Get Random Creature</button>
        <button onClick={() => this.sendBreedRequest()}>Breed</button>
      </div>
    );
  }
}
