import React, { Component } from 'react'
import Tools from './components/Tools'
import './style/App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.mouse = {
      x: 0, 
      y: 0,
      pressed: false
    }
    this.undo_list = []
    this.redo_list = []
    this.lineColor = 'red'
    this.lineWidth = 10
  }

  handleMove = (e) => {
    this.context.lineWidth = this.lineWidth
    this.context.strokeStyle = this.lineColor
    this.context.lineCap = 'round'
    this.context.lineJoin = 'round'
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

  handleMouseUp = () => this.mouse.pressed = false
  
  handleMouseOut = () => {
    this.mouse.pressed = false
    this.fileToDonwload = this.canvas.toDataURL()
    this.tool.downloadFile(this.fileToDonwload)
  }

  setLineColor = (color) => this.lineColor = color

  setLineWidth = (value) => this.lineWidth = value

  undo = () => this.restoreState(this.undo_list, this.redo_list)

  redo = () => this.restoreState(this.redo_list, this.undo_list)

  saveState = (file, list, keep_redo) => {
    keep_redo = keep_redo || false
    if(!keep_redo) {
      this.redo_list = []
    }
    (list || this.undo_list).push(file)
  }

  restoreState = (pop, push) => {
    let file = this.canvas.toDataURL()
    const { height, width } = this.canvas
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
    const { height, width } = this.canvas
    this.undo_list = []
    this.redo_list = []
    this.context.clearRect(0, 0, width, height)
  }

  setTool = (tool) => this.tool = tool

  render () {
    return (
      <div style={{padding: 0}} className='container-fluid'>
        <Tools
          undo={this.undo}
          redo={this.redo}
          setLineColor={this.setLineColor} 
          color={this.lineColor}
          setLineWidth={this.setLineWidth}
          clearWorkspace={this.clearWorkspace}
          setSelf={this.setTool}
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
