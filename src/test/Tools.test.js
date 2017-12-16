import React from 'react'
import renderer from 'react-test-renderer'
import {shallow, mount} from 'enzyme'
import Adapter from './setUpTests'

import Tools from '../components/Tools'

describe('Tool', () => {

  it('should build successfully', () => {
    let _inst 
    function setTool (inst) {
      return _inst = inst
    }
    const component = renderer.create(
      <Tools
        setSelf={setTool}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
    expect(_inst).toBe(component.getInstance('setTool'))
  })

  it('should undo successfully', () => {
    function setTool (inst) {}
  
    let undoCalled = 0

    function undo () {
      undoCalled++
    }

    const wrapper = shallow(<Tools
      setSelf={setTool}
      undo={undo}
      />)

    wrapper.find('#undo').simulate('click')

    expect(undoCalled).toBe(1)
  })

  it('should redo successfully', () => {
    function setTool (inst) {}
  
    let redoCalled = 0

    function redo () {
      redoCalled++
    }

    const wrapper = shallow(<Tools
      setSelf={setTool}
      redo={redo}
      />)

    wrapper.find('#redo').simulate('click')

    expect(redoCalled).toBe(1)
  })

  it('should setLineWidth successfully', () => {
    function setTool (inst) {}
  
    let lineWidth = 0

    function setLineWidth (e) {
      lineWidth = e
    }

    const wrapper = mount(<Tools
      setSelf={setTool}
      setLineWidth={setLineWidth}
      />)

    wrapper.find('#line5').simulate('click')

    expect(lineWidth).toBe('5')
  })

  it('should clearWorkSpace successfully', () => {

    let workspace = 100
    function setTool (inst) {}
    function clearWorkspace () { workspace = 0 }

    const wrapper = shallow(
      <Tools
        setSelf={setTool}
        clearWorkspace={clearWorkspace}
      />
    )

    wrapper.find('#clearButton').simulate('click')

    expect(workspace).toBe(0)
  })

})
