export interface IBooking {
  _id: string;
  userName?: string;
  email?: string;
  name: string;
  country?: string;
  category?: string;
  price: string | number;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  bookingDate?: string;
  /** Optional until the API persists a booking status. */
  status?: "confirmed" | "pending" | "cancelled" | string;
}
