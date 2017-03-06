import React, {Component} from 'react';
import axios from 'axios';
import {Table, Button, Well} from 'react-bootstrap';

const ROOT_URL = "http://localhost:3000";

class Ingredient extends Component {

  render(){
    return(
      <div>
        {this.props.name}
      </div>
    );
  }

}

export default Ingredient;
