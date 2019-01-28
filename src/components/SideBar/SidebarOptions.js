import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SidebarOptions extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    lastMessage: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    lastMessage: "",
    active: false,
    onClick: () => {}
  }

  render() {
    const { name, lastMessage, active, onClick } = this.props;

    return (
      <div>
        <div className={`sidebar__users--user ${active ? 'active' : ''}`}
          onClick={onClick}>

          <div className="sidebar__users--userPhoto">
            {name[0].toUpperCase()}
          </div>

          <div className="sidebar__users--userInfo">
            <div className="name">{name}</div>
            {lastMessage && <div className="last-message">
              {lastMessage}
            </div>}
          </div>
        </div>
      </div>
    )
  }
}
