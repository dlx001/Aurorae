import Header from "./Header";
import { Col, Row, Container } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import ProductType from "./ProductType";
import { useEffect, useState } from "react";

function ProductFinal() {
  const [key, setKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setKey(key + 1);
  }, [location]);

  return (
    <div>
      <Header isHome={false}></Header>
      <Container style={{paddingTop:"10%"}}>
        <Row key={key}>
          <Col xs={12} md={3}>
            <div className="link-column">
              <Link to='/product/type/cell' >Cell</Link>
              <Link to='/product/type/protein'>Protein</Link>
              <Link to='/product/type/gene'>Gene</Link>
              <Link to='/product/type/pipette'>Pipette</Link>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <ProductType />
          </Col>
          <Col xs={12} md={3}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductFinal;
