import React from 'react'
import { ToastContainer } from 'react-toastify';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import Contact from './components/Contact/Contact';
import Villas from './components/Villa/Villas';
import SingleVilla from './components/Villa/SingleVilla';
import TermsAndConditions from './components/TermsAndConditions/TermsAndConditions';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import './styles/toastify-overrides.css';


const App = () => {
  return (
    <>
      <ToastContainer position="top-right" style={{
        fontSize: '12px'
      }} autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/termsandconditions' element={<TermsAndConditions/>}/>
          <Route path='/villas' element={<Villas/>}/>
          <Route path='/villa/:id' element={<SingleVilla/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App