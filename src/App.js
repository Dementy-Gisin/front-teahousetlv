import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import SubCategories from './components/SubCategories/SubCategories';
import SubCategory from './components/SubCategories/SubCategory';
import OneProduct from './components/Product/OneProduct';
import Registration from './components/Users/Registration';
import AccountVerification from './components/Users/AccountVerification';
import { ToastContainer, Zoom } from  "react-toastify";
import UserProfile from './components/Users/UserProfile';
import Cart from './components/Cart/Cart';
import UserNavBar from './components/NavBars/UserNavBar';
import Details from './components/Details';
import MapScreen from './components/MapScreen';
import SendEmail from './components/Users/SendEmail';
import Chat from './components/Chat/Chat';
import Event from './components/Events/Event';
import Footer from './components/Footer/Footer';
import OneChoice from './components/Choice/OneChoice';
import React from 'react';

function App() {
 
  return (
    <BrowserRouter>
      <React.StrictMode>
    <UserNavBar/>
    
     <ToastContainer draggable={false} transition={Zoom} autoClose={10000}/>
     
      <Routes>
        
          <Route exact path='/' element={<Main />}/>
          {/* <Route element={<NavBar/>}/> */}
          <Route exact path='/api/user/register' element={<Registration />} />
          <Route exact path='/details' element={<Details/>}/>
          <Route exact path='/map' element={<MapScreen/>}/>
          <Route exact path='/api/user/verify-account/:token' element={<AccountVerification />}/>
          <Route exact path='/api/user/profile/:id' element={<UserProfile />}/>
          <Route exact path='/api/emails/send-email' element={<SendEmail/>} />
          <Route exact path='/chat' element={<Chat/>} />
          <Route exact path='/api/choice/fetch-choice/:id' element={<OneChoice/>}/>
          <Route exact path='/api/events/fetch-event/:id' element={<Event/>}/>
          <Route exact path='/api/category/fetch-category/:id' element={<SubCategories />}/>
          <Route exact path='/api/subcategories/fetch-subcategory/:id' element={<SubCategory />}/>
          <Route exact path='/api/basket/fetch-basket/:id' element={<Cart />}/>
          <Route exact path='/api/product/fetch-one-product/:id' element={<OneProduct />}/>
      </Routes> 
      <Footer/>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
