import React from 'react';
import { Card, Button, Container, Table, Row, Col,ListGroup } from 'react-bootstrap';
import { Buffer } from 'buffer';
import Image from 'react-bootstrap/Image';

function ProductPreview(props) {
  return (
    <div>
      { 
        <Container>
          <Row xs={12} md={3}>
            <Image
              src={`data:image/jpeg;base64,${Buffer.from(
                props.image.data
              ).toString('base64')}`}
              style={{ width: '500px' }}
            />
            <Col xs={12} md={6}>
              <div>
                <h1>{props.name}</h1>
                <h3>Catalog Number: {props.catalogNum}</h3>
                <Table striped bordered hover style={{ boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)"}}>
                  <thead>
                    <tr>
                      <th>Catalog Number</th>
                      <th>Price</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{props.catalogNum}</td>
                      <td>{props.price}</td>
                      <td>{props.stock}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Row style={{height:"100px"}}></Row>
          <Row>
          <ListGroup horizontal variant="flush">
          <ListGroup.Item style={{ borderBottom: "1px solid blue"}}>Overview</ListGroup.Item>
          </ListGroup>
            <p>{props.description}</p>
          </Row>
        </Container>
      }
      
    </div>
  );
}

export default ProductPreview;
