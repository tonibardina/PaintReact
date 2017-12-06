import React, { Component } from 'react'
import './Tools.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { GithubPicker } from 'react-color'

class Tools extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  handleChangeColorPicker = (color) => {
    this.props.changeColor(color.hex)
  }

  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a style={{color: this.props.color}}>Paint</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Undo</NavItem>
          <NavItem eventKey={2} href="#">Redo</NavItem>
          <NavDropdown eventKey={3} title="Color" id="basic-nav-dropdown">
            <GithubPicker onChangeComplete={ this.handleChangeColorPicker }/>
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
