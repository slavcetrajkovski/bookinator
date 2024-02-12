import React from 'react'
import HeaderMain from '../layout/HeaderMain'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'

const Home = () => {
  return (
    <section>
      <HeaderMain />

      <section className="container">
        <RoomCarousel />
        <HotelService />
        <RoomCarousel />
        <Parallax />
      </section>
    </section>
  );
}

export default Home