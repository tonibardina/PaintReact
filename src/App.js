import React, { Component } from 'react'
import Canvas from './Canvas'
import Tools from './Tools'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: 'red',
      lineWidth: 10,
      undo: [],
      redo: [],
      canvasWidth: 'Number',
      canvasHeight: 'Number',
    }
  }

  changeColor = (color) => {
    this.setState({
      color: color
    })
  }

  changeLineWidth = (value) => {
    this.setState({
      lineWidth: value
    })
  }

  setWidthAndHeight = (valueX, valueY) => {
    this.setState({
      canvasHeight: valueY,
      canvasWidth: valueX
    })
  }

  saveDrawings = (canvas) => {
    this.setState({
      undo: [...this.state.undo, canvas.toDataURL()]
    })
  }

  undoDrawing = () => {
    const width = this.state.canvasWidth
    const height = this.state.canvasHeight
    let draw = this.state.undo[this.state.undo.length - 2]
    let context = document.querySelector('#canvas').getContext('2d')
    let image = new Image()
    if (this.state.undo.length > 1) {
      this.state.undo.pop()
      image.src = draw
      image.onload = function(){
        console.log(width )
        context.clearRect(0, 0, width, height)
        context.drawImage(image, 0, 0, width, height, 0, 0, width, height)
      }
    } else {
      this.setState({
        undo: []
      })
      context.clearRect(0, 0, width, height)
    }
  }

  render () {
    return (
      <div className='container-fluid'>
        <Tools 
          undoDrawing={this.undoDrawing} 
          color={this.state.color} 
          changeColor={this.changeColor} 
          changeLineWidth={this.changeLineWidth} 
        />
        <Canvas 
          saveDrawings={this.saveDrawings} 
          lineWidth={this.state.lineWidth} 
          color={this.state.color}
          setWidthAndHeight={this.setWidthAndHeight}
        />
      </div>
    )
  }
}

export default App
