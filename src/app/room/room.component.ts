import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../hotel';
import { RoomService } from '../room.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent implements OnInit {
  @Input() hotelId: number | undefined;
  rooms: Room[] = [];
  private subscription: Subscription | undefined;
  constructor(private roomService: RoomService) {}
  ngOnInit(): void {
    if (this.hotelId) {
      this.subscription = this.roomService
        .getAvailableRoomsForHotel(this.hotelId)
        .subscribe(
          (rooms) => {
            this.rooms = rooms;
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }
}
