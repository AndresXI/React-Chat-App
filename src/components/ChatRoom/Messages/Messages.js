import React, { Component } from 'react'

export default class Messages extends Component {

  render() {
    const {messages, user, typingUsers} = this.props;

    return (
      <div ref="container"
          className="chatRoom__container--messages">

        <div className="messageThread">
         
          {
            
            messages.map((messageObj) => {
              return (
                <div key={messageObj.id}
                  className={`message-container ${messageObj.sender === user.name && 'right'}`}>

                  <div className="time">{messageObj.time}</div>

                  <div className="data">
                    <div className="message">{messageObj.message}</div>
                    <div className="name">{messageObj.sender}</div>
                  </div>
                </div>
              );
            })
          }
          {
            typingUsers.map((name) => {
              return (
                <div className="typing-user"
                  key={name}>
                  {`${name} is typing...`}
                </div>
              )
            })
          } 
        </div>
             
      </div>
    )
  }
}
