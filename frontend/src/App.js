import React from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";


export default class App extends React.Component {
  constructor(props) {
    super(props)



    this.state = {
      endpoint: "http://localhost:3000",
      msg: ''
    }

    this.socket = socketIOClient(this.state.endpoint);
  }
  send() {

    this.socket.emit('dosomething')
  }

  componentDidMount = () => {
    console.log("mounted")
    //setInterval(this.send(), 1000)
    this.socket.on('sayhello', (msg) => {
      console.log("server said hello")
      this.setState({ msg })
      //document.body.style.backgroundColor = col
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.msg}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
            </a>
        </header>
        <button onClick={() => this.send()}>Say hello</button>
      </div>
    );
  }
}
