import React, { Component } from 'react'
import './Tools.css'
import { Image, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { BlockPicker } from 'react-color'

class Tools extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visble: false
    }
  }
  
  showTools = () => {
    this.setState({
      visble: true
    });
  }

  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Paint</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Undo</NavItem>
          <NavItem eventKey={2} href="#">Redo</NavItem>
          <NavDropdown eventKey={3} title="Color" id="basic-nav-dropdown">
            <BlockPicker />
          </NavDropdown>
          <NavDropdown eventKey={4} title="Line" id="basic-nav-dropdown">
            <MenuItem eventKey={4.1}>Action</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}

export default Tools
