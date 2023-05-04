
import React, { useState, useEffect } from 'react'
import ItemCard from "./ItemCard"


function Product() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/products')
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


export default Product;
