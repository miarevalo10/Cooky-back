import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome from 'react-fontawesome';
import Input from './logInModal';

class LogInModal extends Component {

  render() {
    return(
        <div className="logInModal">
          <form onSubmit {this.props.onSubmit} className="ModalForm">
            <Input id="name" type="text" placeholder= "Elvis Tek"/>
            <Input id="username" type="text" placeholder="elvistek10"/>
            <Input id="password" type="password" placeholder="Password"/>
          </form>
        </div>
    );
  }
}
