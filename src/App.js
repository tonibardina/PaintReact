import React, { Component } from 'react'
import Canvas from './Canvas'
import Tools from './Tools'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: 'red',
      lineWidth: 10
    }
  }

  changeColor = (color) => {
    this.setState({
      color: color
    })
  }

  render () {
    return (
      <div className='container-fluid'>
        <Tools color={this.state.color} changeColor={this.changeColor}/>
        <Canvas lineWidth={this.state.lineWidth} color={this.state.color}/>
      </div>
    )
  }
}

export default App
