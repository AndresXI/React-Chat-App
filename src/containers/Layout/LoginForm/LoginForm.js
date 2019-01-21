import React, {Component} from 'react';
import { VERIFY_USER } from '../../../Events';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      error: ""
    }
  }

  /**
   * Set the user
   * */
  setUser = ({user, isUser}) => {
    console.log(isUser);
    if (isUser) {
      this.setError("User name taken");
    } else {
      this.props.setUser(user);
      this.setError("");
    }
  };

  /**
   * Handles the submit form
   *  */
  handleSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    const { nickname } = this.state;

    // emmit to the server
    socket.emit(VERIFY_USER, nickname, this.setUser);
  };
  
  /**
   * Handles the change when the form is changed
   * */
  handleChange = (e) => {
    this.setState({ nickname: e.target.value });
  }; 

  /**
   * Set the error message.
   * */
  setError = (errorMessage) => {
    this.setState({error: errorMessage});
  };

  render() {
    const { nickname, error } = this.state;

    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">

          <label htmlFor="nickname">
            <h2>Enter your name</h2>
          </label>

          <input
            onChange={this.handleChange}
            id="nickname"
            value={nickname}
            placeholder={'Enter your name here...'}
            ref={(input)=>{this.textInput = input}} />

          <div className="error">{error ? error: null}</div>
        </form>
      </div>
    );
  }
}

export default LoginForm;