import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons'
import { NavLink } from 'react-router-dom';
import {useState,useEffect} from 'react'
import Logo from '../CellCoreLogo.png'
function NavBar(props) {
  const [isTop,setIsTop]=useState(true);

  useEffect(()=>{
   document.addEventListener('scroll',()=>{
       const scrolled=window.scrollY;
       if(scrolled>0&& isTop){
           setIsTop(false);
       }else if(scrolled==0&&!isTop){
           setIsTop(true);
       }
   });
  },[isTop])
  return (
    <Navbar style={{backgroundColor:isTop&&props.isHome? 'transparent': "#051013"}} variant="dark" fixed="top">
      <Container className="p-2" >
      <a class="navbar-brand" href="#">
          <img src={Logo} width="80" height="80" alt=""></img>
      </a>
        <Navbar.Brand as={NavLink} to='/' style={{fontSize:"36px",fontWeight:"bold"}}>CELLCORE BIOLABS</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} style={{fontSize:"20px"}} to='/'>Home</Nav.Link>
            <Nav.Link as={NavLink} style={{fontSize:"20px"}} to='/About'>About</Nav.Link>
            <Nav.Link as={NavLink} style={{fontSize:"20px"}} to='/Contact'>Contact Us</Nav.Link>
            <Nav.Link as={NavLink} style={{fontSize:"20px"}} to='/products'>Products</Nav.Link>
            <Nav.Link as={NavLink} style={{fontSize:"20px"}} to='/Cart'>Cart</Nav.Link>
            <Nav.Link href="#link" style={{fontSize:"20px"}}>Sign in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;