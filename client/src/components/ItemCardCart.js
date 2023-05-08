import React from 'react';
import { Card } from 'react-bootstrap';
import {Buffer} from 'buffer'
import { useContext } from 'react';
import { TotalContext } from '../Context/TotalContext';
import { cartContext } from '../Context/Context';
import {BsFillTrashFill} from 'react-icons/bs';
import { useAuth0 } from '@auth0/auth0-react';
function ItemCard(props) {
    const { total,setTotal } = useContext(TotalContext);
    const { cart, setCart } = useContext(cartContext);
    const index = cart.findIndex(item=>item.catalogNum===props.catalogNum);
    const {user} = useAuth0();
    const addQuantity = () => {
      let updatedCart = [...cart];
      const index = updatedCart.findIndex(item => item.catalogNum === props.catalogNum); 
      updatedCart[index].quantity += 1; 
      setCart(updatedCart); 
      let updatedTotal=total+props.price;
      setTotal(updatedTotal);
      if (user) {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: updatedCart, total: updatedTotal }),
        };
        fetch(`http://localhost:8000/${user.email}`, requestOptions).then(response=>response.json()).then(data=>{
          setTotal(data.total);
          setCart(data.cart);
        })
      }
    };
    
    const subtractQuantity = () => {
      let updatedCart = [...cart];
      const index = updatedCart.findIndex(item => item.catalogNum === props.catalogNum); 
      updatedCart[index].quantity -= 1; 
      setCart(updatedCart); 
      let updatedTotal=total-props.price;
      setTotal(updatedTotal);
      if (user) {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: updatedCart, total: updatedTotal }),
        };
        fetch(`http://localhost:8000/${user.email}`, requestOptions).then(response=>response.json()).then(data=>{
          setTotal(data.total);
          setCart(data.cart);
        })
      }
    };
    const deleteItem = (itemRemove) => {
      const updatedCart = cart.filter(item => item._id !== itemRemove._id);
      setCart(updatedCart);
      const updatedTotal = total - itemRemove.quantity * itemRemove.price;
      setTotal(updatedTotal);
      if (user) {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: updatedCart, total: updatedTotal }),
        };
        fetch(`http://localhost:8000/${user.email}`, requestOptions).then(response=>response.json()).then(data=>{
          setTotal(data.total);
          setCart(data.cart);
        })
      }
    };
  //console.log(props);
  const toString = Buffer(props.image.data).toString('base64');
  const imgUrl = `data:image/jpeg;base64,${toString}`
  //console.log(props);

  return (
    <div>
      <Card  style={{borderBottom: '2px solid rgba(0, 0, 0, 0.1)',borderLeft:"none",borderRight:"none", borderTop:"none",borderRadius:"0",paddingBottom: '20px',paddingTop:"20px"}}>
  <div style={{display:"flex"}}>
    <div className="card-image">
      <Card.Img src={imgUrl} style={{ height: "100px",width:"auto", margin: "0 10px 0 0" }} />
    </div>
    <div>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text style={{ display: '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', overflow: 'hidden' }}>{props.description}</Card.Text>
    </div>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <h4 style={{ margin:"0 20px 0 40px"}}>{Number(props.quantity)}</h4>
    <button style={{ margin:"0 10px 0 0"}} onClick={()=>subtractQuantity()} disabled={cart[index].quantity===1}>-</button>
    <button style={{ margin:"0 10px 0 0"}} onClick={()=>addQuantity()}>+</button>
     <button style={{ margin:"0 10px 0 0",width:"100px"}} onClick={()=>deleteItem(cart[index])}> Remove <BsFillTrashFill/></button>
     </div> 
  </div>
</Card>
    
     </div>

  );
}
export default ItemCard