import React, {Component} from 'react';
import SideBar from './SideBar/SideBar.js'

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      activeChat: null
    }
  }

  /**
   * Set the active chat to our state.
   * */
  setActiveChat = (activeChat) => {
    this.setState({activeChat: activeChat})
  };


  render() {
    const { user, logout} = this.props;
    const {chats, activeChat} = this.state;

    return (
      <div className="chat-container">
        <SideBar
          logout={logout}
          chats={chats}
          user={user}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}/>
      </div>
    );
  }
}

export default ChatContainer;