import { useState } from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AddRoom from "./components/room/AddRoom"
import ExistingRooms from './components/room/ExistingRooms'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom'
import Home from './components/home/Home'

function App() {
  return (
    <>
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/edit-room/:roomId" element={<EditRoom />}/>
          <Route path="/existing-rooms" element={<ExistingRooms />}/>
          <Route path="/add-room" element={<AddRoom />}/>
        </Routes>
      </Router>
    </main>
    </>
  )
}

export default App
