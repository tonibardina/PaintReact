import React, { Component } from 'react'
import './Canvas.css'

class Canvas extends Component {
  componentDidMount () {
    /* Define Workspace */
    const canvas = document.querySelector('#canvas')
    const context = canvas.getContext('2d')
    const sketch = this.refs.sketch
    let sketchStyle = getComputedStyle(sketch)
    canvas.width = parseInt(sketchStyle.getPropertyValue('width'), 10)
    canvas.height = parseInt(sketchStyle.getPropertyValue('height'), 10)
    /* Send Workspace info to father */
    this.props.setCanvasWidthAndHeight(canvas.width, canvas.height)
    let mouse = {x: 0, y: 0}
    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function (e) {
      mouse.x = e.pageX - this.offsetLeft
      mouse.y = e.pageY - this.offsetTop
    }, false)
    /* Drawing on canvas */
    canvas.addEventListener('mousedown', function (e) {
      context.beginPath()
      context.moveTo(mouse.x, mouse.y)
      canvas.addEventListener('mousemove', onPaint, false)
    }, false)
    canvas.addEventListener('mouseup', function () {
      canvas.removeEventListener('mousemove', onPaint, false)
    }, false)
    canvas.addEventListener('mouseover', function () {
      canvas.removeEventListener('mousemove', onPaint, false)
    }, false)
    let onPaint = function () {
      context.lineTo(mouse.x, mouse.y)
      context.stroke()
    }
  }

  setBrush = () => {
    /* Set brush settings */
    let context = document.querySelector('#canvas').getContext('2d')
    context.lineWidth = this.props.lineWidth
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.strokeStyle = this.props.color
    context.imageSmoothingQuality = 'high'
  }

  saveState = () => {
    /* Save canvas state */
    const canvas = document.querySelector('#canvas')
    this.props.saveState(canvas)
  }

  render () {
    return (
      <div 
        className='canvasContainer' 
        style={{height: window.innerHeight, width: '100%'}} 
        ref='sketch'>
        <canvas 
          ref={'canvas'} 
          id='canvas' 
          onMouseOver={this.setBrush} 
          onMouseDown={this.saveState} 
        />
      </div>
    )
  }
}

export default Canvas
