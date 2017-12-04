import React, { Component } from 'react'
import './Tools.css'
import Logo from "./art/logo.png"
import { Image } from 'react-bootstrap'

class Tools extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visble: false
    }
  }
  
  showTools = () => {
    this.setState({
      visble: true
    });
  }

  tools = () => {
    if (this.state.visible) {
      return (
        <div>
          <ul>
            <li>
              <img src="" alt="Colors"/>
            </li>
          </ul>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='toolsbox'>
        <div>
          <Image className='responsive, logo' src={Logo} alt="Colors"/>
        </div>
      </div>
    )
  }
}

export default Tools
