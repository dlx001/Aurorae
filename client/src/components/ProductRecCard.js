import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const ProductRecCard = (props)=>{
    
    return(<div style={{height:"320px",width:"300px",border: "1px solid #ccc",display:"flex",flexDirection:"column"}}>
        <Link to={`/product/${props._id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
            <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
            <Image
              src={`data:image/jpeg;base64,${Buffer.from(
                props.image.data
              ).toString('base64')}`}
              style={{ height: '200px',width:"auto" }}></Image>
              <h2 style={{fontWeight:"bolder",color:"#4ab6b4",fontSize:"20px",marginBottom:"20px"}}>{props.name}</h2>
              <h2 style={{color:"black",fontSize:"20px"}}>Catalog Number:{props.catalogNum}</h2>
            </div>
        </Link>
       
    </div>)
}
export default ProductRecCard;