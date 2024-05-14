import { Routes } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { RoomComponent } from './room/room.component';
import { BookingComponent } from './booking/booking.component';

export const routes: Routes = [
  { path: 'hotel', component: HotelComponent },
  { path: 'room', component: RoomComponent },
  { path: 'booking', component: BookingComponent },
];
