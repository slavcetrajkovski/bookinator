import { parseISO } from 'date-fns'
import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider'

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
    console.log(bookingInfo)
    const[filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if(startDate && endDate){
          filtered = bookingInfo.filter((booking) => {
            const bookingStartDate = parseISO(booking.checkInDate);
            const bookingEndDate = parseISO(booking.checkOutDate);
            return (
              bookingStartDate >= startDate &&
              bookingEndDate <= endDate &&
              bookingEndDate > startDate
            );
          });
        }
        setFilteredBookings(filtered)
    }


    useEffect(() => {
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

  return (
    <section className="p-4">
      <DateSlider
        onDateChange={filterBookings}
        onFilterChange={filterBookings}
      />

      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Guests</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking?.bookingId}</td>
              <td>{booking?.roomResponse?.id}</td>
              <td>{booking?.roomResponse?.roomType}</td>
              <td>{booking?.checkInDate}</td>
              <td>{booking?.checkOutDate}</td>
              <td>{booking?.guestFullName}</td>
              <td>{booking?.guestEmail}</td>
              <td>{booking?.numOfAdults}</td>
              <td>{booking?.numOfChildren}</td>
              <td>{booking?.totalNumOfGuests}</td>
              <td>{booking?.bookingConfirmationCode}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBookingCancellation(booking?.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filterBookings.length === 0 && (
        <p>No bookings found for the selected dates</p>
      )}
    </section>
  );
}

export default BookingsTable;