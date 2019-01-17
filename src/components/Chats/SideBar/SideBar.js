import React, {Component} from 'react';
import {FaBars, FaSearch, FaChevronDown} from 'react-icons/fa';
import {MdEject} from 'react-icons/md'

class SideBar extends Component {

  render() {
    const {chats, activeChat, user, setActiveChat, logout} = this.props;

    return (
      <div className="chat-container__sideBar">
        <div className="chat-container__sideBar-heading">
          <div className="chat-container__sideBar-title">React Chat App<FaChevronDown/></div>
          <div className="menu">
            <FaBars/>
          </div>
        </div>

        <div className="search">
          <i className="search-icon"><FaSearch/></i>
          <input type="text" placeholder="Search..."/>
          <div className="plus"></div>
        </div>

        <div
          ref="users"
          // onClick={(e) => {(e.target === this.ref.user) && setActiveChat(null)}}
          className="users">

          {/*{*/}
            {/*chats.map((chat) => {*/}
              {/*if (chat.name) {*/}
                {/*const lastMessage = chat.messages[chat.message.length - 1];*/}
                {/*const user = chat.users.find(({name}) => {*/}
                  {/*return name !== this.props.name*/}
                {/*}) || { name: "Community" }*/}
                {/*const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''*/}

                {/*return (*/}
                  {/*<div*/}
                    {/*className={`user ${classNames}`}*/}
                    {/*onClick={() => setActiveChat(chat)}*/}
                    {/*key={chat.id}>*/}

                    {/*<div className="user-photo">{user.name[0].toUpperCase()}</div>*/}
                    {/*<div className="user-info">*/}
                      {/*<div className="name">{user.name}</div>*/}
                      {/*{lastMessage && <div className="last-message">{lastMessage.message}</div>}*/}
                    {/*</div>*/}

                  {/*</div>*/}
                {/*)*/}
              {/*}*/}
              {/*return null;*/}
            {/*})*/}
          {/*}*/}
        </div>

        <div className="current-user">
          {/*<span>{user.name}</span>*/}
          <div className="logout" onClick={() => logout()} title="Logout">
            <MdEject/>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;