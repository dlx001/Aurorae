const express=require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Item = require('./models/item.js');
const app =express();
const fs= require('fs');
const path=require('path');
var multer = require('multer');

mongoose.set('strictQuery', true)
const dbLink = "mongodb+srv://pacebook:test31415@cluster0.y7amop4.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbLink,{useNewURLParser: true, useUnifiedTopology: true}).then(()=>console.log("connected to database"));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  const upload = multer({ storage: storage })
  
  app.post('/', upload.single('image'), (req, res) => {
    console.log("adding item");
    const { name, description, price, image,stock,catalogNum,category } = req.body;
    
    try {
        const item = new Item({
            name: name,
            description: description,
            price: price,
            image: {
                data: fs.readFileSync(path.join('./uploads/' + req.file.originalname))
            },
            category: category,
            catalogNum: catalogNum,
            stock: stock,
        }).save();
    } catch (err) {
        console.log(err);
    }
});
app.delete('/editor/delete/:id',async(req,res)=>{
  let catalogNum = req.params.id;
  Item.deleteOne({catalogNum:catalogNum}).then(
    ()=>{
      console.log("deleted");
    }
  ).catch((error)=>{
    console.log(error);
  })

})


app.put('/editor/update', upload.single('image'), async(req, res) => {
  let id=null;
  try {
    const object = await Item.findOne({catalogNum:req.body.catalogNum}); 
    id = object._id;
  }
  catch (err) {
    console.log(err);
  }
  try {
    let item = await Item.findById(id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    item.name = req.body.name;
    item.description = req.body.description;
    item.price = req.body.price;
    item.stock = req.body.stock;
    item.catalogNum = req.body.catalogNum;
    item.category = req.body.category;
    if (req.file) {
      item.image.data = fs.readFileSync(path.join('./uploads/' + req.file.originalname));
    }
    await item.save();
    res.json(item);
    //console.log(item);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});
app.get('/editor/:id', async (req, res) => {
  const catalogNum=req.params.id;
  console.log(catalogNum);
  //console.log("test search");
  try {
      const object = await Item.findOne({catalogNum:catalogNum}); 
      res.json(object); 
      console.log(object)
    } catch (err) {
      console.error(err);
    }
});
  
app.get('/products', async (req, res) => {
  //console.log("products")
    try {
        const objects = await Item.find(); 
        res.json(objects); 
      } catch (err) {
        console.error(err);
      }
});
app.get('/products/:id', async (req, res) => {
  const id=req.params.id;
  //console.log("test");
  try {
   
      const object = await Item.findById(id); 
      res.json(object); 
      //console.log(object)
    } catch (err) {
      console.error(err);
    }
});
app.get('/products/type/:category',async(req,res)=>{
  try {
    let category = req.params.category;
    const objects = await Item.find({category:category}); 
    res.json(objects); 
  } catch (err) {
    console.error(err);
  }
});
app.listen(8000,()=>{
    console.log("server is running on 8000")
})