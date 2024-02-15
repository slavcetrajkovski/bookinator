import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AddRoom from "./components/room/AddRoom"
import ExistingRooms from './components/room/ExistingRooms'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom'
import Home from './components/home/Home'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import Checkout from './components/booking/Checkout'
import BookingSuccess from './components/booking/BookingSuccess'

function App() {
  return (
    <>
    <main>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/edit-room/:roomId" element={<EditRoom />}/>
          <Route path="/existing-rooms" element={<ExistingRooms />}/>
          <Route path="/add-room" element={<AddRoom />}/>
          <Route path="/book-room/:roomId" element={<Checkout />}/>
          <Route path="/browse-all-rooms" element={<RoomListing />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/booking-success" element={<BookingSuccess />}/>
        </Routes>
      </Router>
      <Footer />
    </main>
    </>
  )
}

export default App
