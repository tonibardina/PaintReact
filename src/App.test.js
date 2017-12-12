import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import Adapter from './setUpTests'
import sinon from 'sinon'

import App from './App'
import Tools from './Tools'
import Canvas from './Canvas'

describe('<App />', () => {

  it('renders one <Tools /> component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Tools)).to.have.length(1)
  })

  it('renders one <Canvas /> component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Canvas)).to.have.length(1)
  })

  it('renders one div className="container-fluid" component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.container-fluid')).to.have.length(1)
  });

});

describe('changeColor method', () => {

  it('change color attribute of the state', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().changeColor('green')
    expect(wrapper.state('color')).to.eql('green')
  });

});

describe('changeLineWidth method', () => {

  it('change lineWidth attribute of the state', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().changeLineWidth(20)
    expect(wrapper.state('lineWidth')).to.eql(20)
  });

});

describe('setCanvasWidthAndHeight method', () => {

  it('change canvas width and height attributes of the state', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().setCanvasWidthAndHeight(20, 20)
    expect(wrapper.state('canvasWidth')).to.eql(20)
    expect(wrapper.state('canvasHeight')).to.eql(20)
  });

});

describe('saveState method', () => {

  it('save state depending on the arguments we pass', () => {
    const wrapper = shallow(<App />)
    /* Push canvas to undo_list state each time user draws */
    wrapper.instance().saveState('someCanvasToPush', null, false)
    expect(wrapper.state('undo_list')).to.eql(['someCanvasToPush'])
    expect(wrapper.state('redo_list')).to.eql([])
    /* If function is called with (canvas, list, true) will save canvas to state(undo_list or redo_list) passed as list argument) */
    wrapper.instance().saveState('someCanvasToPush', wrapper.state('redo_list'), true)
    expect(wrapper.state('redo_list')).to.eql(['someCanvasToPush'])
    expect(wrapper.state('undo_list')).to.eql(['someCanvasToPush'])
    /* If we pass keep_redo argument as false, redo_list is setted to [] */
    wrapper.instance().saveState('someCanvasToPush', null, false)
    expect(wrapper.state('redo_list')).to.eql([])
  });

});

describe('restoreState method', () => {

  it('restore state depending on function undo/redo and redraw canvas', () => {
    const wrapper = shallow(<App />)
    /* First we call saveState to pass a someCanvasToPush element to undo_list */
    wrapper.instance().saveState('someCanvasToPush', null, false)
    expect(wrapper.state('undo_list')).to.eql(['someCanvasToPush'])
    /* If we pass undo_list as pop argument this function will pop undo_list array */
    wrapper.instance().restoreState('someCanvasToPush', 'context', wrapper.state('undo_list'), wrapper.state('redo_list'))
    expect(wrapper.state('undo_list')).to.eql([])
    /* Inside restoreState function, saveState function is called with the push argument passed as saveState: 'list' argument, in this case redo_list */
    expect(wrapper.state('redo_list')).to.eql(['someCanvasToPush'])
  });

});

describe('undoRedo method', () => {

  it('pass undo/redo arguments to restoreState function depending on argument: value', () => {
    const wrapper = shallow(<App />)
    wrapper.instance().saveState('someCanvasToPush', null, false)
    expect(wrapper.state('undo_list')).to.eql(['someCanvasToPush'])
    /* When we call undoRedo with argument value= undo, restoreState function is called with undo:list as pop argument */
    wrapper.instance().undoRedo('someCanvasToPush', 'context', 'undo')
    expect(wrapper.state('undo_list')).to.eql([])
  });

});










