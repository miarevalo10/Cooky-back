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
      title: '',
      type:-1,
      description:'',
      ingredients: [],
      pictureGif:' '
    }
  }

  postRecipe(){
    axios.post(ROOT_URL + "/recipes/addRecipe", {
      nickName: this.props.username,
      password: this.props.password,
      folder: 'Favoritos',
      recipe: {
                tipo: this.props.type,
                likes: 0,
                creadaPor: this.props.username,
                title: this.props.title,
                description: this.props.description,
                pictureGif: this.props.pictureGif,
                Ingredients:this.state.ingredients
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
          <Well>
              <Table condensed hover>
                  <tbody>
                      <tr>
                          <td>Cook</td>
                          <td>{this.props.username}</td>
                      </tr>
                      <tr>
                          <td>Title</td>
                          <td><Input name="titulo" type="text"  handleInputChange={this.escribeTitle}
                          placeholder="Agua panela de la abuela" value={this.state.titulo}/></td>
                      </tr>
                      <tr>
                          <td>Ingredients</td>
                          <td>{this.props.ingredients.map(ingredient =>{
                            return(
                              <ul key={ingredient.ingrediente}>
                                  <Ingredient name={ingredient.ingrediente}/>
                              </ul>
                            );
                          })}</td>
                      </tr>
                      <tr>
                          <td>Instructions</td>
                          <td><Input name="instructions" type="text"  handleInputChange={this.escribeInstructions}
                          placeholder="Se parten 3 limones por la mitad..." value={this.state.titulo}/></td>
                      </tr>
                      <tr>
                          <td>Likes</td>
                          <td>0</td>
                      </tr>
                      <tr>
                        <td colSpan="2"><Button onClick={() => {this.deleteRecipe(this.props.title)}}  bsStyle="danger">Delete</Button></td>
                      </tr>
                  </tbody>
              </Table>

          </Well>

        </form>
      </div>
    );
  }
}

export default AddRecipe;
