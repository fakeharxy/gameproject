import React from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import Creature from './components/Creature';
import Board from './components/Board';
import { BOARD_HEIGHT } from './client_constants';

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
    this.socket.on('updates', (updates) => {
      console.log("Update Received!")
      console.log(updates)
      this.handleUpdates(updates)
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

  handleUpdates(updates) {
    this.setState((prevState) => ({
      creatures: {
        ...prevState.creatures,
        ...updates.creatures
      }
    }))
  }

  render() {
    return (
      <div className="App">
        <Board stopDragging={this.stopDragging} dragging={this.state.draggingId} draggingUpdate={this.draggingUpdate}>
          {this.positionCreatures()}
          {this.buildDraggingComponent()}
        </Board>
        <button onClick={() => this.sendRandomCreatureRequest()}>Get Random Creature</button>
      </div>
    );
  }

  positionCreatures() {
    let handIndex = 0;
    let deadIndex = 0;
    return Object.keys(this.state.creatures).map((creatureId) => {
      let creature = this.state.creatures[creatureId];
      let x, y;
      if (creature.health > 0) {
        //add to hand
        x = 10 + 170 * (handIndex % 7); // the '% 7' remains from the early version which showed all creatures in rows
        y = BOARD_HEIGHT - 100;
        handIndex++;
      } else {
        //add to dead stack
        x = 10 + 170 * 7 + deadIndex * 2;
        y = BOARD_HEIGHT - 100 + deadIndex * 1;
        deadIndex++;
      }
      return (
        <Creature key={creatureId}
          creature={creature}
          layout={{ x: x, y: y }}
          dragging={this.state.draggingId == creatureId}
          startDragging={this.startDragging}
          draggedTo={this.draggedTo} />
      )
    })
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
