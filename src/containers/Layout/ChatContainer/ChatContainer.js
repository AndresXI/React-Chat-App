import React, {Component} from 'react';
import SideBar from '../../../components/SideBar/SideBar';
import { COMMUNITY_CHAT, 
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  TYPING,
  NEW_CHAT_USER,
  USER_DISCONNECTED,
  USER_CONNECTED, 
  PRIVATE_MESSAGE } from '../../../Events';
import ChatHeading from '../../../components/ChatRoom/ChatHeading/ChatHeading';
import Messages from '../../../components/ChatRoom/Messages/Messages';
import MessageInput from '../../../components/ChatRoom/MessageInput/MessageInput';
import { values, difference, differenceBy } from 'lodash';



class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      users: [],
      activeChat: null
    }
  };

  componentDidMount() {
    const {socket} = this.props;
    this.initSocket(socket);
  };

  componentWillUnmount() {
    const { socket } = this.props;
    socket.off(PRIVATE_MESSAGE);
    socket.off(USER_DISCONNECTED);
    socket.off(USER_CONNECTED);
    socket.off(NEW_CHAT_USER);
  }

  /**
   * Initialize socket
   */
  initSocket = (socket) => {
    socket.emit(COMMUNITY_CHAT, this.resetChat);

    socket.on(PRIVATE_MESSAGE, this.addChat);

    socket.on('connect', () => {
      socket.emit(COMMUNITY_CHAT, this.resetChat);
    });

    socket.on(USER_CONNECTED, (users) => {
      this.setState({ users: values(users) });
    });

    socket.on(USER_DISCONNECTED, (users) => {
      const removedUsers = differenceBy(this.state.users, values(users), 'id');
      this.removeUsersFromChat(removedUsers);
      this.setState({ users: values(users) });
    });

    socket.on(NEW_CHAT_USER, this.addUserToChat);
  };

  /**
   * Send private message
   */
  sendOpenPrivateMessage = (receiver) => {
    const { socket, user } = this.props;
    const { activeChat } = this.state;
    socket.emit(PRIVATE_MESSAGE, { receiver, sender: user.name, activeChat });
  }

  addUserToChat = ({ chatId, newUser }) => {
    const { chats } = this.state;
    const newChats = chats.map(chat => {
      if (chat.id === chatId) {
        return Object.assign({}, chat, { users: [...chat.users, newUser]})
      }
      return chat;
    })
    this.setState({ chats: newChats });
  };

  removeUsersFromChat = (removeUsers) => {
    const { chats } = this.state;
    const newChats = chats.map(chat => {
      let newUsers = difference(chat.users, removeUsers.map(
        username => username.name));
        return Object.assign({}, chat, { users: newUsers });
    });
    this.setState({ chats: newChats });
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
  addChat = (chat, reset = false) => {
    const {socket} = this.props;
    const {chats} = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({ chats: newChats, activeChat: reset ? chat : this.state.activeChat });
    
    const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    socket.on(typingEvent, this.updateTypingInChat(chat.id));
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
          chat.messages.push(message);
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
    return ({ isTyping, user }) => {
      if (user !== this.props.user.name) {
        const { chats } = this.state;

        let newChats = chats.map((chat) => {
          if (chat.id === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user);
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = 
                chat.typingUsers.filter(username => username !== user)
            }
          }
          return chat
        });
        this.setState({ chats: newChats })
      }
    }
  }

  /**
   * Set the active chat to our state.
   * */
  setActiveChat = (activeChat) => {
    // console.log(activeChat);
    this.setState({activeChat: activeChat});
  };

  /**
   * Adds a message to the specified chat.
   * @param chatId {number} The id of the chat to be added to.
   * @param message {string} The message to be added to the chat
   */
  sendMessage = (chatId, message) => {
    console.log(message, chatId);
    const {socket} = this.props;
    socket.emit(MESSAGE_SENT, {chatId, message});    
  }

  /**
   * Sends typing status to server.
   * chatId {number} the id of the chat being typed in.
   * typing (boolean) If the is still typing or not.
   */
  sendTyping = (chatId, isTyping) => {
    const {socket} = this.props;
    socket.emit(TYPING, {chatId, isTyping});
  }


  render() {
    const { user, logout} = this.props;
    const {chats, activeChat, users} = this.state;

    return (
      <div className="container">

        <SideBar
          logout={logout}
          chats={chats}
          user={user}
          users={users}
          onSendPrivateMessage={this.sendOpenPrivateMessage}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}/>

        <div className="chatRoom">
          {
            activeChat !== null ? (
              <div className="chatRoom__container">
                <ChatHeading name={activeChat.name}/>

                <Messages 
                  typingUsers={activeChat.typingUsers}
                  user={user}
                  messages={activeChat.messages}/>

                <MessageInput 
                  sendTyping={(isTyping) => {
                    this.sendTyping(activeChat.id, isTyping)
                  }}
                  sendMessage={ (message) => {
                    this.sendMessage(activeChat.id, message)
                    }}/>  
              </div>
            ) 
            : <h3 className="chatRoom__heading">Choose a chat room!</h3>
          }
        </div>
      </div>
    );
  }
}

export default ChatContainer;

