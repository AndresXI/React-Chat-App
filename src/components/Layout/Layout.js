import React, { Component } from 'react';
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from '../../Events';
import LoginForm from '../LoginForm/LoginForm'
import ChatContainer from '../Chats/ChatContainer.js'


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
   * Set the user property in sate
   * @param {Object} user - The user that will connect in our chat
   * @param {number} user.id - The user id
   * @param {string} user.nam - The user name
   */
  setUser = (user) => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user: user });
  };

  /** Lets the user logout. */
  logout = () => {
    // Emmit to the server that the user has logged out
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };


  render() {
    const {socket, user } = this.state;

    return (
      <div className="container">
        {
          !user ?
            <LoginForm socket={socket} setUser={this.setUser} />:
            <ChatContainer socket={socket} user={user} logout={this.logout} />
        }
      </div>
    )
  }
}

export default Layout;
