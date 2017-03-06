import React, {Component} from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
"use strict";

class Navigbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: ''
        }

        this.selectMyRecipes = this.selectMyRecipes.bind(this);
        this.selectAddRecipes = this.selectAddRecipes.bind(this);
        this.selectSearch = this.selectSearch.bind(this);
    }

    selectMyRecipes() {
        this.setState({selected: 'my'},
        () => {
            this.props.selected(this.state.selected);
        });
    }

    selectAddRecipes() {
        this.setState({selected: 'add'},
        () => {
            this.props.selected(this.state.selected);
        });
    }

    selectSearch() {
        this.setState({selected: 'srch'},
        () => {
            this.props.selected(this.state.selected);
        });
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect className="navbar-fixed-top">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Cooky</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Button onClick={this.selectAddRecipes.bind(this)}>Add recipe</Button>
                    <Button onClick={this.selectSearch.bind(this)}>Search recipes</Button>
                    <Button onClick={this.selectMyRecipes.bind(this)}>My recipes</Button>
                </Navbar>
            </div>
        );
    }
}

export default Navigbar;
