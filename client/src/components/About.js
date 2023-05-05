import Header from "./Header";
import {Image} from "react-bootstrap";
import { Container } from "react-bootstrap";
import researchImg from '../researcher.png'
import Footer from "./Footer";
const About= ()=>{
    return(
        <div>
            <Header isHome={false}></Header>
            <Container style={{display:"flex",justifyContent:"center",marginTop:"15%",marginBottom:"10%"}}>
                <div style={{marginRight:"10%"}}>
                <h1 style={{color:"#265257",fontWeight:"bold"}}>OUR MISSION</h1>
                <p style={{marginBottom:"10%"}}> At our ecommerce bio tech company, our mission is to empower scientists, researchers, and industry professionals with the tools 
                    they need to advance the field of biology. We are committed to providing a wide range of high-quality biology-related products, 
                    from basic lab equipment to advanced experimental materials. Our focus is on ensuring that every product we sell meets the highest 
                    standards of quality and reliability, so our customers can trust us to help them achieve their research goals. In addition to our standard 
                    product offerings, we also specialize in custom cell production, allowing researchers to tailor their experiments to their specific needs. 
                    Through our commitment to excellence and innovation, we aim to be a trusted partner in the scientific community and to contribute to the advancement 
                    of biological research and discovery.</p>
                <h1 style={{color:"#265257",fontWeight:"bold"}}>OUR STORY</h1>
                <p>
                Our ecommerce bio tech company was founded to provide researchers with high-quality and affordable biology-related products, including custom cells. 
                With a focus on excellence, innovation, and customer satisfaction, we have become a trusted partner to countless scientists and industry professionals.
                As we continue to expand our offerings and push the boundaries of biology research, we remain committed to making a positive impact on the world through our work.
                </p>
                </div>
                
                <Image src={researchImg} style={{height:"70vh"}}>

                </Image>
            </Container>
            <Footer></Footer>
            
        </div>
        
    );
}

export default About;