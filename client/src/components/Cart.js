import { cartContext } from "../Context/Context";
import { TotalContext } from "../Context/TotalContext";
import { useState,useContext,useEffect } from "react";
import Header from './Header'
import ItemCardCart from "./ItemCardCart";
import { Col, Row,Container } from 'react-bootstrap';
import Footer from "./Footer";
import { useAuth0 } from '@auth0/auth0-react';
function Cart(){

    const {cart,setCart} = useContext(cartContext);
    const {total,setTotal}= useContext(TotalContext);
    const {loginWithRedirect,user} =useAuth0();

    //once user changes, load data from backend
    useEffect(() => {
      if (user) {
        fetch(`http://localhost:8000/${user.email}`)
          .then(response => response.json())
          .then(data => {
            setTotal(data.total);
            setCart(data.cart);
            console.log(data.cart);
            console.log(data.total);
          });
      }
    }, [user]);
    console.log(cart);
    //empty cart
      if(total===0){
        
        return(<div>
            <Header isHome={false}></Header>
            <Container style={{marginTop:"10%",  border: "1px solid #ccc",minHeight:"400px",marginBottom:"10%"}}>
        <Row>
          <Col xs={12} md={1}>
          </Col>
          <Col xs={12} md={10} style={{display:"flex",flexDirection:"column",marginTop:"5%",alignItems:"center"}}>
            <h1>Your cart is empty</h1>
            {!user&&<div>
              <button className="signupButton" onClick={()=>loginWithRedirect()} style={{marginRight:"10px"}}>Sign in to your account</button>
            <button className="aboutUsButton" onClick={()=>loginWithRedirect()} style={{padding:"0.2em",textTransform:"none",fontWeight:"normal"}}>Sign up now</button>
              </div>}
           
          </Col>
          <Col xs={12} md={1}></Col>
        </Row>
      </Container>
      <Footer></Footer>
           </div>)
      }
      console.log(total);
      return (
        <div>
          <Header isHome={false}></Header>
          <Container style={{marginTop:"10%",  border: "1px solid #ccc",minHeight:"400px",marginBottom:"10%"}}>
            <Row>
              <Col xs={12} md={2}></Col>
              <Col xs={12} md={8} style={{marginTop:"2%"}}>
                {cart.map(item => (
                  <div >
                    <ItemCardCart {...item} />
                  </div>
                ))}
                <h4 style={{ margin: "30px 0px", float: "right" }}>
                  Total: ${(Math.round(total * 100) / 100).toFixed(2)}
                </h4>
                <div style={{ clear: "both" }}></div>
                {!user&&<button onClick={()=>loginWithRedirect()} >Sign in to Checkout</button>}
                {user&&<button className="signupButton"style={{float:"right",marginTop:"0",marginBottom:"10px"}} 
                onClick={()=>window.alert("this functionality has not been built")}>checkout</button>}
              </Col>
              <Col xs={12} md={2}></Col>
            </Row>
          </Container>
          <Footer></Footer>
        </div>
      );
}
export default Cart;