import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Editor from './components/Editor'
import ProductFinal from './components/ProductsFinal'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'
import ProductTypeFinal from './components/ProductTypeFinal'
import About from './components/About'
import { cartContext } from './Context/Context'
import { TotalContext } from './Context/TotalContext'
import Contact from './components/Contact'
import React, { createContext, useEffect, useState } from 'react';


const App = () => {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

 
  return (
    <cartContext.Provider value={{cart, setCart}}>
      <TotalContext.Provider value={{total, setTotal}}>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/editor' element={<Editor></Editor>}></Route>
          <Route path='/products' element={<ProductFinal></ProductFinal>}></Route>
          <Route path='/product/:id' element={<ProductPage/>}></Route>
          <Route path='/product/type/:id' element={<ProductTypeFinal></ProductTypeFinal>}></Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='/About' element={<About></About>}></Route>
          <Route path='/Contact' element={<Contact></Contact>}></Route>
        </Routes>
      </TotalContext.Provider>
    </cartContext.Provider>
  );
};

export default App;


