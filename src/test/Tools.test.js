import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import Adapter from './setUpTests'
import sinon from 'sinon'

import Tools from '../components/Tools'
import App from '../App'

describe('Tools render test', () => {

  it('one <a id="title"/> component', () => {
    const wrapper = mount(<Tools />)
    expect(wrapper.find('#title')).to.have.length(1)
  })

  it('three icons', () => {
    const wrapper = mount(<Tools />)
    expect(wrapper.find('.fa')).to.have.length(3)
    expect(wrapper.find('.fa-download')).to.have.length(1)
    expect(wrapper.find('.fa-repeat')).to.have.length(1)
    expect(wrapper.find('.fa-undo')).to.have.length(1)
  })

  describe('Bootstrap components', () => {

    it('renders one Navbar component', () => {
      const wrapper = mount(<Tools />)
      expect(wrapper.find('Navbar')).to.have.length(1)
    })

    it('renders 4 NavItem components', () => {
      const wrapper = mount(<Tools />)
      expect(wrapper.find('NavItem')).to.have.length(4)
    })

    it('one Nav component', () => {
      const wrapper = mount(<Tools />)
      expect(wrapper.find('Nav')).to.have.length(1)
    })

    it('one NavDropdown component', () => {
      const wrapper = mount(<Tools />)
      expect(wrapper.find('NavDropdown')).to.have.length(2)
    })

    it('one NavDropdown component', () => {
      const wrapper = mount(<Tools />)
      expect(wrapper.find('NavDropdown')).to.have.length(2)
    })

    it('one MenuItem component', () => {
      const wrapper = mount(<Tools />)
      expect(wrapper.find('MenuItem')).to.have.length(4)
    })

  })

})

describe('Tools methods', () => {

  describe('setLineWidth', () => {

    it('change fathers state lineWidth', () => {
      const wrapper = mount(<App />)
      wrapper.find('#line5').simulate('click')
      expect(wrapper.state('lineWidth')).to.eql('5')
    })

  })

  describe('undoRedoSelect', () => {

    it('call fathers function undoRedo with an argument "undo" or "redo" ', () => {
      const wrapper = mount(<App />)
      sinon.spy(wrapper, 'saveState')
      wrapper.find('NavItem [eventKey=1]').simulate('click')
      expect(wrapper.instance().saveState.to.have.property('callCount', 1))

    })

  })

})






