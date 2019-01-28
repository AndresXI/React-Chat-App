import React, {Component} from 'react';
import {FaBars, FaSearch, FaChevronDown} from 'react-icons/fa';
import {MdEject} from 'react-icons/md';
import { SidebarOptions } from './SidebarOptions';
import { get, last, differenceBy } from 'lodash';
import { createChatNameFromUsers } from '../../Factories';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      receiver: "",
      activeSideBar: SideBar.type.CHATS
    }
  };

  static type = {
    CHATS: 'chats',
    USERS: 'users'
  }

  addChatForUser = (username) => {
    this.props.onSendPrivateMessage(username);
  }

  setActiveSideBar = (newSideBar) => {
    this.setState({ activeSideBar: newSideBar });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { receiver } = this.state;
    const { onSendPrivateMessage } = this.props;

    onSendPrivateMessage(receiver);
    this.setState({ receiver: "" })
  }

  render() {
    const {chats, activeChat, user, setActiveChat, logout, users} = this.props;
    const { receiver, activeSideBar } = this.state;

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

        <div className="sidebar__select">
          <div 
            onClick={() => this.setActiveSideBar(SideBar.type.CHATS)}
            className={`sidebar__select--options ${(activeSideBar === SideBar.type.CHATS) ? 'active' : ''}`}>
              <span>Chats</span>
            </div>
          <div 
            onClick={() => this.setActiveSideBar(SideBar.type.USERS)}
            className={`sidebar__select--options ${(activeSideBar === SideBar.type.USERS) ? 'active' : ''}`}>
              <span>Users</span>
            </div>
        </div>

        <div ref="users" 
            onClick={(e) => { (e.target === this.refs.user) && setActiveChat(null)}} 
            className="sidebar__users">
          {
            activeSideBar === SideBar.type.CHATS ?

            chats.map(chat => {
              if (chat.name) {
                return ( 
                  <SidebarOptions 
                    lastMessage={ get(last(chat.messages), 'message', '') }
                    name={chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)}  
                    onClick={() => {this.props.setActiveChat(chat)} }
                    active={activeChat.id === chat.id}
                    key={chat.id}/> );
              }
          })
          
          : differenceBy(users, [user], 'name').map((user) => {
              return <SidebarOptions 
                  onClick={() => {this.addChatForUser(user.name)}}
                  name={user.name}
                  key={user.id}/>
              
            })
          }
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