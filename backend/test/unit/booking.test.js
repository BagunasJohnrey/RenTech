import { describe, it, expect, vi } from 'vitest';
import bookingService from '../../service/booking.service';
import bookingModel from '../../model/booking.model';

vi.mock('../../model/booking.model', () => {
  return {
    default: {
      find: vi.fn(),
      create: vi.fn(),
    },
  };
});

describe('Booking Service', () => {

  describe('Get Bookings', () => {
    it('should read a booking from the list', async () => {
      bookingModel.find.mockResolvedValue([
        { full_name: 'Alice', phone_number: '09998887777' }
      ]);

      const result = await bookingService.getBookings();
      
      expect(result.length).toBe(1);
      expect(result[0].full_name).toBe('Alice');
    });
  });

  describe('Create Booking', () => {
    
    describe('Check input validation', () => {
      const validPhone = '09998887777';

      it('should throw an error if customer name is not provided', async () => {
        await expect(bookingService.createBooking({ phone_number: validPhone, payment_method: 'GCash' }))
          .rejects
          .toThrow(/Invalid customer name or missing fields/i);
      });

      it('should throw an error if phone number is empty', async () => {
        await expect(bookingService.createBooking({ full_name: 'Bob', phone_number: '', payment_method: 'GCash' }))
          .rejects
          .toThrow(/Invalid phone number/i);
      });

      it('should throw an error if the phone number is not 11 digits', async () => {
        await expect(bookingService.createBooking({ full_name: 'Bob', phone_number: '12345', payment_method: 'GCash' }))
          .rejects
          .toThrow(/Invalid phone number/i);
      });

      it('should throw an error if payment method is empty', async () => {
        await expect(bookingService.createBooking({ full_name: 'Bob', phone_number: validPhone, payment_method: '' }))
          .rejects
          .toThrow(/Invalid payment method/i);
      });
    });

    describe('Successful creation', () => {
      it('should add a new booking successfully if all inputs are valid', async () => {
        const newBooking = { 
          full_name: 'Bob', 
          phone_number: '09998887777', 
          rental_date: '2026-07-15', 
          size_selected: 'L', 
          payment_method: 'GCash' 
        };

        bookingModel.create.mockResolvedValue(newBooking);

        const result = await bookingService.createBooking(newBooking);

        expect(result.full_name).toBe('Bob');
        expect(result.payment_method).toBe('GCash'); 
      });
    });

  });

});