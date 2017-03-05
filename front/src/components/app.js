import React, {Component} from 'react';
import axios from 'axios';
import SignUpModal from './signUp/signUpModal';

"use strict";

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      loggedIn:false
    }
  }

  loggedIn(x){
    console.log("el evento es "+x);
    if (x==='BUTTON' || x==='SPAN')
    {
      this.setState({loggedIn: true});
    }
  }

  render() {
    const isLoggedIn = this.state.loggedIn;
    let element = null;
    if (!isLoggedIn){
      element =   <SignUpModal className="signupmodal" onLog={this.loggedIn.bind(this)}/>;
    }else{
      element = ' ';
    }
    return(
      <div className="row">
        {element}
      </div>
    )
  }
}

export default App;
