import React from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import Creature from './components/Creature';
import Board from './components/Board'


export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.draggingUpdate = this.draggingUpdate.bind(this)
    this.startDragging = this.startDragging.bind(this)
    this.stopDragging = this.stopDragging.bind(this)

    this.state = {
      endpoint: "http://localhost:4000",
      creatures: {},
      dragging: false,
      dragOrigin: {},
      dragX: 0,
      dragY: 0
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
      this.setState((prevState) => ({
        creatures: {
          ...prevState.creatures,
          [creature.id]: creature
        }
      }))
    })
  }

  startDragging(creatureId, origin) {
    //TODO reset dragging if active
    this.setState({ draggingId: creatureId, dragOrigin: origin });
  }

  stopDragging(creatureId) {
    //TODO reset dragging if active
    console.log("creature Id", creatureId)
    this.setState({ draggingId: '', dragX: 0, dragY: 0 });
  }

  draggingUpdate(x, y) {
    this.setState({ dragX: x - this.state.dragOrigin.clickx, dragY: y - this.state.dragOrigin.clicky });
  }

  render() {
    return (
      <div className="App">
        <Board dragging={this.state.draggingId} draggingUpdate={this.draggingUpdate}>
          {Object.keys(this.state.creatures).map((creatureId, index) => {
            return (
              <Creature key={creatureId}
                creature={this.state.creatures[creatureId]}
                layout={{ x: 10 + 170 * index, y: 10 }}
                dragging={this.state.draggingId == creatureId}
                startDragging={this.startDragging}
                stopDragging={this.stopDragging} />
            )
          })}
          {this.buildDraggingComponent()}
        </Board>
        <button onClick={() => this.sendRandomCreatureRequest()}>Get Random Creature</button>
        <button onClick={() => this.sendBreedRequest()}>Breed</button>
      </div>
    );
  }
  buildDraggingComponent() {
    if (this.state.draggingId) {
      let creature = this.state.creatures[this.state.draggingId];
      return (<Creature key={creature.id}
          creature={creature}
          layout={{ x: this.state.dragOrigin.layoutx + this.state.dragX, y: this.state.dragOrigin.layouty + this.state.dragY }}
          dragging={true}
          startDragging={this.stopDragging}
          stopDragging={this.stopDragging}
      ></Creature>
      )
    }
  }
}
