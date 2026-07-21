import { validateRequest } from '../middleware/requestValidator.js';
import * as bookingController from '../controller/bookingController.js';

export function registerBookingRoutes(router) {
  router.get('/bookings', bookingController.getBookings);

  router.get('/bookings/:id', bookingController.getBookingById);

  router.post(
    '/bookings',
    bookingController.createBooking
  );

  router.patch(
    '/bookings/:id/status',
    validateRequest([
      { name: 'status', type: 'string', required: true },
    ]),
    bookingController.updateBookingStatus
  );
}