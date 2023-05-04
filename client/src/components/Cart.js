import { cartContext } from "../Context/Context";
import { TotalContext } from "../Context/TotalContext";
import { useContext } from "react";
import Header from './Header'
import ItemCardCart from "./ItemCardCart";
import { Link } from "react-router-dom";
import { Col, Row,Container } from 'react-bootstrap';
function Cart(){
    const {cart,setCart} = useContext(cartContext);
    const {total,setTotal}= useContext(TotalContext);
    
      if(total==0){
        
        return(<div>
            <Header></Header>
            <Container>
        <Row>
          <Col xs={12} md={1}>
          </Col>
          <Col xs={12} md={10}>
            <h1>cart is empty</h1>
          </Col>
          <Col xs={12} md={1}></Col>
        </Row>
      </Container>
           </div>)
      }
      return (
        <div>
          <Header isHome={false}></Header>
          <Container style={{marginTop:"10%"}}>
            <Row>
              <Col xs={12} md={2}></Col>
              <Col xs={12} md={8}>
                {cart.map(item => (
                  <div>
                    <ItemCardCart {...item} />
                  </div>
                ))}
                <h2 style={{ margin: "30px 0px", float: "right" }}>
                  Total: ${(Math.round(total * 100) / 100).toFixed(2)}
                </h2>
                <div style={{ clear: "both" }}></div>
                <Link to="/products" style={{textDecoration: "none",margin: "30px 0px",float: "right"}}>Browse</Link>
              </Col>
              <Col xs={12} md={2}></Col>
            </Row>
          </Container>
        </div>
      );
}
export default Cart;