import React, {Component} from 'react';

"use strict";
//Where users may fill in info
class Input extends Component {

    render() {
        return (
            <div className="input">
                <input id={this.props.name} autocomplete="false" required type={this.props.type} placeholder={this.props.placeholder} value={this.props.val}/>
                <label for={this.props.name}></label>
            </div>
        );
    }

}

export default Input;
