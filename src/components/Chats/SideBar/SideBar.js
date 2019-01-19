import React, {Component} from 'react';
import {FaBars, FaSearch, FaChevronDown} from 'react-icons/fa';
import {MdEject} from 'react-icons/md'

class SideBar extends Component {

  render() {
    const {chats, activeChat, user, setActiveChat, logout} = this.props;

    return <div className="chat-container__sidebar">
        <div className="chat-container__sidebar chat-container__sidebar-heading">
          <div className="chat-container__sidebar chat-container__sidebar-heading-title">
            React Chat App
          </div>
          <div className="chat-container__sidebar chat-container__sidebar-heading-icon">
            <FaChevronDown />
          </div>
          <div className="chat-container__sidebar chat-container__sidebar-heading-menu">
            <FaBars />
          </div>
        </div>

        <div className="chat-container__sidebar chat-container__sidebar-searchContainer">
          <input type="text" placeholder="Search..." />
          <i>
            <FaSearch />
          </i>
        </div>

        <div ref="users" onClick={e => {
            e.target === this.ref.user && setActiveChat(null);
          }} className="chat-container__sidebar chat-container__sidebar-users">
          {chats.map(chat => {
            if (chat.name) {
              const lastMessage = chat.messages[chat.message.length - 1];
              const user = chat.users.find(({ name }) => {
                return name !== this.props.name;
              }) || { name: "Community" };
              const classNames = activeChat && activeChat.id === chat.id ? "active" : "";

              return <div className={`user ${classNames}`} onClick={() => setActiveChat(chat)} key={chat.id}>
                  <div className="user-photo">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div className="user-info">
                    <div className="name">{user.name}</div>
                    {lastMessage && <div className="last-message">
                        {lastMessage.message}
                      </div>}
                  </div>
                </div>;
            }
            return null;
          })}
        </div>

        <div className="chat-container__sidebar chat-container__sidebar-current-user">
          <span className="username">{user.name}</span>
          <div className="logout-btn" onClick={() => logout()} title="Logout">
            <MdEject />
          </div>
        </div>
      </div>
  }
}

export default SideBar;