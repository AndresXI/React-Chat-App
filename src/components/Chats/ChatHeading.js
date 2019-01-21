import React from 'react'

export default function ChatHeading({name, numberOfUsers}) {

  return (
    <div className="chat-header">
      <div className="chat-header__user">
        <div className="chat-header__user chat-header__user-name">
          {name}
        </div>
        <div className="chat-header__status">
          <div className="chat-header__status chat-header__status-indicator"></div>
          <span>{numberOfUsers ? numberOfUsers : null}</span>
        </div>
      </div>
    </div>
  )
}

