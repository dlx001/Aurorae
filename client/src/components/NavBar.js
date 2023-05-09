import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import {useState,useEffect} from 'react'
import Logo from '../images/CellCoreLogo.png'
import { useAuth0 } from '@auth0/auth0-react';
import { cartContext } from '../Context/Context';
import { TotalContext } from '../Context/TotalContext';
import { useContext } from 'react';
function NavBar(props) {
  const { cart } = useContext(cartContext);
  const { total } = useContext(TotalContext);
  const [isTop,setIsTop]=useState(true);
  const {loginWithRedirect,user,isAuthenticated, isLoading,logout}=useAuth0();
  
  useEffect(()=>{
   document.addEventListener('scroll',()=>{
       const scrolled=window.scrollY;
       if(scrolled>0&& isTop){
           setIsTop(false);
       }else if(scrolled===0&&!isTop){
           setIsTop(true);
       }
   });
  },[isTop])

   


  return (
    !isLoading&&
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
            {!isAuthenticated&&<Nav.Link href="#link" style={{fontSize:"20px"}} onClick={()=>loginWithRedirect()}>Sign in</Nav.Link>}
            {isAuthenticated&&!isLoading&&<>
      <Dropdown >
        <Dropdown.Toggle style={{backgroundColor:"transparent",border:"none",color:"rgba(255, 255, 255, 0.55)",fontSize:"20px"}} >
          {user.name}
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark" >
          <Dropdown.Item onClick={()=>logout({logoutParams:{returnTo:window.location.origin}})}>Log out</Dropdown.Item>
      
        </Dropdown.Menu>
      </Dropdown>
    </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;