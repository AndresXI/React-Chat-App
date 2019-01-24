import React from 'react'

export default function ChatHeading({name, numberOfUsers}) {

  return (
    <div className="chatRoom__container--chatHeader">
     
        <div className="title">
          {name}
        </div>

        <div className="chat-header__status">
          <div className="chat-header__status chat-header__status-indicator"></div>
          <span>{numberOfUsers ? numberOfUsers : null}</span>
        </div>
      
    </div>
  )
}

