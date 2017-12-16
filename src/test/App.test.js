import React from 'react'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'
import Adapter from './setUpTests'

import App from '../App'
import Tools from '../components/Tools'

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

  it('handle change line color successfully', () => {

    const wrapper = shallow(
      <App
      />
    )
    wrapper.instance().setLineColor('green')
    expect(wrapper.instance().lineColor).toBe('green')

  })

  it('handle change line width successfully', () => {

    const wrapper = shallow(
      <App
      />
    )
    wrapper.instance().setLineWidth(100)
    expect(wrapper.instance().lineWidth).toBe(100)

  })

  it('calls restoreState function with undo_list as pop argument ', () => {

    const wrapper = mount(
      <App
      />
    )
    wrapper.instance().undo_list = ['something']
    expect(wrapper.instance().undo_list[0]).toBe('something')
    wrapper.instance().undo()
    expect(wrapper.instance().undo_list[0]).toBe(undefined)

  })

  it('calls restoreState function with redo_list as pop argument ', () => {

    const wrapper = mount(
      <App
      />
    )
    wrapper.instance().redo_list = ['something']
    expect(wrapper.instance().redo_list[0]).toBe('something')
    wrapper.instance().redo()
    expect(wrapper.instance().redo_list[0]).toBe(undefined)

  })

  it('save undo_list and redo_list depending on the arguments it receive ', () => {

    const wrapper = mount(
      <App
      />
    )
    //In moment of draw
    wrapper.instance().redo_list = ['something']
    wrapper.instance().saveState('someFile')
    expect(wrapper.instance().redo_list[0]).toBe(undefined)
    expect(wrapper.instance().undo_list[0]).toBe('someFile')
    // When called trough restoreState
    let redo = wrapper.instance().redo_list
    let undo = wrapper.instance().undo_list
    // Option 1 redo_list current state = undefined
    wrapper.instance().saveState('someFile', redo, true)
    expect(wrapper.instance().redo_list[0]).toBe('someFile')
    // Option 2 undo_list[1] current state = undefined
    wrapper.instance().saveState('someFile', undo, true)
    expect(wrapper.instance().undo_list[1]).toBe('someFile')
  })

  it('it restore state of undo_list and redo_list depending trough witch function is called ', () => {

    const wrapper = mount(
      <App
      />
    )

    let redo = wrapper.instance().redo_list
    let undo = wrapper.instance().undo_list

    //Called trough undo function
    undo[0] = 'someFile'
    wrapper.instance().restoreState(undo, redo)
    expect(wrapper.instance().undo_list[0]).toBe(undefined)
    //Called trough redo function
    redo[0] = 'someFile'
    wrapper.instance().restoreState(redo, undo)
    expect(wrapper.instance().redo_list[0]).toBe(undefined)
    
  })

  it('reset undo_list and redo_list ', () => {

    const wrapper = mount(
      <App
      />
    )

    let redo = wrapper.instance().redo_list[0]
    let undo = wrapper.instance().undo_list[0]

    undo = 'someFile'
    redo = 'someFile'
    wrapper.instance().clearWorkspace()
    expect(wrapper.instance().undo_list[0]).toBe(undefined)
    expect(wrapper.instance().redo_list[0]).toBe(undefined)
    
  })

  it('set argument as tool', () => {

    const wrapper = mount(
      <App
      />
    )

    wrapper.instance().setTool('SomeTool')
    expect(wrapper.instance().tool).toBe('SomeTool')
    
  })

})