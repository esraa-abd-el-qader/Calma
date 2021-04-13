import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Images/CALMA-logo.png';
import './Navbar.css'
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavLink,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { auth } from '../../firebase/utils';
import {connect} from 'react-redux';



const WebNavbar = (props) => {
  const {currentUser} = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
   
    <Container  className=" webNavbar " fluid={true} >
      <Navbar  dark  expand="md"  className=" webNavbar " fixed="top" >
        <NavbarBrand  to="/" tag={Link}>
           <img src={Logo}  alt="Logo" style={{height:"35px"}} /> 
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem >
            <NavLink  to="/" tag={Link} className=" NavbarLinks px-3">Home</NavLink>
            </NavItem>
            <NavItem>
            <NavLink  to="/about" tag={Link} className=" NavbarLinks px-3">About us</NavLink>
            </NavItem>
            <NavItem>
              < NavLink to="/blogs"  tag={Link}  className=" NavbarLinks px-3" >Blogs</ NavLink>
            </NavItem>
            <NavItem>
            < NavLink to="/doctors" tag={Link}  className=" NavbarLinks px-3" >Doctors</ NavLink>
            </NavItem>
            <NavItem>
            < NavLink to="/dashboard" tag={Link}  className=" NavbarLinks px-3" >Dashboard</ NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
            {currentUser&&(
              <NavLink tag={Link} nav caret className=" NavbarLinks px-3" onClick={()=>(auth.signOut())}>
                Log Out
              </NavLink>)}

            {!currentUser&&[ 
              <DropdownToggle key={1} nav caret className=" NavbarLinks px-3">
                Register
              </DropdownToggle>,
              <DropdownMenu key={2} right>
               < NavLink to="/register/signup" tag={Link} >
                  <DropdownItem className=" NavbarLinks px-3">
                  Sign Up
                   </DropdownItem>
                </NavLink>
                <DropdownItem divider />
                < NavLink to="/register/signin"  tag={Link} >
                  <DropdownItem className=" NavbarLinks px-3">
                  Sign In
                </DropdownItem>
                </NavLink> 
              </DropdownMenu>]}
            
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      </Container>
  );

  
}
WebNavbar.defaultProps = {
  currentUser : null
};
const mapStateToProps = ({user}) => ({
  currentUser:user.currentUser
});

export default connect(mapStateToProps,null) (WebNavbar);