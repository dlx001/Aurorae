import React,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button";
import ProductPreview from "./ProductPreview";
function Editor(){
    const [formData,setFormData]=useState({name:'',description:'',price:0.00,image:null,category:'',catalogNum:0,stock:0}); //formData to be used for adding,updating,generating preview
    const [formImage,setFormImage]=useState(null); //sets form file rather than 8unit data due to discrepancies on loading and image preview
    const [queryData,setQueryData]=useState({catalogNum:0}); //sets catalogNum for update and remove
    const [previewObj,setPreviewObj]=useState([null]);//sets preview object which will be used to update and show preview image of changes
    const [showForm,setShowForm]= useState(false);//sets visibility of add form
    const [showQuery,setShowQuery]= useState(false); //sets visibility of catalogNum query form
    const [add,setAdd] = useState(false); //sets whether add operation is performed
    const [update,setUpdate] = useState(false); //sets whether update operation is performed
    const [remove,setRemove]= useState(false); //sets whether removeoperation is performed
    const [querySub,setQuerySub] = useState(false); //checks if query is submitted
    const [confirm,setConfirm]= useState(false);  

  /*
  *query code to confirm correct catalog object for update and remove
  */
  //handle query form changes
  const onQueryChange = (event)=>{
    const {name,value}=event.target;
    setQueryData({...queryData,[name]:value})
  }
  //handles query submission
  const querySubmit = async(event)=>{
    event.preventDefault();

    try{
      const response = await fetch(`http://localhost:8000/editor/${queryData.catalogNum}`,{
        method: 'GET',
      });
      const data = await response.json()
      setPreviewObj(data);
      setQuerySub(true);
    }catch(error){
      console.error(error);
    }
  }
  //generates preview based off query
  const previewDisplay=()=>{
    if(previewObj===null){
      return <h1>item not found</h1>
    }else{
      return (<div style={{marginTop:"20px", border: "1px solid #ccc", padding:"50px"}}>
        <h1 style={{marginBottom:"20px"}}>Product Preview</h1>
        <ProductPreview {...previewObj}></ProductPreview>
      </div>
      
    )}
    
  }
  //generates query form
  const queryDisplay = ()=>{
    return(<Form onSubmit={querySubmit}>
        <Form.Group controlId="catalogNum" style={{marginTop:"20px"}}>
        <Form.Label>CatalogNum</Form.Label>
        <Form.Control
          type="String"
          name="catalogNum"
          value={queryData.catalogNum}
          onChange={onQueryChange}
        />
      </Form.Group>
      <Button className='signupButton' onClick={()=>setConfirm(true)}variant="primary" type="submit">
        Search
      </Button>
      </Form>
      
    )
  }

    /* 
    * All add code here
    */
    const onAddClick=()=>{
      setAdd(true);
      setUpdate(false);
      setRemove(false);
      setShowForm(true);
      setShowQuery(false);
      setConfirm(false);
      setQuerySub(false);
    }
    //setting formdata object upon form changes
  const onInputChange = (event)=>{
      const {name,value}=event.target;
      setFormData({...formData,[name]:value});
  }
  const onFileChange = (event)=>{
    const fileValue = event.target.files[0];
    //console.log(fileValue);
    setFormData({
      ...formData,
      image:fileValue
    })
  }
  //form submission to backend 
  const onSubmit = async (event) => {
    event.preventDefault();
    setShowForm(false);
    setAdd(false);
    try {
      let formDataObj = new FormData();
      formDataObj.append("name",formData.name);
      formDataObj.append("description",formData.description);
      formDataObj.append("price",formData.price);
      formDataObj.append("image",formData.image);
      formDataObj.append("category",formData.category);
      formDataObj.append("stock",formData.stock);
      formDataObj.append("catalogNum",formData.catalogNum);
        //console.log(formData);
        const response = await fetch('http://localhost:8000/', {
            method: 'POST',
            body: formDataObj,
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
   
};
//generates form
const formDisplay = ()=>{
  return(<div style={{marginTop:"20px"}}>
    <h1>All Fields Must Be Filled</h1>
     <Form onSubmit={onSubmit} >
    <Form.Group controlId="name">
      <Form.Label>Item Name</Form.Label>
      <Form.Control
        type="text"
        name="name"
        value={formData.name}
        onChange={onInputChange}
      />
    </Form.Group>

    <Form.Group controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        name="description"
        value={formData.description}
        onChange={onInputChange}
      />
    </Form.Group>
    <Form.Group controlId="price">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number"
        name="price"
        value={formData.price}
        onChange={onInputChange}
      />
    </Form.Group>
    <Form.Group controlId="image">
      <Form.Label>Choose File</Form.Label>
      <Form.Control
        type="file"
        name="image"
        //value={formData.image}
        onChange={onFileChange}
      />
    </Form.Group>
    <Form.Group>
    <Form.Label>Select a Category</Form.Label>
      <Form.Select name = "category"  onChange={onInputChange}>
        <option value="pick a category">empty</option>
        <option value="cell">cell</option>
        <option value="protein">protein</option>
        <option value="gene">gene</option>
        <option value="pipette">pipette</option>
      </Form.Select>
    </Form.Group>
    <Form.Group controlId="catalogNum">
      <Form.Label>CatalogNum</Form.Label>
      <Form.Control
        type="String"
        name="catalogNum"
        value={formData.catalogNum}
        onChange={onInputChange}
      />
    </Form.Group>
    <Form.Group controlId="stock">
      <Form.Label>Stock</Form.Label>
      <Form.Control
        type="number"
        name="stock"
        value={formData.stock}
        onChange={onInputChange}
      />
    </Form.Group>
    <Button className="signupButton" type="submit">
      Submit
    </Button>
  </Form>

  </div>
 )
}

/*
*All update code
*/

const onUpdateClick=()=>{
  setAdd(false);
  setUpdate(true);
  setRemove(false);
  setShowQuery(true);
  setShowForm(false);
  setConfirm(false);
  setQuerySub(false);
}

//handles formdata object to be sent to backend
const onUpdateInputChange = (event)=>{
  const {name,value}=event.target;
  setPreviewObj({...previewObj,[name]:value});
}
const onUpdateFileChange = (event) => {
const fileValue = event.target.files[0];
setFormImage(fileValue);
const reader = new FileReader();
reader.onload = () => {
  const buffer = new Uint8Array(reader.result);
  const data = { type: 'Buffer', data: Array.from(buffer) };
  setPreviewObj({
    ...previewObj,
    image: {
      data,
      contentType: fileValue.type,
      name: fileValue.name,
    },
  });
};
reader.readAsArrayBuffer(fileValue);
};

//submission for update form to backend
const onUpdate = async (event) => {
  setUpdate(false);
  setShowQuery(false);
  setConfirm(false);
  setQuerySub(false);
  event.preventDefault();
  try {
    let formDataObj = new FormData();
    formDataObj.append("name",previewObj.name);
    formDataObj.append("description",previewObj.description);
    formDataObj.append("price",previewObj.price);
    formDataObj.append("image", formImage);
    formDataObj.append("category",previewObj.category);
    formDataObj.append("stock",previewObj.stock);
    formDataObj.append("catalogNum",previewObj.catalogNum);
    
      //console.log(formData);
      const response = await fetch('http://localhost:8000/editor/update', {
          method: 'PUT',
          body: formDataObj,
      });
      console.log(response);
  } catch (error) {
      console.error(error);
  }

};










   
 
   
    
    //function to generate form
    const updateFormDisplay=()=>{
      if(!previewObj){
        return <div>loading</div>
      }
      return(update&&<Form onSubmit={onUpdate} >
        <Form.Group controlId="name">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={previewObj.name}
            onChange={onUpdateInputChange}
          />
        </Form.Group>
  
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={previewObj.description}
            onChange={onUpdateInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={previewObj.price}
            onChange={onUpdateInputChange}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Choose File</Form.Label>
          <Form.Control
            type="file"
            name="image"
            //value={formData.image}
            onChange={onUpdateFileChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select a Category</Form.Label>
          <Form.Select name = "category" onChange={onUpdateInputChange}>
          <option value="pick a category">empty</option>
            <option value="cell">cell</option>
            <option value="protein">protein</option>
            <option value="gene">gene</option>
            <option value="pipette">pipette</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="catalogNum">
          <Form.Label>CatalogNum</Form.Label>
          <Form.Control
            type="String"
            name="catalogNum"
            value={previewObj.catalogNum}
            onChange={onUpdateInputChange}
          />
        </Form.Group>
        <Form.Group controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={previewObj.stock}
            onChange={onUpdateInputChange}
          />
        </Form.Group>
        <Button className='signupButton' type="submit">
          Update
        </Button>
      </Form>)
    }

    /*
    *all editor remove code
    */
    const onRemoveClick=()=>{
      setAdd(true);
      setUpdate(false);
      setRemove(true);
      setShowQuery(true);
      setShowForm(false);
      setConfirm(false);
      setQuerySub(false);
    }
    const deleteItem=async()=>{
      setRemove(false);
      setShowQuery(false);
      setConfirm(false);
      setQuerySub(false);
      try{
      const response = await fetch(`http://localhost:8000/editor/delete/${previewObj.catalogNum}`, {
              method: 'DELETE'
          });
          console.log(response);
      } catch (error) {
          console.error(error);
      }
   
  
    }
    const renderDeleteButton =()=>{
      return(<Button className="signupButton" onClick={()=>deleteItem()}>Remove</Button>);
    }
  


  
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"5%",border: "1px solid #ccc",minHeight:"300px",padding:"100px"}}>
       <h1>CellCore Biolabs Item Editor</h1>
      <div style={{display:"flex",flexDirection:"column"}}>
      <Button className="signupButton" onClick={onAddClick}> Add </Button>
      <Button className="signupButton" onClick={onUpdateClick}>Update</Button>
      <Button className="signupButton" onClick={onRemoveClick}>Remove</Button>
      </div>
      {showForm && formDisplay()}
      {showQuery&&queryDisplay()}
      {querySub&&previewDisplay()}
      {confirm&&update&&updateFormDisplay()}
      {confirm&&remove&&renderDeleteButton()}
    </div>
    
  );
}

export default Editor;

