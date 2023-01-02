import React, { Component, createContext } from "react";
import { firebase } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
export const { Provider, Consumer } = createContext();

class AppProvider extends Component {
  state = {
    currentUser: AppProvider.defaultProps.currentUser,
    message: AppProvider.defaultProps.message
  };

  componentDidMount() {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        this.setState({
          currentUser: user
        })
      } else {
        this.setState({
          currentUser: null
        })
      }
    });
  }

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          destroySession: () =>
            this.setState({
              currentUser: AppProvider.defaultProps.currentUser
            }),
          setMessage: message => this.setState({ message }),
          clearMessage: () =>
            this.setState({
              message: AppProvider.defaultProps.message
            })
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

AppProvider.defaultProps = {
  currentUser: null,
  message: null
};

export default AppProvider;
