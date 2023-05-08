import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { cartContext } from '../Context/Context';
import { TotalContext } from '../Context/TotalContext';
import React from 'react';
import { Button, Container, Table, Row, Col,ListGroup } from 'react-bootstrap';
import { Buffer } from 'buffer';
import Image from 'react-bootstrap/Image';
import Footer from './Footer';
import ProductRec from './ProductRec';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
function ProductPage() {
  const { cart, setCart } = useContext(cartContext);
  const { total,setTotal } = useContext(TotalContext);
  const { id } = useParams();
  const link = `http://localhost:8000/products/${id}`;
  const [data, setData] = useState(null);
  const [quantity,setQuantity]=useState(1);
  const [key, setKey] = useState(0);

  const {user}=useAuth0();
    const location = useLocation();
    useEffect(() => {
      setKey((prevKey)=>prevKey+1);
    }, [id]);
    console.log(cart);
    const addItem = (item) => {
      
      const updatedItem = {
        ...item,
        quantity: quantity,
      };
     
      const index = cart.findIndex((item) => item._id === data._id);
      console.log(index);
      let updatedCart=[...cart];
      if (index === -1) {
        updatedCart.push(updatedItem);
        console.log(updatedItem);  
      } else {
        updatedCart[index].quantity +=updatedItem.quantity;
      }
      setCart(updatedCart);
      const updatedTotal = total + updatedItem.quantity * updatedItem.price; 
      setTotal(updatedTotal);
      setQuantity(1);
      if (user) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: updatedCart, total: updatedTotal }), // pass updated cart and total
        };
        console.log(updatedCart);
        fetch(`http://localhost:8000/${user.email}`, requestOptions).then(response=>response.json()).then(data=>{
          console.log(data);
          setTotal(data.total);
          setCart(data.cart);
          console.log(data.cart);
        })
      }
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
  }, [location]);

  return (
    <div >
      <Header isHome={false} />
      {data && (
        <Container key={key} style={{paddingTop:"10%",paddingBottom:"10%s"}}>
          <Row style={{height:"100px"}}></Row>
          <Row xs={12} md={3}>
            <Image
              src={`data:image/jpeg;base64,${Buffer.from(
                data.image.data
              ).toString('base64')}`}
              style={{ height: '500px',width:"auto" }}
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
          <h2 style={{fontWeight:"bold"}}>You may also like</h2>
          <ProductRec key={key} {...data}></ProductRec>
        </Container>
      )}
      <Footer></Footer>
    </div>
  );
}

export default ProductPage;
