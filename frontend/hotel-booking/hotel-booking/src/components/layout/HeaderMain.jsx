import React from 'react'

const HeaderMain = () => {
  return (
    <header className="header-banner">
      <div className="overlay"></div>
      <div className="animated-texts overlay-content">
        <h1>
          Welcome to <span className="hotel-color">Bookinator</span>
        </h1>
        <h4>Book some of the best quality apartments in town!</h4>
      </div>
    </header>
  );
}

export default HeaderMain