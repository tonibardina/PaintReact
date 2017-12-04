import $ from 'jquery'
import React, { Component } from 'react'

class Canvas extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const canvas = this.refs.canvas
    const context = canvas.getContext('2d')
    const sketch = this.refs.sketch
    let sketch_style = getComputedStyle(sketch)
    canvas.width = parseInt(sketch_style.getPropertyValue('width'), 10)
    canvas.height = parseInt(sketch_style.getPropertyValue('height'), 10)
    let mouse = {x: 0, y: 0}
    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function (e) {
      mouse.x = e.pageX - this.offsetLeft
      mouse.y = e.pageY - this.offsetTop
    }, false)
    /* Drawing on Paint App */
    context.lineWidth = 5
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.strokeStyle = 'blue'
    canvas.addEventListener('mousedown', function (e) {
      context.beginPath()
      context.moveTo(mouse.x, mouse.y)
      canvas.addEventListener('mousemove', onPaint, false)
    }, false)
    canvas.addEventListener('mouseup', function () {
      canvas.removeEventListener('mousemove', onPaint, false)
    }, false)
    var onPaint = function () {
      context.lineTo(mouse.x, mouse.y)
      context.stroke()
    }
  }
  render () {
    return (
      <div ref='sketch'>
        <canvas ref='canvas' />
      </div>
    )
  }
}

export default Canvas
