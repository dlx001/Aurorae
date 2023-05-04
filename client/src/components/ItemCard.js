import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {Buffer} from 'buffer'
import {Link} from 'react-router-dom'
function ItemCard(props) {
  //console.log(props);
  const toString = Buffer(props.image.data).toString('base64');
  const imgUrl = `data:image/jpeg;base64,${toString}`
  //console.log(props);

  return (
    <Link to={`/product/${props._id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <Card style={{border: "none"}} className="price-card product-card">
  <div className="card-content">
    <div className="card-image">
      <Card.Img src={imgUrl} style={{ maxWidth: "100px", margin: "0 10px 0 0" }} />
    </div>
    <div className="card-text">
      <Card.Title>{props.name}</Card.Title>
      <Card.Text style={{ display: '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', overflow: 'hidden' }}>{props.description}</Card.Text>
    </div>
  </div>
</Card>
    </Link>
    

  );
}
export default ItemCard