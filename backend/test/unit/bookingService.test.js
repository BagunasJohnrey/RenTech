import { describe, it, expect, vi, beforeEach } from 'vitest';
import bookingService from '../../service/booking.service.js';
import bookingModel from '../../model/booking.model.js';

vi.mock('../../model/booking.model.js', () => {
  return {
    default: {
      find: vi.fn(),
      create: vi.fn(),
    },
  };
});

describe('Booking Service Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getBookings', () => {
    it('should retrieve a list of bookings successfully', async () => {
      const mockData = [{ id: 'BK-123456', full_name: 'Alice', item_name: 'Gown A' }];
      bookingModel.find.mockResolvedValue(mockData);

      const result = await bookingService.getBookings();

      expect(bookingModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });

    it('should throw an error if the database query fails', async () => {
      const mockError = new Error('Database query failure');
      bookingModel.find.mockRejectedValue(mockError);

      await expect(bookingService.getBookings())
        .rejects
        .toThrow('Database query failure');
    });
  });

  describe('createBooking', () => {
    const validBookingPayload = {
      full_name: 'Bob',
      phone_number: '09998887777',
      rental_date: '2026-07-15',
      size_selected: 'L',
      payment_method: 'GCash',
      item_name: 'Emerald Silk Evening Gown',
      total_price: 4500,
      booking_type: 'Me'
    };

    describe('Validation rules', () => {
      it('should throw an error if customer name is not provided', async () => {
        const payload = { ...validBookingPayload };
        delete payload.full_name;

        await expect(bookingService.createBooking(payload))
          .rejects
          .toThrow(/Invalid customer name or missing fields/i);
      });

      it('should throw an error if phone number is empty', async () => {
        const payload = { ...validBookingPayload, phone_number: '' };

        await expect(bookingService.createBooking(payload))
          .rejects
          .toThrow(/Invalid phone number/i);
      });

      it('should throw an error if the phone number is not 11 digits', async () => {
        const payload = { ...validBookingPayload, phone_number: '12345' };

        await expect(bookingService.createBooking(payload))
          .rejects
          .toThrow(/Invalid phone number/i);
      });

      it('should throw an error if payment method is empty', async () => {
        const payload = { ...validBookingPayload, payment_method: '' };

        await expect(bookingService.createBooking(payload))
          .rejects
          .toThrow(/Invalid payment method/i);
      });
    });

    describe('Database insertion', () => {
      it('should successfully pass data to model layer when payload is valid', async () => {
        bookingModel.create.mockResolvedValue(validBookingPayload);

        const result = await bookingService.createBooking(validBookingPayload);

        expect(bookingModel.create).toHaveBeenCalledWith(validBookingPayload);
        expect(result).toEqual(validBookingPayload);
      });
    });
  });
});