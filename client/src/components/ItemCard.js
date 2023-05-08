import React from 'react';
import { Card} from 'react-bootstrap';
import {Buffer} from 'buffer'
import {Link} from 'react-router-dom'
function ItemCard(props) {
  //console.log(props);
  const toString = Buffer(props.image.data).toString('base64');
  const imgUrl = `data:image/jpeg;base64,${toString}`
  //console.log(props);

  return (
    <Link to={`/product/${props._id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <Card style={{borderBottom: '2px solid rgba(0, 0, 0, 0.1)',borderLeft:"none",borderRight:"none", borderTop:"none",borderRadius:"0",paddingBottom: '20px',paddingTop:"20px"}} >
      <div style={{display:"flex"}}>
        <div style={{minWidth:"80px",margin: "0 10px 0 0"}}>
          <Card.Img src={imgUrl} style={{ height:"80px",width:"auto"}} />
        </div>
        <div >
          <Card.Title>{props.name}</Card.Title>
          <Card.Text style={{ display: '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', overflow: 'hidden' }}>{props.description}</Card.Text>
        </div>
      </div>
</Card>
    </Link>
    

  );
}
export default ItemCard