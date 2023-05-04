import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { cartContext } from '../Context/Context';
import { TotalContext } from '../Context/TotalContext';
import React from 'react';
import { Card, Button, Container, Table, Row, Col,ListGroup } from 'react-bootstrap';
import { Buffer } from 'buffer';
import Image from 'react-bootstrap/Image';

function ProductPage() {
  const { cart, setCart } = useContext(cartContext);
  const { total, setTotal } = useContext(TotalContext);
  const { id } = useParams();
  const link = `http://localhost:8000/products/${id}`;
  const [data, setData] = useState(null);
  const [quantity,setQuantity]=useState(1);

  const addItem = (item) => {
    const updatedItem={
      ...item,
      quantity: quantity
    }
    const index = cart.findIndex(item=>item._id==data._id)
    if(index==-1){
      setCart([...cart, updatedItem]);
    }
    setTotal((prevTotal) => prevTotal + updatedItem.quantity*updatedItem.price);
    console.log(data);
    setQuantity(1);
  };

  useEffect(() => {
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Header isHome={false} />
      {data && (
        <Container style={{paddingTop:"10%"}}>
          <Row style={{height:"100px"}}></Row>
          <Row xs={12} md={3}>
            <Image
              src={`data:image/jpeg;base64,${Buffer.from(
                data.image.data
              ).toString('base64')}`}
              style={{ width: '500px' }}
            />
            <Col xs={12} md={6}>
              <div>
                <h1>{data.name}</h1>
                <h3>Catalog Number: {data.catalogNum}</h3>
                <Table striped bordered hover style={{ boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)"}}>
                  <thead>
                    <tr>
                      <th>Catalog Number</th>
                      <th>Price</th>
                      <th>Availability</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data.catalogNum}</td>
                      <td>{data.price}</td>
                      <td style={{ color: data.stock > 0 ? 'green' : 'red' }}>
                        {data.stock > 0 ? 'In Stock' : 'Not Available'}
                      </td>
                      <td>
                      <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button style={{ float: 'right' }} onClick={() => addItem(data)}>Add to Cart</Button>
              </div>
            </Col>
          </Row>
          <Row style={{height:"100px"}}></Row>
          <Row>
          <ListGroup horizontal variant="flush">
          <ListGroup.Item style={{ borderBottom: "1px solid blue"}}>Overview</ListGroup.Item>
          </ListGroup>
            <p>{data.description}</p>
          </Row>
          <Row style={{height:"150px"}}></Row>
        </Container>
      )}
      
    </div>
  );
}

export default ProductPage;
