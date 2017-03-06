import React, {Component} from 'react';
import Input from '../sign/input';
import {Button, Well} from 'react-bootstrap';
import axios from 'axios';

"use strict";
const ROOT_URL = "http://localhost:3000";
class AddRecipe extends Component{

  constructor(props){
    super(props);
    this.state = {
      hola: ''
    }
  }

  postRecipe(){
    axios.post(ROOT_URL + "/recipes/addRecipe", {
      nickName: this.props.username,
      password: this.props.password,
      folder: 'Favoritos',
      recipe: {
        tipo: '',
        likes: 0,
        creadaPor: this.props.username,
        title: '',
        description: '',
        pictureGif: '',
        Ingredients:[
          {
            ingrediente: '',
            ingrediente: ''
          }
        ]
      }
    })
  }

  render(){
    return (
      <div>
        <div><Well></Well></div>
        <div><Well></Well></div>
        <h2>Add a recipe</h2>
        <p>Fill in the form in order to add your recipe</p>
        <form>

        </form>
      </div>
    );
  }
}

export default AddRecipe;
