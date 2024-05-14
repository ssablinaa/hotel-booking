import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { RoomService } from '../room.service';
import { Hotel } from '../hotel';
import { Room } from '../hotel';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, RoomComponent],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
  hotels: Hotel[] = [];
  selectedHotel: Hotel | undefined;
  rooms: Room[] = [];

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels(): void {
    this.hotelService
      .getAllHotels()
      .subscribe((hotels) => (this.hotels = hotels));
  }

  showRoomsForHotel(hotelId: number): void {
    this.selectedHotel = this.hotels.find((hotel) => hotel.id === hotelId);
    this.roomService
      .getAvailableRoomsForHotel(hotelId)
      .subscribe((rooms) => (this.rooms = rooms));
  }
}
