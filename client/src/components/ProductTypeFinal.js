import Header from "./Header";
import { Col, Row, Container } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import ProductType from "./ProductType";
import { useEffect, useState } from "react";
import Footer from "./Footer";
function ProductFinal() {
  const [key, setKey] = useState(0);
  const location = useLocation();
  const linkStyle={
    color: "black",
    textDecoration:"none",
    ':hover':{
      color:"#4ab6b4"
    }
  }
  useEffect(() => {
    setKey(key + 1);
  }, [location]);
  console.log(location);
  return (
    <div >
      <Header isHome={false}></Header>
      <Container style={{marginTop:"10%",paddingBottom:"10%",height:"100vh",borderTop: '2px solid rgba(0, 0, 0, 0.1)'}}>
        <Row key={key}>
          <Col xs={12} md={3}>
            <div className="link-column">
              <Link to='/products' style={{ color: location.pathname === "/products" ? "#4ab6b4" : "black" ,textDecoration:"none"}}>All Products</Link>
              <Link style={{ color: location.pathname === "/product/type/cell" ? "#4ab6b4" : "black" ,textDecoration:"none"}} to='/product/type/cell'>Cell</Link>
              <Link to='/product/type/protein' style={{ color: location.pathname === "/product/type/protein" ? "#4ab6b4" : "black" ,textDecoration:"none"}}>Protein</Link>
              <Link to='/product/type/gene' style={{ color: location.pathname === "/product/type/gene" ? "#4ab6b4" : "black" ,textDecoration:"none"}}>Gene</Link>
              <Link to='/product/type/pipette' style={{ color: location.pathname === "/product/type/pipette" ? "#4ab6b4" : "black" ,textDecoration:"none"}}>Pipette</Link>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <ProductType />
          </Col>
          <Col xs={12} md={3}>
          <div style={{marginTop:"20px",boxShadow: "0 4px 6px -6px rgba(0, 0, 0, 0.4)",border: "1px solid rgba(0, 0, 0, 0.1)",padding:"10px",paddingBottom:"0"}}>
              <h5 style={{color:"#4ab6b4",fontHeight:"20px"}}>Save up to 35% savings on ready-to-ship cold storage lab equipment</h5>
              <p>For a limited time, save up to 35% savings on select cold storage lab equipment</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default ProductFinal;
