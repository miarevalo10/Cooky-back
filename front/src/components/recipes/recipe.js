import React, {Component} from 'react';
import axios from 'axios';
import {Table, Button, Well} from 'react-bootstrap';
import Ingredient from './ingredient';

const ROOT_URL = "http://localhost:3000";

class Recipe extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    deleteRecipe(){
      console.log("nickName: "+this.props.cook);
        axios.post(ROOT_URL+"/recipes/deleteRecipe",{
          nickName: this.props.cook,
          password: this.props.password,
          title: this.props.title
        }
      ).then(response =>
      console.log("BORROOOO"+response)
    )
    }

    render() {
        return (
            <div>
                <Well>
                    <Table condensed hover>
                        <tbody>
                            <tr>
                                <td>Cook</td>
                                <td>{this.props.recipe.creadaPor}</td>
                            </tr>
                            <tr>
                                <td>Title</td>
                                <td>{this.props.recipe.title}</td>
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
                                <td>{this.props.recipe.description}</td>
                            </tr>
                            <tr>
                                <td>Likes</td>
                                <td>{this.props.recipe.likes}</td>
                            </tr>
                            <tr>
                              <td colSpan="2"><Button onClick={this.deleteRecipe.bind(this)}  bsStyle="danger">Delete</Button></td>
                            </tr>
                        </tbody>
                    </Table>

                </Well>
            </div>
        );
    }
}

export default Recipe;
