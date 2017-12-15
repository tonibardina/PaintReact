import React from 'react'
import renderer from 'react-test-renderer'

import App from '../App'
import Tools from '../components/Tools'

describe('App render test', () => {

  it('renders one <Tools /> component', () => {
    const component = renderer.create(
      <App />
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

})

//   it('renders one div className="container-fluid" component', () => {
//     const wrapper = shallow(<App />)
//     expect(wrapper.find('.container-fluid')).to.have.length(1)
//   })

// })

// describe('App methods test', () => {

//   describe('changeColor', () => {

//     it('change color attribute of the state', () => {
//       const wrapper = shallow(<App />)
//       wrapper.instance().changeColor('green')
//       expect(wrapper.state('color')).to.eql('green')
//     })

//   })

//   describe('changeLineWidth', () => {

//     it('change lineWidth attribute of the state', () => {
//       const wrapper = shallow(<App />)
//       wrapper.instance().changeLineWidth(20)
//       expect(wrapper.state('lineWidth')).to.eql(20)
//     })

//   })

//   describe('setCanvasWidthAndHeight', () => {

//     it('change canvas width and height attributes of the state', () => {
//       const wrapper = shallow(<App />)
//       wrapper.instance().setCanvasWidthAndHeight(20, 20)
//       expect(wrapper.state('canvasWidth')).to.eql(20)
//       expect(wrapper.state('canvasHeight')).to.eql(20)
//     })

//   })

//   describe('saveState', () => {

//     it('save state depending on the arguments we pass', () => {
//       const wrapper = shallow(<App />)
//       /* Push canvas to undo_list state each time user draws */
//       wrapper.instance().saveState('someCanvasToPush', null, false)
//       expect(wrapper.state('undo_list')).to.eql(['someCanvasToPush'])
//       expect(wrapper.state('redo_list')).to.eql([])
//       /* If function is called with (canvas, list, true) will save canvas to state(undo_list or redo_list) passed as list argument) */
//       wrapper.instance().saveState('someCanvasToPush', wrapper.state('redo_list'), true)
//       expect(wrapper.state('redo_list')).to.eql(['someCanvasToPush'])
//       expect(wrapper.state('undo_list')).to.eql(['someCanvasToPush'])
//       /* If we pass keep_redo argument as false, redo_list is setted to [] */
//       wrapper.instance().saveState('someCanvasToPush', null, false)
//       expect(wrapper.state('redo_list')).to.eql([])
//     })

//   })

//   describe('restoreState', () => {

//     it('restore state depending on function undo/redo and redraw canvas', () => {
//       const wrapper = shallow(<App />)
//       /* First we call saveState to pass a someCanvasToPush element to undo_list */
//       wrapper.instance().saveState('someCanvasToPush', null, false)
//       expect(wrapper.state('undo_list')).to.eql(['someCanvasToPush'])
//       /* If we pass undo_list as pop argument this function will pop undo_list array */
//       wrapper.instance().restoreState('someCanvasToPush', 'context', wrapper.state('undo_list'), wrapper.state('redo_list'))
//       expect(wrapper.state('undo_list')).to.eql([])
//       /* Inside restoreState function, saveState function is called with the push argument passed as saveState: 'list' argument, in this case redo_list */
//       expect(wrapper.state('redo_list')).to.eql(['someCanvasToPush'])
//     })

//   })

//   describe('undoRedo', () => {

//     it('define pop and push arguments of restoreState method', () => {
//       const wrapper = shallow(<App />)
//       wrapper.instance().saveState('someCanvasToPush', null, false)
//       expect(wrapper.state('undo_list')).to.eql(['someCanvasToPush'])
//       /* undoRedo argument: value, defines what will be the pull argument of restoreState method */
//       wrapper.instance().undoRedo('someCanvasToPush', 'context', 'undo')
//       expect(wrapper.state('undo_list')).to.eql([])
//     })

//   })

//   describe('clearWorkspace', () => {

//     it('reset undo_list and redo_list and clear workspace', () => {
//       const wrapper = shallow(<App />)
//       wrapper.instance().clearWorkspace()
//       expect(wrapper.state('undo_list')).to.eql([])
//     })

//   })

//   describe('defineCanvasToDownload', () => {

//     it('set state with current canvas', () => {
//       const wrapper = shallow(<App />)
//       wrapper.instance().defineCanvasToDownload('canvasToDownload')
//       expect(wrapper.state('canvas')).to.eql('canvasToDownload')
//     })

//   })

// })








