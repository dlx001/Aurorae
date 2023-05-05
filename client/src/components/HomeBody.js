import {Link} from 'react-router-dom'
import { Image } from 'react-bootstrap';
import HeroImage from '../heroImage2Crop.png'
import researchImage from '../WhoWeAre.png'
import cellImg from '../cellImg.png'
import '../styles/homebody.css'
import gene from '../plasmid.png'
import protein from '../protein.png'
import cell from '../cell.png'
import pipette from '../pipette.png'
import Footer from './Footer';

function HomeBody() {
  return (
    <div className='container-fluid' style={{padding:0,height:"100%"}}>
      <div className="heroContainer">
        <Image className="heroImage" src={HeroImage}></Image>
        <div className="heroText">
        <h4 style={{color:"#4ab6b4"}}>W E L C O M E</h4>
        <h1 style={{fontSize:"80px", color:"#fff"}}>Tailored Cell Lines</h1>
          <h2 style={{color:"#fff"}}>For Targeted Research</h2>
          <Link to="./contact">
          <button className="contactButton">Contact us</button>
          </Link>
         
        </div>
      </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:"2%"}}>
            <div className="textContent" style={{}}>
              <h4 style={{color:"#4ab6b4", wordSpacing:"em", letterSpacing: "0.5em"}}>WHO WE  ARE</h4>
              <h1 style={{marginBottom:"30px",marginTop:"20px",color:"#265257"}}>CellCore Biolabs</h1>
              <h4>CellCore Biolabs specialized cells are designed to be compatible to any patient, thus providing ideal testing conditions for a variety of applications in biomedical research</h4>
              <Link to='./About'>
              <button className="aboutUsButton">About us</button>
              </Link>
              
            </div>
          <Image src={researchImage} height="600vh"className="researchImg" ></Image>
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
        <Image src={cellImg} height="500vh"className="researchImg" ></Image>
            <div className="textContent" style={{}}>
              <h4 style={{color:"#4ab6b4", wordSpacing:"em", letterSpacing: "0.5em"}}>WHAT WE OFFER</h4>
              <h1 style={{marginBottom:"30px",marginTop:"20px",color:"#265257"}}>All Your Biology Related Needs</h1>
              <h4>Our comprehensive list of products makes us a one stop shop for all your biology related needs</h4>
              <Link to='./products'>
                <button className="aboutUsButton">Products</button>
              </Link> 
             
            </div>
        </div>
        <div style={{position:"relative"}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#4ab6b4" fill-opacity="1" d="M0,160L60,133.3C120,107,240,53,360,48C480,43,600,85,720,122.7C840,160,960,192,1080,192C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>

        <div style={{position:"absolute",top:"35%",width:"25%",left:"20%"}}>
            <h1 style={{color:"#fff"}}>DISCLAIMER</h1>
            <h3>All products,descriptions, and image content is taken from thermofisher scientific for the purpose of practicing and displaying web development skills. These are not real products to be sold</h3>
        </div>
        </div>
        <div>
          <div style={{display:"flex", justifyContent:"space-evenly",alignItems:"center", marginTop:"5%"}}>
            <h1 style={{fontWeight:"1000",color:"#265257"}}>Products </h1>
            <Link to='./products'>
            <button className="aboutUsButton" style={{width:"300px",marginTop:"0"}}>See All Products</button>
            </Link>
        
          </div>
          <div className="products" style={{display:"flex", justifyContent:"center",marginTop:"2%",marginBottom:"5%"}}>
            <div style={{display:"flex"}}>
            <div className="productsCard" style={{margin:"20px"}}>
              <h4 style={{fontWeight:"700"}}>CELL</h4>
              <Image className="productTypeImg" src={cell} ></Image>
              <Link to='./product/type/cell'>
                <button className="aboutUsButton">See Details</button>
              </Link> 
            </div>
            <div className="productsCard" style={{margin:"20px"}}>
              <h4 style={{fontWeight:"700"}}>PROTEIN</h4>
              <Image className="productTypeImg" src={protein } ></Image>
              <Link to='./product/type/protein'>
                <button className="aboutUsButton">See Details</button>
              </Link> 
            </div>
            <div className="productsCard" style={{margin:"20px"}}>
              <h4 style={{fontWeight:"700"}}>GENE</h4>
              <Image className="productTypeImg" src={gene}></Image>
              <Link to='./product/type/gene'>
                <button className="aboutUsButton">See Details</button>
              </Link> 
            </div>
            <div className="productsCard" style={{margin:"20px"}}>
              <h4 style={{fontWeight:"700"}}>PIPETTE</h4>
              <Image className="productTypeImg" src={pipette} ></Image>
              <Link to='./product/type/pipette'>
                <button className="aboutUsButton">See Details</button>
              </Link> 
            </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
    </div>
  );
}

export default HomeBody;