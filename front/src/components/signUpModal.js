import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import Input from './input';

"use strict";

const ROOT_URL = "http://localhost:3000";
//Modal window for signing up
class SignUpModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            nickName: '',
            password: '',
            picture: '',
            role: ''
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);
    }

    //verifies if username already exists
    checkNickname() {
        console.log("checks nickname");
        console.log(this.state.nickName);
        console.log(this.state.nombre);
        console.log(this.state.password);
        axios.post(ROOT_URL + "/users/existsClient", {
            nickName: this.state.nickName,
            nombre: this.state.nombre,
            password: this.state.password,
            picture: this.state.picture,
            role: this.state.role
        }).then(response => {
          console.log(response);
            if (response.data === false) {
                this.addUser();
            }
        })
    }

    //adds user if nickname does not exist
    addUser() {
        console.log("adds user");
        console.log(this.state.nickName);
        axios.post(ROOT_URL + "/users/createClient", {
            nickName: this.state.nickName,
            nombre: this.state.nombre,
            password: this.state.password,
            picture: this.state.picture,
            role: this.state.role
        }).then(response => {})
    }

    //state setters
    handleNameInput(x) {
        this.setState({nombre: x});
    }
    handlePasswordInput(x) {
        this.setState({password: x});
    }
    handleUsernameInput(x) {
        this.setState({nickName: x});
    }

    render() {
        return (
            <div className="signUpModal">
                <form className="ModalForm">
                    <Input id="name" type="text" placeholder="Elvis Tek" val={this.state.nombre} onTextInput={this.handleNameInput}/>
                    <Input id="username" type="text" placeholder="elvistek10" val={this.state.nickName} onTextInput={this.handleUsernameInput}/>
                    <Input id="password" type="password" placeholder="password" val={this.state.password} onTextInput={this.handlePasswordInput}/>
                    <button onClick={this.checkNickname.bind(this)}>Sign up
                        <i className="fa fa-fw fa-chevron-right"></i>
                    </button>
                </form>
            </div>
        );
    }

}

export default SignUpModal;
