import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {Buffer} from 'buffer'
import {Link} from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import { TotalContext } from '../Context/TotalContext';
import { cartContext } from '../Context/Context';
import {BsFillTrashFill} from 'react-icons/bs';
import { Justify } from 'react-bootstrap-icons';
function ItemCard(props) {
    const { total, setTotal } = useContext(TotalContext);
    const { cart, setCart } = useContext(cartContext);
    const index = cart.findIndex(item=>item.catalogNum==props.catalogNum);
    const addQuantity = () => {
        cart[index].quantity = cart[index].quantity+1;
        setTotal((prevTotal) => prevTotal+props.price);
       
      };
      const subtractQuantity = () => {
        const index = cart.findIndex(item=>item.catalogNum==props.catalogNum);
        cart[index].quantity = cart[index].quantity-1;
        setTotal((prevTotal) => prevTotal-props.price);
       
      };
      const deleteItem = (itemRemove)=>{
        setCart(cart.filter(item => item._id !== itemRemove._id));
        setTotal((prevTotal)=>prevTotal-itemRemove.quantity*itemRemove.price);
      }
  //console.log(props);
  const toString = Buffer(props.image.data).toString('base64');
  const imgUrl = `data:image/jpeg;base64,${toString}`
  //console.log(props);

  return (
    <div>
      <Card style={{border: "none"}} className="price-card product-card">
  <div className="card-content">
    <div className="card-image">
      <Card.Img src={imgUrl} style={{ maxWidth: "100px", margin: "0 10px 0 0" }} />
    </div>
    <div className="card-text">
      <Card.Title>{props.name}</Card.Title>
      <Card.Text style={{ display: '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', overflow: 'hidden' }}>{props.description}</Card.Text>
    </div>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <h4 style={{ margin:"0 20px 0 40px"}}>{props.quantity}</h4>
    <button style={{ margin:"0 10px 0 0"}} onClick={()=>subtractQuantity()} disabled={cart[index].quantity===1}>-</button>
    <button style={{ margin:"0 10px 0 0"}} onClick={()=>addQuantity()}>+</button>
     <button style={{ margin:"0 10px 0 0"}} onClick={()=>deleteItem(cart[index])}> Remove <BsFillTrashFill/></button>
     </div> 
  </div>
</Card>
    
     </div>

  );
}
export default ItemCard