import React, { Component } from 'react';
import io from 'socket.io-client';

/** Url to connect to our server */
const socketUrl = "http://localhost:4343";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null
    }
  }

  componentWillMount() {
    this.initSocket();
  }

  /** Initialize socket.io */
  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('CLIENT CONNECTED');
    })
    this.setState({ socket });
  }

  render() {
    const { title } = this.props
    return (
      <div className="container">
        {title}
      </div>
    )
  }
}

export default Layout;
