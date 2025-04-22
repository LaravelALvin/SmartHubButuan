import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
//import Services from './pages/unused/Services'
//import Packages from './pages/unused/Packages'
//import Destination from './pages/unused/Destination'
//import Booking from './pages/unused/Booking'
//import Team from './pages/unused/Team'
//import Testimonial from './pages/unused/Testimonial'
import Error from './pages/Error'
//import Contact from './pages/unused/Contact'
import Admin from './pages/Admin'
import FoodAndDining from './pages/FoodAndDining'
import HotelAndLodging from './pages/HotelAndLodging'
import MedicalServices from './pages/MedicalServices'
import PublicTransportation from './pages/PublicTransportation'
import Education from './pages/Education'
import EmergencyServices from './pages/EmergencyServices'
import GovernmentServices from './pages/GovernmentServices'
import Search from './pages/Search'
import ViewContent from "./pages/ViewContent";

export default function App() {
  return (
    <div>
        <Header />
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/error' element={<Error/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='Food-and-Dining' element={<FoodAndDining/>}/>
        <Route path='Hotel-and-Lodging' element={<HotelAndLodging/>}/>
        <Route path='Medical-Services' element={<MedicalServices/>}/>
        <Route path='Public-Transportation' element={<PublicTransportation/>}/>
        <Route path='Education' element={<Education/>}/>
        <Route path='Emergency-Services' element={<EmergencyServices/>}/>
        <Route path='Government-Services' element={<GovernmentServices/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path="/view/:name" element={<ViewContent />} />
        <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
    </div>
  )
}
