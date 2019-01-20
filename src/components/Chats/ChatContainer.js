import React, {Component} from 'react';
import SideBar from './SideBar/SideBar.js'
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECEIVED, TYPING } from '../../Events';
import ChatHeading from './ChatHeading';
import Messages from './Messages/Messages';
import MessageInput from './Messages/MessageInput/MessageInput';



class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      activeChat: null
    }
  };

  componentDidMount() {
    const {socket} = this.props;
    socket.emit(COMMUNITY_CHAT, this.resetChat)
  };

  /**
   * Reset the chat back to only the chat passed in.
   * @param chat {Chat}
   */
  resetChat = (chat) => {
    return this.addChat(chat, true);
  };

  /**
   * Adds chat to the chat container, if reset is true removes all chats
   * and sets that chat to the main chat.
   * Sets the message and typing socket events for the chat.
   * @param chat {chat} the chat to be added.
   * @param reset {boolean} if true will set the chat as the only chat
   */
  addChat = (chat, reset) => {
    const {socket} = this.props;
    const {chats} = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({chats: newChats});

    const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}}`;
    const typingEvent = `${TYPING}-${chat.id}}`;

    socket.on(typingEvent);
    socket.on(messageEvent, this.addMessageToChat(chat.id));
  };

  /**
   * Returns a function that will add messages
   * to chat with the chatId passed in.
   */
  addMessageToChat = (chatId) => {
    return message => {
      const {chats} = this.state;

      let newChats = chats.map((chat) => {
        if (chat.id === chatId) {
          chat.message.push(message);
        }
        return chat;
      });
      this.setState({chats: newChats})
    }
  }

  /**
   * Updates the typing of chat with id passed in.
   * @param chatID {number}
   */
  updateTypingInChat = (chatId) => {

  }

  /**
   * Set the active chat to our state.
   * */
  setActiveChat = (activeChat) => {
    this.setState({activeChat: activeChat});
  };

  /**
   * Adds a message to the specified chat.
   * @param chatId {number} The id of the chat to be added to.
   * @param message {string} The message to be added to the chat
   */
  sendMessage = (chatId, message) => {
    const {socket} = this.props;
    socket.emit(MESSAGE_SENT, {chatId, message});    
  }

  /**
   * Sends typing status to server.
   * chatId {number} the id of the chat being typed in.
   * typing (boolean) If the is still typing or not.
   */
  sendTyping = (chatID, doneTyping) => {
    const {socket} = this.props;
    socket.emit(TYPING, {chatId, doneTyping});
  }

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

        <div className="chat-room">
          {
            activeChat !== null ? (
              <div className="chat-roomContainer">
                <ChatHeading name={activeChat.name}/>
                <Messages 
                  typingUser={activeChat.typingUsers}
                  user={user}
                  messages={activeChat.messages}/>
                <MessageInput 
                  sendTyping={(doneTyping) => {this.sendTyping(activeChat.id, doneTyping)}}
                  sendMessage={(message) => {this.sendMessage(activeChat.id, message)}}/>  
              </div>
            ) 
            : <h3 className="chat-room__heading">Choose a chat from above!</h3>
          }
        </div>
      </div>
    );
  }
}

export default ChatContainer;

