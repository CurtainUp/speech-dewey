// NavBar component that allows for a unique header for each page of the app.

import React from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import UserSession from '../modules/User/UserSession'
import { Link } from 'react-router-dom'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div>
        {UserSession.getUser()
          ? <Navbar color="light" light expand="md">
            <h1>{this.props.navText}</h1>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/welcome"><i className="fas fa-home form-icon"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} onClick={() => { UserSession.logOutUser() }} to="/"><i className="fas fa-sign-out-alt form-icon"></i></NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          : null
        }
      </div>
    )
  }
}