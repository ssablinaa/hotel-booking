import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from './hotel';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  public rooms: Room[] = [
    {
      id: 1,
      type: 'Базовый',
      beds: 1,
      price: 100,
      available: true,
      hotelId: 1,
    },
    {
      id: 2,
      type: 'Средний',
      beds: 2,
      price: 150,
      available: true,
      hotelId: 2,
    },
    {
      id: 3,
      type: 'Люкс',
      beds: 3,
      price: 250,
      available: true,
      hotelId: 3,
    },
  ];
  constructor() {}

  getAllRooms(): Observable<Room[]> {
    return of(this.rooms);
  }

  getRoomById(roomId: number): Observable<Room | undefined> {
    return of(this.rooms.find((room) => room.id === roomId));
  }

  getAvailableRoomsForHotel(hotelId: number): Observable<Room[]> {
    return of(
      this.rooms.filter((room) => room.available && room.hotelId === hotelId)
    );
  }
  getAvailableRooms(hotelId: number): Observable<Room[]> {
    const availableRooms = this.rooms.filter(
      (room) => room.available && room.hotelId === hotelId
    );
    return of(availableRooms);
  }
}
