import React, { Component } from 'react'
import Canvas from './Canvas'
import Tools from './Tools'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: 'red',
      lineWidth: 10,
      undo_list: [],
      redo_list: [],
      canvas: '',
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

  setCanvasWidthAndHeight = (valueX, valueY) => {
    this.setState({
      canvasHeight: valueY,
      canvasWidth: valueX
    })
  }

  saveState = (canvas, list, keep_redo) => {
    keep_redo = keep_redo || false
    if(!keep_redo) {
      this.setState({
        redo_list: [],
      })
    }
    (list || this.state.undo_list).push(canvas.toDataURL())
    console.log(this.state)
  }

  restoreState = (canvas, context, pop, push) => {
    const width = this.state.canvasWidth
    const height = this.state.canvasHeight

    if(pop.length) {
      this.saveState(canvas, push, true)
      let restore_state = pop.pop()
      let image = new Image()
      image.src = restore_state
      image.onload = function () {
        console.log([restore_state])
        context.clearRect(0, 0, width, height)
        context.drawImage(image, 0, 0, width, height, 0, 0, width, height)
      }
    }
  }

  undoRedo = (canvas, context, value) => {
    if (value === 'undo') {
      this.restoreState(canvas, context, this.state.undo_list, this.state.redo_list)
    } else {
      this.restoreState(canvas, context, this.state.redo_list, this.state.undo_list)
    }
  }

  clearWorkspace = () => {
    const width = this.state.canvasWidth
    const height = this.state.canvasHeight
    const context = document.querySelector('#canvas').getContext('2d')
    this.setState({
      undo_list: [],
      redo_list: []
    })
    context.clearRect(0, 0, width, height)
  }

  defineCanvasToDownload = (canvas) => {
    this.setState({
      canvas: canvas.toDataURL()
    })
  }

  render () {
    return (
      <div className='container-fluid'>
        <Tools
          undoRedo={this.undoRedo}
          color={this.state.color} 
          changeColor={this.changeColor} 
          changeLineWidth={this.changeLineWidth}
          clearWorkspace={this.clearWorkspace}
          canvas={this.state.canvas}
        />
        <Canvas 
          saveState={this.saveState} 
          lineWidth={this.state.lineWidth} 
          color={this.state.color}
          setCanvasWidthAndHeight={this.setCanvasWidthAndHeight}
          defineCanvasToDownload={this.defineCanvasToDownload}
        />
      </div>
    )
  }
}

export default App
