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
            role: '',
            nickNameIn:'',
            passwordIn:''
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);

        this.handlePasswordInputIn = this.handlePasswordInputIn.bind(this);
        this.handleUsernameInputIn = this.handleUsernameInputIn.bind(this);

        this.logIn = this.logIn.bind(this);
    }

    //logIn
    logIn(e) {
        console.log("entra logIn en signupmodal");
        this.props.onLog(e.target.nodeName);
    }

    //sign in
    signIn(){
      axios.post(ROOT_URL + "/users/getClient", {
        nickName: this.state.nickName,
        nombre: this.state.nombre,
        password: this.state.password,
        picture: this.state.picture,
        role: this.state.role
    }).then(response => {
        console.log("mmmmmmmmmm"+response);
        if (response.data === null) {

        }
      })
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

    //Sign In Methods
    handlePasswordInputIn(x) {
        this.setState({passwordIn: x});
    }
    handleUsernameInputIn(x) {
        this.setState({nickNameIn: x});
    }

    render() {
        return (
            <div className="SignUpAndIn">
                <div className="row">
                    <label>Welcome to Cooky!</label>
                </div>
                <div className="row">
                    <div className="signUpModal col-md-6">
                        <form className="ModalForm">
                            <div className="row">
                                <label>Sign Up</label>
                            </div>
                            <div className="row">
                                <label>Name:</label>
                                <Input name="name" type="text" placeholder="Elvis Tek" val={this.state.nombre} onTextInput={this.handleNameInput}/>
                            </div>
                            <div className="row">
                                <label>Username:</label>
                                <Input name="username" type="text" placeholder="elvistek10" val={this.state.nickName} onTextInput={this.handleUsernameInput}/>
                            </div>
                            <div className="row">
                                <label>Password:</label>
                                <Input name="password" type="password" placeholder="password" val={this.state.password} onTextInput={this.handlePasswordInput}/>
                            </div>
                            <div className="row">
                                <button onClick={(e) => {
                                    this.checkNickname(e);
                                    this.logIn(e);
                                }}>Sign up
                                    <i className="fa fa-fw fa-chevron-right"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="signInModal col-md-6">
                        <form className="ModalForm">
                            <div className="row">
                                <label>Sign In</label>
                            </div>
                            <div className="row">
                                <label>Username:</label>
                                <Input name="username" type="text" placeholder="elvistek10" val={this.state.nickNameIn} onTextInput={this.handleUsernameInputIn}/>
                            </div>
                            <div className="row">
                                <label>Password:</label>
                                <Input name="password" type="password" placeholder="password" val={this.state.passwordIn} onTextInput={this.handlePasswordInputIn}/>
                            </div>
                            <div className="row">
                                <button onClick={(e) => {
                                    this.signIn(e);
                                    this.logIn(e);
                                }}>Sign in
                                    <i className="fa fa-fw fa-chevron-right"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default SignUpModal;
