
import React, { useState, useEffect } from 'react'
import ItemCard from "./ItemCard"
import { useParams } from 'react-router-dom';


function ProductType() {
  const [items, setItems] = useState(null);
  const [itemDisplay, setItemDisplay] = useState(items);
  const [numButtons, setNumButtons] = useState(0);
  const [numSelect, setNumSelect] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    if (items&&items.length > 5) {
      setItemDisplay(items.slice(0, 5));
    } else {
      setItemDisplay(items);
    }
  }, [items]);

  const onClick = (event) => {
    let number = event.target.textContent;
    setItemDisplay(items.slice((number - 1) * 5, number * 5));
    setNumSelect(number);
  };

  useEffect(() => {
    const buttons = document.querySelectorAll("button.pagination");
    buttons.forEach((button) => {
      if (numSelect !== null && button.textContent === numSelect.toString()) {
        button.style.backgroundColor = "#4ab6b4";
        button.style.color = "white";
      } else {
        button.style.backgroundColor = "white";
        button.style.color = "black";
      }
    });
  }, [numSelect]);

  const link = `http://localhost:8000/products/type/${id}`;
  useEffect(() => {
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setNumButtons(Math.ceil(data.length / 5));
        setNumSelect(1); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //console.log(items);
  return (
    <div style={{ marginBottom: "10%" }}>
      {itemDisplay&&itemDisplay.length===0&&<div style={{display:"flex",justifyContent:"center"}}>
        <h1 style={{marginTop:"20px",color: "rgba(0, 0, 0, 0.5)"}}>no items found</h1>
      </div>}
      {itemDisplay&&itemDisplay.length!==0&&itemDisplay.map((item) => (
        <ItemCard {...item} />
      ))}
      <div style={{ display: "flex", float: "right", marginTop: "20px" }}>
        {Array.from({ length: numButtons }, (_, i) => (
          <button className="pagination" onClick={onClick} key={i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductType;
