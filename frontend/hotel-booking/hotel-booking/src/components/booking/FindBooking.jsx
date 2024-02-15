import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'

const FindBooking = () => {
    const[confirmationCode, setConfirmationCode] = useState("")
    const[error, setError] = useState("")
    const[isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const[isDeleted, setIsDeleted] = useState(false)
    const[bookingInfo, setBookingInfo] = useState({
        id: "",
        room: {id:""},
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    })

    const clearBookingInfo = {
        id: "",
        room: {id:""},
        bookingConfirmationCode: "",
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: ""
    }

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value)
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
        } catch (error) {
            setBookingInfo(clearBookingInfo)
            if(error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const handleBookingCancellation = async(bookingId) => {
        try {
          await cancelBooking(bookingInfo.bookingId);
          setIsDeleted(true);
          setSuccessMessage("Booking has been cancelled successfully!");
          setBookingInfo(clearBookingInfo);
          setConfirmationCode("");
          setError(null);
        } catch(error) {
            setError(error.message)
        }

        setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
    }

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content align-items-center">
        <h2 className="text-center mb-4">Find my booking</h2>
        <form onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              className="form-control"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Enter your booking confirmation code"
            />
            <button className="btn btn-hotel input-group-text">
              Find booking
            </button>
          </div>
        </form>

        {isLoading ? (
          <div>Searching...</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Booking information</h3>
            <p>Confirmation code: {bookingInfo.bookingConfirmationCode}</p>
            <p>Booking ID: {bookingInfo.bookingId}</p>
            <p>Room number: {bookingInfo.roomResponse.id}</p>
            <p>Check-in date: {bookingInfo.checkInDate}</p>
            <p>Check-out date: {bookingInfo.checkOutDate}</p>
            <p>Full name: {bookingInfo.guestFullName}</p>
            <p>Email: {bookingInfo.guestEmail}</p>
            <p>Adults: {bookingInfo.numOfAdults}</p>
            <p>Children: {bookingInfo.numOfChildren}</p>
            <p>Total guests: {bookingInfo.totalNumOfGuests}</p>

            {!isDeleted && (
              <button
                className="btn btn-danger"
                onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
              >
                Cancel booking
              </button>
            )}
          </div>
        ) : (
          <div></div>
        )}

        {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
      </div>
    </>
  );
}

export default FindBooking