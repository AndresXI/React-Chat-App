import React, { Component } from 'react';
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from '../../Events';
import LoginForm from '../LoginForm/LoginForm'


/** Url to connect to our server */
const socketUrl = "http://localhost:4343";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: null
    }
  }

  /** Run socket.io connection when components mounts. */
  componentWillMount() {
    this.initSocket();
  }


  /** Initialize and connect socket.io */
  initSocket = () => {
    const socket = io(socketUrl);

    socket.on('connect', () => {
      console.log('CLIENT CONNECTED');
    });

    this.setState({ socket });
  };


  /**
    Set the user property in sate
   */
  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ socket })
  };

  /** Lets the user logout */
  logout = () => {
    // Emmit to the server that the user has logged out
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };


  render() {
    const {socket } = this.state;

    return (
      <div className="container">
        <LoginForm socket={socket} setUser={this.setUser} />
      </div>
    )
  }
}

export default Layout;
