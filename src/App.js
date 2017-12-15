import React, { Component } from 'react'
import Tools from './components/Tools'
import './style/App.css'
import {Colors1, Colors2} from './components/ColorsPalettes'

class App extends Component {
  constructor (props) {
    super(props)
    this.mouse = {
      x: 0, 
      y: 0,
      pressed: false
    }
    this.state = {
      undo_list: [],
      redo_list: [],
      lineColor: 'red',
      lineWidth: 10,
      colorPalette: Colors1(),
    }
  }

  componentDidUpdate () {
    this.context.lineWidth = this.state.lineWidth
    this.context.strokeStyle = this.state.lineColor
    this.context.lineCap = 'round'
    this.context.lineJoin = 'round'
  }

  handleMove = (e) => {
    this.mouse.x = e.pageX - this.canvas.offsetLeft
    this.mouse.y = e.pageY - this.canvas.offsetTop
    if (this.mouse.pressed) {
      this.context.lineTo(this.mouse.x, this.mouse.y)
      this.context.stroke()
    }
  }

  handleMouseDown = () => {
    let file = this.canvas.toDataURL()
    this.mouse.pressed = true
    this.context.beginPath()
    this.context.moveTo(this.mouse.x, this.mouse.y)
    this.saveState(file)
  }

  handleMouseUp = () => {
    this.mouse.pressed = false
  }

  handleMouseOut = () => {
    this.mouse.pressed = false
    this.file = this.canvas.toDataURL()
  }

  setLineColor = (color) => {
    this.setState({
      lineColor: color
    })
  }

  setColorPalette = (palette) => {
    this.setState({
      colorPalette: palette
    })
  }

  setLineWidth = (value) => {
    this.setState({
      lineWidth: value
    })
  }

  undo = () => {
    this.restoreState(this.state.undo_list, this.state.redo_list)
  }

  redo = () => {
    this.restoreState(this.state.redo_list, this.state.undo_list)
  }

  saveState = (file, list, keep_redo) => {
    keep_redo = keep_redo || false
    if(!keep_redo) {
      this.setState({
        redo_list: [],
      })
    }
    (list || this.state.undo_list).push(file)
  }

  restoreState = (pop, push) => {
    let file = this.canvas.toDataURL()
    const width = this.canvas.width 
    const height = this.canvas.height
    const context = this.context
    if(pop.length) {
      this.saveState(file, push, true)
      let restore_state = pop.pop()
      let image = new Image()
      image.src = restore_state
      image.onload = function () {
        context.clearRect(0, 0, width, height)
        context.drawImage(image, 0, 0, width, height, 0, 0, width, height)
      }
    }
  }

  clearWorkspace = () => {
    const width = this.canvas.width
    const height = this.canvas.height
    this.setState({
      undo_list: [],
      redo_list: []
    })
    this.context.clearRect(0, 0, width, height)
  }

  render () {
    return (
      <div style={{padding: 0}} className='container-fluid'>
        <Tools
          undo={this.undo}
          redo={this.redo}
          setLineColor={this.setLineColor} 
          color={this.state.lineColor}
          palette={this.state.colorPalette}
          setLineWidth={this.setLineWidth}
          setColorPalette={this.setColorPalette}
          clearWorkspace={this.clearWorkspace}
          downloadFile={this.file}
        />
        <canvas
          ref={(c) => {
            if (c) {
              this.canvas = c
              this.context = c.getContext('2d')
            }
          }}
          id='canvas'
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseMove={this.handleMove}
          onMouseOver={this.handleMouseOver} 
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseOut={this.handleMouseOut}
        />
      </div>
    )
  }
}

export default App
