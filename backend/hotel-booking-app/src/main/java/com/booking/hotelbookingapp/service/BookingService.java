package com.booking.hotelbookingapp.service;

import com.booking.hotelbookingapp.model.BookedRoom;

import java.util.List;

public interface BookingService {
    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getAllBookings();
}
