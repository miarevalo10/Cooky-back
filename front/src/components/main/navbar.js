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
                <Navbar.Collapse>
                    <Button>Add recipe</Button>
                    <Button>Search recipes</Button>
                    <Button>My recipes</Button>
                </Navbar.Collapse>
            </Navbar>
          </div>
        );
    }
}

export default Navigbar;
