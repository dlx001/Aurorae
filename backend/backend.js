const express=require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const {Item} = require('./models/item.js');
const User = require('./models/User.js')
const app =express();
const fs= require('fs');
const path=require('path');
const dotenv=require('dotenv').config();
var multer = require('multer');
mongoose.set('strictQuery', true)


const dbLink = process.env.MONGODB_URI;
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
  

  /*
  * create new item
  */
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
/*
*delete item via editor
*/
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

/*
*update item via editor
*/
app.put('/editor/update', upload.single('image'), async(req, res) => {
  let id=null;
  console.log(req.body);
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



/*
*retrieve item for item preview on editor
*/
app.get('/editor/:id', async (req, res) => {
  const catalogNum=req.params.id;
  console.log(catalogNum);
  //console.log("test search");
  try {
      const object = await Item.findOne({catalogNum:catalogNum}); 
      res.json(object); 
      //console.log(object)
    } catch (err) {
      console.error(err);
    }
});
  
/*
* get all items from DB
*/

app.get('/products', async (req, res) => {
  //console.log("products")
    try {
        const objects = await Item.find(); 
        res.json(objects); 
      } catch (err) {
        console.error(err);
      }
});

/*
* get particular item from DB
*/

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

/*
* get all items of specific category type
*/

app.get('/products/type/:category',async(req,res)=>{
  try {
    let category = req.params.category;
    const objects = await Item.find({category:category}); 
    res.json(objects); 
  } catch (err) {
    console.error(err);
  }
});

/*
* creating user and storing cart
*/
app.put('/:user/',async(req,res)=>{
  
  const email = req.params.user;
  let clientCart = req.body.cart;
  if(!clientCart){
    clientCart=[];
  }
  let total=req.body.total;
  if(!total){
    total=0;
  }

  console.log(req.body);
  try {
    let user = await User.findOne({ email: email });
    
    if(user==null){
      user = new User({
        email:email,
        cart:clientCart,
        total:total
      });
      await user.save();
    }else{
      let result = await User.updateOne({ email: email }, { cart: clientCart, total:total });
      //console.log(cart);
    }
  } catch (err) {
    console.log(err);
  }

})

/*
* retrieving user cart info
*/
app.get('/:user/',async(req,res)=>{
  console.log("attempt to get");
  const email = req.params.user;
  try {
    const user = await User.findOne({email:email})
    if(user){
      res.send({cart:user.cart,total:user.total})
    }
   
  } catch (err) {
    console.log(err);
  }

})



app.listen(8000,()=>{
    console.log("server is running on 8000")
})