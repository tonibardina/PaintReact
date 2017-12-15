import React, { Component } from 'react'
import '../style/Tools.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { BlockPicker } from 'react-color'
import Line1 from '../art/1pxLine.png'
import Line3 from '../art/3pxLine.png'
import Line5 from '../art/5pxLine.png'
import Line10 from '../art/10pxLine.png'
import {Colors1, Colors2} from './ColorsPalettes'


class Tools extends Component {
  handleChangeColorPicker = (color) => {
    this.props.setLineColor(color.hex)
  }

  handleClickColorPalette = (e) => {
    if (e.target.name === 'Colors1') {
      this.props.setColorPalette(Colors1())
    } else {
      this.props.setColorPalette(Colors2())
    }
  }

  setLineWidth = (e) => {
    this.props.setLineWidth(e.currentTarget.name)
  }

  undo = () => {
    this.props.undo()
  }

  redo = () => {
    this.props.redo()
  }

  clearWorkspace = () => {
    this.props.clearWorkspace()
  }

  render () {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a id='title' style={{color: this.props.color}}>Paint</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem 
              onClick={this.undo} 
              eventKey={1} 
              name='undo'
              id='undo'
            >
              <i className="fa fa-undo" aria-hidden="true"></i>
            </NavItem>
            <NavItem 
              onClick={this.redo} 
              eventKey={2} 
              name='redo'
            >
                <i className="fa fa-repeat" aria-hidden="true"></i>
            </NavItem>
            <NavDropdown eventKey={3} title="Palette" id="color-dropdown">
              <MenuItem onClick={this.handleClickColorPalette} name='Colors1'>
                Color variety
              </MenuItem>
              <MenuItem onClick={this.handleClickColorPalette} name='Colors2'>
                Colorhunt selection
              </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={4} title="Color" id="color-dropdown">
              <BlockPicker 
                color={this.props.color} 
                colors={this.props.palette} 
                onChangeComplete={ this.handleChangeColorPicker }
              />
            </NavDropdown>
            <NavDropdown 
              eventKey={5} 
              title="Line" 
              id="basic-nav-dropdown">
              <MenuItem>
                <img 
                  name={1} 
                  id={'line1'} 
                  style={{padding: 10}} 
                  src={Line1} alt='1px Line' 
                  onClick={this.setLineWidth} />
              </MenuItem>
              <MenuItem>
                <img 
                  name={3} 
                  id={'line3'} 
                  style={{padding: 10}} 
                  src={Line3} alt='3px Line' 
                  onClick={this.setLineWidth} />
              </MenuItem>
              <MenuItem>
                <img 
                  name={5} 
                  id={'line5'} 
                  style={{padding: 10}} 
                  src={Line5} alt='5px Line' 
                  onClick={this.setLineWidth} />
              </MenuItem>
              <MenuItem>
                <img 
                  name={10} 
                  id={'line10'} 
                  style={{padding: 10}} 
                  src={Line10} alt='10px Line' 
                  onClick={this.setLineWidth} />
              </MenuItem>
            </NavDropdown>
            <NavItem 
              onClick={this.clearWorkspace} 
              eventKey={6} 
              className='clearButton'
            >
              Clear
            </NavItem>
            <NavItem href={this.props.downloadFile} download='myAwesomePaint'>
              <i className="fa fa-download" aria-hidden="true"></i>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default Tools
