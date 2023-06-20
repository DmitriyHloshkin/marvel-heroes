import { Component } from "react";

import errorImg from '../Error/error.gif';

class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }


  render() {
    if(this.state.error) {
      return <img src={errorImg} alt="error" style={{width: 150, height:150, marginLeft: "10%"}} />
    }
    return this.props.children;
  }
}

export default ErrorBoundary;