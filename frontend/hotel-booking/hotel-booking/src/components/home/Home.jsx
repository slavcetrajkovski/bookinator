import React from 'react'
import HeaderMain from '../layout/HeaderMain'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCarousel from '../common/RoomCarousel'
import RoomSearch from '../common/RoomSearch'

const Home = () => {
  return (
    <section>
      <HeaderMain />

      <section className="container">
        <RoomSearch />
        <RoomCarousel />
        <HotelService />
        <RoomCarousel />
        <Parallax />
      </section>
    </section>
  );
}

export default Home