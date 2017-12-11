import React, { Component } from 'react'
import './Tools.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { BlockPicker } from 'react-color'
import Line1 from './art/1pxLine.png'
import Line3 from './art/3pxLine.png'
import Line5 from './art/5pxLine.png'
import Line10 from './art/10pxLine.png'

class Tools extends Component {
  handleChangeColorPicker = (color) => {
    this.props.changeColor(color.hex)
  }

  setLineWidth = (e) => {
    this.props.changeLineWidth(e.currentTarget.name)
  }

  undoRedo = (e) => {
   /* send Undo or Redo to father*/
    const canvas = document.querySelector('#canvas')
    const context = canvas.getContext('2d')
    if (e.currentTarget.name === 'undo') {
      this.props.undoRedo(canvas, context, 'undo')
    } else {
      this.props.undoRedo(canvas, context, 'redo')
    }
  }

  clearWorkspace = () => {
    this.props.clearWorkspace()
  }

  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a id='title' style={{color: this.props.color}}>Paint</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem 
            onClick={this.undoRedo} 
            eventKey={1} 
            name='undo'
          >
            <i className="fa fa-undo" aria-hidden="true"></i>
          </NavItem>
          <NavItem 
            onClick={this.undoRedo} 
            eventKey={2} 
            name='redo'
          >
              <i className="fa fa-repeat" aria-hidden="true"></i>
          </NavItem>
          <NavDropdown eventKey={3} title="Color" id="basic-nav-dropdown">
            <BlockPicker color={this.props.color} colors={
              [
                '#E8DAB2', 
                '#4F6D7A', 
                '#C0D6DF', 
                '#EAEAEA', 
                '#D44D5C', 
                '#083452', 
                '#FF6B37', 
                '#ECA400', 
                '#EAF8BF',  
                '#006992',
                '#95FF9F',
                '#136F63',
                '#22AAA1',
                '#4CE0D2',
                '#84CAE7',
                '#CB2631',
                '#641318',
                '#A31E27',
                '#B76D72',
                'red'
              ]
            } onChangeComplete={ this.handleChangeColorPicker }/>
          </NavDropdown>
          <NavDropdown eventKey={4} title="Line" id="basic-nav-dropdown">
            <MenuItem>
              <img name={1} style={{padding: 10}} src={Line1} alt='1px Line' onClick={this.setLineWidth} />
            </MenuItem>
            <MenuItem>
              <img name={3} style={{padding: 10}} src={Line3} alt='3px Line' onClick={this.setLineWidth} />
            </MenuItem>
            <MenuItem>
              <img name={5} style={{padding: 10}} src={Line5} alt='5px Line' onClick={this.setLineWidth} />
            </MenuItem>
            <MenuItem>
              <img name={10} style={{padding: 10}} src={Line10} alt='10px Line' onClick={this.setLineWidth} />
            </MenuItem>
          </NavDropdown>
          <NavItem 
            onClick={this.clearWorkspace} 
            eventKey={4} 
            className='clearButton'
          >
            Clear
          </NavItem>
          <NavItem href={this.props.canvas} download='myAwesomePaint'>
            <i className="fa fa-download" aria-hidden="true"></i>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Tools
