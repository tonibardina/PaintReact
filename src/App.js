import React, { Component } from 'react'
import Canvas from './Canvas'
import Tools from './Tools'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <Tools />
        <Canvas />
      </div>
    )
  }
}

export default App
