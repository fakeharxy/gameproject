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
    this.draggedTo = this.draggedTo.bind(this)

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

  sendBreedRequest(creature1, creature2) {
    //this.socket.emit('mate', this.state.creatures[0].id, this.state.creatures[1].id);
    if (creature1 && creature2) {
      this.socket.emit('mate', creature1.id, creature2.id);
    }
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

  stopDragging() {
    //TODO reset dragging if active
    this.setState({ draggingId: '', dragX: 0, dragY: 0 });
  }

  draggingUpdate(x, y) {
    this.setState({ dragX: x - this.state.dragOrigin.clickx, dragY: y - this.state.dragOrigin.clicky });
  }

  draggedTo(targetCreature) {
    this.stopDragging();
    //breed!
    this.sendBreedRequest(this.state.creatures[this.state.draggingId], targetCreature);
  }

  render() {
    return (
      <div className="App">
        <Board stopDragging={this.stopDragging} dragging={this.state.draggingId} draggingUpdate={this.draggingUpdate}>
          {Object.keys(this.state.creatures).map((creatureId, index) => {
            return (
              <Creature key={creatureId}
                creature={this.state.creatures[creatureId]}
                layout={{ x: 10 + 170 * (index % 4), y: 10 + (80 * Math.floor(index / 4)) }}
                dragging={this.state.draggingId == creatureId}
                startDragging={this.startDragging}
                draggedTo={this.draggedTo} />
            )
          })}
          {this.buildDraggingComponent()}
        </Board>
        <button onClick={() => this.sendRandomCreatureRequest()}>Get Random Creature</button>
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
