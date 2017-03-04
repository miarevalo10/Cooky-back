import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from 'react-fontawesome';
import Input from './input';

"use strict";
//Modal window for signing up
class SignUpModal extends Component {

    contructor(props) {
        super(props);
        this.state = {
            nombre: '',
            nickName: '',
            password: '',
            picture: ''.role: ''
        }
    }

    //verifies if username already exists
    checkNickname() {
        axios.post(ROOT_URL + "/existsClient", {
            nickName: this.state.nickName,
            nombre: this.state.nombre,
            password: this.state.password,
            picture: this.state.picture,
            role: this.state.role
        }).then(response => {
            if (response.data === 'true') {
                this.addUser();
            }
        })
    }

    //adds user if nickname does not exist
    addUser() {
        axios.post(ROOT_URL + "/createClient", {
            nickName: this.state.nickName,
            nombre: this.state.nombre,
            password: this.state.password,
            picture: this.state.picture,
            role: this.state.role
        }).then(response => {})
    }

    render() {
        return (
            <div className="signUpModal">
                <form onSubmit {this.props.onSubmit} className="ModalForm">
                    <Input id="name" type="text" placeholder="Elvis Tek" / val={this.state.nombre} onChange={(event) => {
                        this.setState({nombre: event.target.val})
                    }}/>
                    <Input id="username" type="text" placeholder="elvistek10" / val={this.state.nickName} onChange={(event) => {
                        this.setState({nickName: event.target.val})
                    }}/>
                    <Input id="password" type="password" placeholder="password" val={this.state.password} onChange={(event) => {
                        this.setState({password: event.target.val})
                    }}/>
                    <button onClick={this.checkNickname.bind(this)}>Sign up
                        <i className="fa fa-fw fa-chevron-right"></i>
                    </button>
                </form>
            </div>
        );
    }

}
