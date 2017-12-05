import React, { Component } from 'react'
import './Canvas.css'

class Canvas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: 'red',
      lineWidth: 35,
      elements: []
    }
  }

  componentDidMount () {
    const canvas = this.refs.canvas
    const context = canvas.getContext('2d')
    const sketch = this.refs.sketch
    let sketchStyle = getComputedStyle(sketch)
    canvas.width = parseInt(sketchStyle.getPropertyValue('width'), 10)
    canvas.height = parseInt(sketchStyle.getPropertyValue('height'), 10)
    let mouse = {x: 0, y: 0}
    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function (e) {
      mouse.x = e.pageX - this.offsetLeft
      mouse.y = e.pageY - this.offsetTop
    })
    /* Drawing on Paint App */
    context.lineWidth = this.state.lineWidth
    context.strokeStyle = this.state.color
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.imageSmoothingQuality = 'high'
    canvas.addEventListener('mousedown', function (e) {
      context.beginPath()
      context.moveTo(mouse.x, mouse.y)
      canvas.addEventListener('mousemove', onPaint)
    })
    canvas.addEventListener('mouseup', function () {
      canvas.removeEventListener('mousemove', onPaint)
    })
    let onPaint = () => {
      context.lineTo(mouse.x, mouse.y)
      context.stroke()
    }

    var history = {
      redo_list: [],
      undo_list: [],
      saveState: function(canvas, list, keepRedo) {
        keepRedo = keepRedo || false
        if (!keepRedo) {
          this.redo_list = []
        }
        (list || this.undo_list).push(canvas.toDataURL())
      },
      undo: function (canvas, ctx) {
        this.restoreState(canvas, ctx, this.undo_list, this.redo_list)
      },
      redo: function (canvas, ctx) {
        this.restoreState(canvas, ctx, this.redo_list, this.undo_list)
      },
      restoreState: function (canvas, ctx, pop, push) {
        if (pop.length) {
          this.saveState(canvas, push, true)
          var restoreState = pop.pop()
          var img = new Element('img', {'src': restoreState})
          img.onload = function () {
            ctx.clearRect(0, 0, 600, 400)
            ctx.drawImage(img, 0, 0, 600, 400, 0, 0, 600, 400)
          }
        }
      }
    }
  }
  render () {
    var height = 'innerHeight' in window
               ? window.innerHeight
               : document.documentElement.offsetHeight
    var width = 'innerWidth' in window
               ? window.innerWidth
               : document.documentElement.offsetWidth
    return (
      <div className='canvasContainer' style={{height: height, width: width}} ref='sketch'>
        <canvas ref='canvas' />
      </div>
    )
  }
}

export default Canvas
