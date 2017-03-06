import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import Input from './input';
import {Well, Button} from 'react-bootstrap';

"use strict";

const ROOT_URL = "http://localhost:3000";
//Modal window for signing up
class Sign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            nickName: '',
            password: '',
            picture: '',
            role: '',
            nickNameIn: '',
            passwordIn: '',
            show: false
        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleUsernameInput = this.handleUsernameInput.bind(this);

        this.handlePasswordInputIn = this.handlePasswordInputIn.bind(this);
        this.handleUsernameInputIn = this.handleUsernameInputIn.bind(this);

        this.logIn = this.logIn.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    //logIn
    logIn(e) {
        console.log("entra logIn en signupmodal");
        this.props.onLog(e.target.nodeName);
    }

    //sign in
    signIn(e) {
        axios.post(ROOT_URL + "/users/getClient", {
            nickName: this.state.nickNameIn,
            password: this.state.passwordIn
        }).then(response => {
            console.log(response);
            if (response.data === null) {
                this.setState({show: true});
            } else {
                this.props.onLog('BUTTON');
            }
        })
    }

    //verifies if username already exists
    checkNickname() {
        console.log("checks nickname");
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
                this.props.onLog('BUTTON');
            } else {
                this.setState({show: true});
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

    //state setters for signing up
    handleNameInput(x) {
        this.setState({nombre: x});
    }
    handlePasswordInput(x) {
        this.setState({
            password: x
        }, () => {
            this.props.password(this.state.password);
        });
    }
    handleUsernameInput(x) {
        this.setState({
            nickName: x
        }, () => {
            this.props.username(this.state.nickName);
        });

    }

    //state setters for signing in
    handlePasswordInputIn(x) {
        this.setState({
            passwordIn: x
        }, () => {
            this.props.password(this.state.passwordIn);
        });

    }
    handleUsernameInputIn(x) {
        this.setState({
            nickNameIn: x
        }, () => {
            this.props.username(this.state.nickNameIn);
        });
    }

    //sweetalert error
    handleError() {
        this.setState({show: true});
    }

    render() {

        const wellInstanceSignUp = (
            <div className="signUpModal col-md-6">
                <Well>
                    <form className="ModalForm">
                        <div className="row">
                            <h5>Sign Up</h5>
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
                            <Button bsStyle="primary" onClick={(e) => {
                                this.checkNickname(e);
                            }}>Sign up
                                <i className="fa fa-fw fa-chevron-right"></i>
                            </Button>
                        </div>
                    </form>
                </Well>
            </div>
        );

        const wellInstanceSignIn = (
            <div className="signInModal col-md-6">
                <Well bsSize="large">
                    <form className="ModalForm">
                        <div className="row">
                            <h5>Sign In</h5>
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
                            <Button bsStyle="primary" onClick={(e) => {
                                this.signIn(e);
                            }}>Sign in
                                <i className="fa fa-fw fa-chevron-right"></i>
                            </Button>
                        </div>
                    </form>
                </Well>
            </div>
        );

        const errorOccurred = this.state.show;
        let element = null;
        if (!errorOccurred) {
            element = ' ';
        } else {
            element = <h4>
                That username is already taken</h4>
            console.log(this.state.show);
        }

        return (
            <div className="SignUpAndIn">
                <div>
                    <img className="mainlogo" src="https://68.media.tumblr.com/caa95bb0890f2f65129cd56a50130c64/tumblr_omd0idc0Wd1w7ypfio1_1280.png" alt="hola"/>
                </div>
                <div className="row">
                    <h3>Cooky is a website where you may store or discover new recipes!</h3>
                    <h4>Sign in or sign up if you don't have an account already</h4>
                </div>
                <div className="row">
                    {wellInstanceSignUp}
                    {wellInstanceSignIn}
                </div>
                <div className="row">
                    {element}
                </div>
            </div>
        );
    }

}

export default Sign;
