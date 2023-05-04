import Header from "./Header";
import React, { useState, useEffect } from 'react'
import ItemCard from "./ItemCard"
import { useParams } from 'react-router-dom';
import { Card, Button, Col, Row } from 'react-bootstrap';

function ProductType() {
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const link = `http://localhost:8000/products/type/${id}`;
  useEffect(() => {
    fetch(link)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => {
        console.error(error);
      });
  }, []);
  //console.log(items);
  return (
    <div>
      {items.map((item) => (
          <ItemCard {...item} />
      ))}
    </div>
  );
}


export default ProductType;
