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

  it('should handleChangeColorPicker set state and setLineColor', () => {
    
    const color = {
      hex: '#84CAE7'
    }
    let lineColor = 'blue'

    function setTool (inst) {}
    function setLineColor (color) { lineColor = color }

    const wrapper = shallow(
      <Tools
        setSelf={setTool}
        setLineColor={setLineColor}
      />
    )

    wrapper.instance().handleChangeColorPicker(color)
    expect(wrapper.instance().state.color).toBe('#84CAE7')
    expect(lineColor).toBe('#84CAE7')
  })

  it('should set palette state', () => {
    
    const e = {
      target: {
        name: 'Colors2'
      }
    }

    const palette = 
    [

      '#581845', '#900C3F', '#C70039',
      '#FF5733', '#FF9B70', '#E0FF69',
      '#66DE87', '#1E5B65', '#E5F9BD',
      '#A0E418', '#7FB414', '#525050',
      '#F2FCFC', '#BDF1F6', '#8FBAF3',
      '#0245A3', '#F5F5F5', '#ECECEC',
      '#FACC2E', '#27B1BE'
    
    ]

    function setTool (inst) {}

    const wrapper = shallow(
      <Tools
        setSelf={setTool}
      />
    )

    wrapper.instance().handleClickColorPalette(e)
    expect(wrapper.instance().state.palette[0]).toBe(palette[0])

  })

})
