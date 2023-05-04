import Logo from '../CellCoreLogo.png'
import { NavLink } from 'react-router-dom';

const Footer =()=>{
    return(
        <div className="footer"style={{backgroundColor:"black",display:"flex",height:"200px",justifyContent:"space-evenly"}}>
            <div style={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
                <div style={{display:"flex",alignItems:"center"}}>
                <img src={Logo} width="80" height="80" alt=""></img>
                <h1 style={{color:"#fff"}}>CELLCORE BIOLABS</h1>
                </div>
                <p style={{color:"#fff"}}>info@cellcore.com</p>
            </div>
            
            <div style={{display:"flex"}}>
                <div style={{display:"flex",flexDirection:"column",padding:"40px"}}>
                    <h8 style={{color:"#4ab6b4"}}>WEBSITE</h8>
                    <NavLink style={{ ':hover': { color: '#4ab6b4' } }} to= '/'>Home</NavLink>
                    <NavLink to='/products'>Products</NavLink>
                    <NavLink to='/About'>About Us</NavLink>
                    <NavLink to= '/Contact'>Contact</NavLink>
                </div>
                <div style={{display:"flex",flexDirection:"column",padding:"40px"}}>
                    <h8 style={{color:"#4ab6b4"}}>PRODUCTS</h8>
                    <NavLink  to='/product/type/gene'>Gene</NavLink>
                    <NavLink  to='/product/type/protein'>Protein</NavLink>
                    <NavLink  to='/product/type/cell'>Cell</NavLink>
                    <NavLink to='/product/type/pipette'>Pipette</NavLink>
                </div>
            </div>
        </div>
    )

}
export default Footer;