import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hotel } from './hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  public hotels: Hotel[] = [
    {
      id: 1,
      name: 'Hotel A',
      address: '123 Street, City',
      contactInfo: '123-456-7890',
    },
    {
      id: 2,
      name: 'Hotel B',
      address: '456 Avenue, Town',
      contactInfo: '456-789-0123',
    },
    {
      id: 3,
      name: 'Hotel C',
      address: '789 Road, Village',
      contactInfo: '789-012-3456',
    },
  ];

  constructor() {}

  getAllHotels(): Observable<Hotel[]> {
    return of(this.hotels);
  }
}
