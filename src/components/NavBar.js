import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import UserSession from '../modules/User/UserSession'
import { Link } from 'react-router-dom'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        {UserSession.getUser()
          ? <Navbar color="light" light expand="md">
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
    );
  }
}