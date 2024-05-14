import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from './hotel';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = [];

  constructor() {}

  getAllBookings(): Observable<Booking[]> {
    return of(this.bookings);
  }

  createBooking(newBooking: Booking): Observable<Booking> {
    const nextId = this.getNextId(); // Получаем следующий доступный идентификатор
    newBooking.id = nextId;
    this.bookings.push(newBooking);
    return of(newBooking);
  }

  updateBooking(updatedBooking: Booking): Observable<boolean> {
    const index = this.bookings.findIndex((b) => b.id === updatedBooking.id);
    if (index !== -1) {
      this.bookings[index] = updatedBooking;
      return of(true); // Успешно обновлено
    }
    return of(false); // Бронирование не найдено
  }

  deleteBooking(bookingId: number): Observable<boolean> {
    const index = this.bookings.findIndex((b) => b.id === bookingId);
    if (index !== -1) {
      this.bookings.splice(index, 1);
      return of(true); // Успешно удалено
    }
    return of(false); // Бронирование не найдено
  }

  private getNextId(): number {
    const maxId = this.bookings.reduce(
      (max, booking) => (booking.id > max ? booking.id : max),
      0
    );
    return maxId + 1;
  }
}
