
import React, { useState, useEffect } from 'react'
import ItemCard from "./ItemCard"


function Product() {
  const [items, setItems] = useState(null);
  const [itemDisplay,setItemDisplay]= useState(items);
  const [numButtons,setNumButtons]= useState(0);
  const [numSelect,setNumSelect]=useState(null);

  useEffect(()=>{
    if(items&&items.length>=2){
      setItemDisplay(items.slice(0,2));
    }else{
      setItemDisplay(items);
    }
  },[items])
 
  const onClick =(event)=>{
    let number = event.target.textContent;
    setItemDisplay(items.slice((number-1)*2,number*2));
    setNumSelect(number);
    console.log(number);
  }
  useEffect(() => {
    const buttons = document.querySelectorAll("button.pagination");
    buttons.forEach((button) => {
      if (numSelect!==null&&button.textContent === numSelect.toString()) {
        button.style.backgroundColor="#4ab6b4";
        button.style.color= "white";
      }else{
        button.style.backgroundColor= "white";
        button.style.color= "black"
      } 
    });
  }, [numSelect]);
  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setNumButtons(Math.ceil(data.length / 2));
        setNumSelect(1);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  //console.log(items);
  return (
    <div style={{marginBottom:"10%"}}>
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


export default Product;
