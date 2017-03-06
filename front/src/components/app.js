import React, {Component} from 'react';
import axios from 'axios';
import Sign from './sign/sign';
import Navigbar from './main/navbar';
import Recipes from './recipes/recipes';
import {Button, Well} from 'react-bootstrap';
"use strict";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: '',
            password: ''
        }
    }

    loggedIn(x) {
        console.log("el evento es " + x);
        if (x === 'BUTTON' || x === 'SPAN') {
            this.setState({loggedIn: true});
        }
    }

    username(x) {

        this.setState({username: x},()=>{
          console.log("user is " + x);
        });
    }

    password(x) {

        this.setState({password: x},()=>{
          console.log("password is " + x);
        });
    }

    render() {
        const isLoggedIn = this.state.loggedIn;
        let element = null;
        let element2 = null;
        if (!isLoggedIn) {
            element = <Sign className="signupmodal" username={this.username.bind(this)} password={this.password.bind(this)} onLog={this.loggedIn.bind(this)}/>;
            element2 = ' ';
        } else {
            element = <Navigbar className="navbar"/>;
            element2 = <Recipes username={this.state.username} password={this.state.password}/>;

        }
        return (
          <div>
            <div className="row">
              {element}
            </div>
            <div>
              {element2}
            </div>
          </div>
        )
    }
}

export default App;
