export interface Hotel {
  id: number;
  name: string;
  address: string;
  contactInfo: string;
}
export interface Room {
  id: number;
  type: string;
  beds: number;
  price: number;
  available: boolean;
  hotelId: number;
}

export interface Booking {
  id: number;
  clientId: number;
  hotelId: number;
  roomId: number;
  checkInDate: Date;
  checkOutDate: Date;
  status: 'Забронировано' | 'Отменено';
}
