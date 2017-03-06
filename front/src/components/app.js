import React, {Component} from 'react';
import axios from 'axios';
import Sign from './sign/sign';
import Navigbar from './main/navbar';
import Recipes from './recipes/recipes';
import AddRecipe from './recipes/addRecipe'
import {Button, Well} from 'react-bootstrap';
"use strict";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            status: 'log',
            username: '',
            password: ''
        }
    }

    loggedIn(x) {
        console.log("el evento es " + x);
        if (x === 'BUTTON' || x === 'SPAN') {
            this.setState({status: 'my'});
        }
    }

    changeStat(x){
      this.setState({
        status: x
      }),() => {
        console.log(x);
      }
    }

    username(x) {
        this.setState({
            username: x
        }, () => {});
    }

    password(x) {
        this.setState({
            password: x
        }, () => {});
    }

    render() {
        var status = this.state.status;
        let element = null;
        let element2 = null;
        if (status === "log") {
            element = <Sign className="signupmodal" username={this.username.bind(this)} password={this.password.bind(this)} onLog={this.loggedIn.bind(this)}/>;
            element2 = ' ';
        } else {
            element = <Navigbar className="navbar" selected={this.changeStat.bind(this)}/>;
            if (status === "my") {
                element2 = <Recipes username={this.state.username} password={this.state.password}/>;
            }
            if (status==="srch"){
              element2 = (<div><div className="row"><Well></Well></div>
              <div className="row"><Well></Well></div><label>BUSCAAAR</label></div>);
            }
            if (status==="add"){
              element2 = (<AddRecipe username={this.state.username} password={this.state.password}/>);
            }
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
