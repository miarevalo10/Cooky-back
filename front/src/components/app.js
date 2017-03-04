import React, {Component} from 'react';
import axios from 'axios';
import VideoPlayer from './video_player';
import SignUpModal from './signUpModal';

"use strict";

class App extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return(
      <div className="row">
        <SignUpModal className="signupmodal" />
      </div>
    )
  }
}

export default App;
