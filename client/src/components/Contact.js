import Header from "./Header";
import Footer from "./Footer";
import { Form,Button } from "react-bootstrap";
import {useState} from 'react'
const Contact =()=>{
    
    const [submit,setSubmit]=useState(false);
    const onClick = ()=>{
        setSubmit(true);
    }

    return(!submit&&<div style={{background: "linear-gradient(to top, #000000, #4ab6b4)"}}>
        <Header isHome={false}></Header>
        <div className="container" style={{paddingTop:"10%",paddingBottom:"10%",justifyContent:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <h1 style={{color:"#fff"}}>Contact Us</h1>
        <Form style={{paddingTop:"5%",width:"30%",color:"#fff"}}>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTextarea">
            <Form.Label>Inquiry</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter inquiry" />
        </Form.Group>
        </Form>
        <Button className="aboutUsButton" style={{wdith:"60px"}}onCLick={()=>onClick} type="submit">
            Submit
        </Button >
        </div>
        <Footer></Footer>

    </div>)
}

export default Contact;