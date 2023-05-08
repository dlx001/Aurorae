import { useState,useEffect } from "react";
import ProductRecCard from "./ProductRecCard";
import { useLocation } from "react-router-dom";

const ProductRec = (props)=>{

    const [items,setItems] =useState(null);
    const [filterItem,setFilterItem]=useState([]);
    const link = `http://localhost:8000/products/type/${props.category}`;
    const [displayItem,setDisplayItem]=useState(filterItem);
    const [startIndex,setStartIndex]=useState(0);
    const [endIndex,setEndIndex]=useState(0);
    const [leftButtonVis,setLeftButtonVis]=useState(false);
    const[rightButtonVis,setRightButtonVis]=useState(false);
    const location = useLocation();
    useEffect(()=>{
        if(filterItem&&filterItem.length>=3){
          setDisplayItem(items.slice(0,3));
          if(filterItem.length>12){
            setFilterItem(filterItem.slice(0,12))
          }
          if(filterItem.length>3)
            setRightButtonVis(true);
            setEndIndex(3);
        }else{
          setDisplayItem(items);
          setEndIndex(filterItem.length);
        }
      },[filterItem])

    useEffect(() => {
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
    const onRightClick =()=>{
        setLeftButtonVis(true);
        let newStart = startIndex+3;
        setStartIndex(newStart);
        if(endIndex+3<filterItem.length){
            setRightButtonVis(true);
            let newEnd=endIndex+3;
            setEndIndex(newEnd);
            setDisplayItem(filterItem.slice(newStart,newEnd));
        }else{
            setRightButtonVis(false);
            setEndIndex(filterItem.length);
            setDisplayItem(filterItem.slice(newStart,filterItem.length));
        }
        console.log(displayItem);
      }
      const onLeftClick =()=>{
        setRightButtonVis(true);
        if(startIndex-3===0){
            setLeftButtonVis(false);
        }else{
            setLeftButtonVis(true);
        }
        if(endIndex%2!==0){
            let newEnd = endIndex-endIndex%3;
            setEndIndex(newEnd);
            let newStart=startIndex-3;
            setStartIndex(newStart);
            setDisplayItem(filterItem.slice(newStart,newEnd));
        }
        else{
            let newEnd=endIndex-3;
            setEndIndex(newEnd);
            let newStart=startIndex-3;
            setStartIndex(newStart);
            setDisplayItem(filterItem.slice(newStart,newEnd));
        }
        console.log(displayItem);
        
      }
    useEffect(()=>{
        if(items!=null){
            const filterItems=items.filter((item)=>item._id!==props._id);
        setFilterItem(filterItems)
        }
    },[items,props._id])

    useEffect(() => {
        setDisplayItem(filterItem.slice(startIndex, endIndex));
      }, [filterItem, startIndex, endIndex, location]);


    return(<div style={{marginBottom:"15%",paddingTop:"40px",borderTop: '2px solid rgba(0, 0, 0, 0.1)', height: "400px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
    <button onClick={() => onLeftClick()} style={{height: "100%", width: "40px", visibility: leftButtonVis ? 'visible' : 'hidden'}}>
      &lt;
    </button>
    <div style={{display: "flex", justifyContent: "space-evenly", width: "calc(100% - 80px)"}}>
      {displayItem && displayItem.map((item) => {
        return <ProductRecCard key={item._id} {...item}></ProductRecCard>
      })}
    </div>
    <button onClick={() => onRightClick()} style={{height: "100%", width: "40px", visibility: rightButtonVis ? 'visible' : 'hidden'}}>
      &gt;
    </button>
  </div>
  
    )
}

export default ProductRec;