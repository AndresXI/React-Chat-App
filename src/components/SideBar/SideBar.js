import React, {Component} from 'react';
import {FaBars, FaSearch, FaChevronDown} from 'react-icons/fa';
import {MdEject} from 'react-icons/md'

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      receiver: ""
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { receiver } = this.state;
    const { onSendPrivateMessage } = this.props;

    onSendPrivateMessage(receiver);

  }

  render() {
    const {chats, activeChat, user, setActiveChat, logout} = this.props;
    const { receiver } = this.state;

    return ( 
      <div className="sidebar">

        <div className="sidebar__heading">
          <div className="sidebar__heading-title">
            React Chat App
            <FaChevronDown />
          </div>
          <div className="sidebar__heading-menuIcon">
            <FaBars />
          </div>
        </div>

        <form className="sidebar__searchContainer"
          onSubmit={this.handleSubmit}>
          <i className="sidebar__searchContainer--searchIcon"><FaSearch /></i>
          <input type="text" 
            value={receiver}
            onChange={(e) => { this.setState({ receiver: e.target.value })}}
            placeholder="Search..." />
        </form>

        <div ref="users" 
            onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null)}} 
            className="sidebar__users">

          {
            chats.map(chat => {
              if (chat.name) {
                const lastMessage = chat.messages[chat.messages.length - 1];
                const chatSideName = chat.users.find((name) => {
                  return name !== user.name;
                }) || "Community";
                const classNames = activeChat && activeChat.id === chat.id ? "active" : "";

                return ( 
                      <div className={`sidebar__users--user ${classNames}`} 
                          onClick={() => setActiveChat(chat)} 
                          key={chat.id}>

                        <div className="sidebar__users--userPhoto">
                          {chatSideName[0].toUpperCase()}
                        </div>

                        <div className="sidebar__users--userInfo">
                          <div className="name">{chatSideName}</div>
                          {lastMessage && <div className="last-message">
                            {lastMessage.message}
                          </div>}
                        </div>
                      </div>
                      );
            }
            return null;
          })}
        </div>

        <div className="sidebar__currentUser">
          <span className="sidebar__currentUser--username">{user.name}</span>
          <div className="sidebar__currentUser--logoutBtn" onClick={() => logout()} title="Logout">
            <MdEject />
          </div>
        </div>
      </div> 
  )
  }
}

export default SideBar;