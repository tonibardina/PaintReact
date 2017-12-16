import React from 'react'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'
import Adapter from './setUpTests'

import App from '../App'

describe('App', () => {

  it('should build successfully', () => {
   
    const component = renderer.create(
      <App
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  
  })

  it('handle move successfully', () => {

    let move = false

    function handleMove () {
      move = true
    }

    const wrapper = shallow(
      <canvas
        id='canvas'
        onMouseMove={handleMove}
      />
    )
    wrapper.find('#canvas').simulate('mousemove')
    expect(move).toBe(true)

  })

  it('handle mousedown successfully', () => {

    let mouseDown = false

    function handleMouseDown () {
      mouseDown = true
    }

    const wrapper = shallow(
      <canvas
        id='canvas'
        onMouseDown={handleMouseDown}
      />
    )
    wrapper.find('#canvas').simulate('mousedown')
    expect(mouseDown).toBe(true)
    
  })

  it('handle mouseUp successfully', () => {

    let mouseUp = false

    function handleMouseUp () {
      mouseUp = true
    }

    const wrapper = shallow(
      <canvas
        id='canvas'
        onMouseUp={handleMouseUp}
      />
    )
    wrapper.find('#canvas').simulate('mouseUp')
    expect(mouseUp).toBe(true)
    
  })

  it('handle mouseOut successfully', () => {

    let mouseOut = false

    function handleMouseOut () {
      mouseOut = true
    }

    const wrapper = shallow(
      <canvas
        id='canvas'
        onMouseOut={handleMouseOut}
      />
    )
    wrapper.find('#canvas').simulate('mouseOut')
    expect(mouseOut).toBe(true)
    
  })

})