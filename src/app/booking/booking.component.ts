import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../hotel';
import { Room } from '../hotel';
import { Hotel } from '../hotel';
import { BookingService } from '../booking.service';
import { RoomService } from '../room.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [HotelService, RoomService, BookingService],
})
export class BookingComponent implements OnInit {
  newBookingForm: FormGroup;
  hotels: Hotel[] = [];
  selectedHotel: Hotel | undefined;
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  bookings: Booking[] = [];
  editingBooking: Booking | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private roomService: RoomService,
    private bookingService: BookingService
  ) {
    this.newBookingForm = this.formBuilder.group({
      hotelId: ['', Validators.required],
      roomId: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllHotels();
    this.getAllRooms();
    this.getAllBookings();
  }

  getAllHotels(): void {
    this.hotelService.getAllHotels().subscribe((hotels) => {
      this.hotels = hotels;
    });
  }

  getAllRooms(): void {
    this.roomService.getAllRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  getAllBookings(): void {
    this.bookingService.getAllBookings().subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  filterRoomsByHotel(hotelId: number): Room[] {
    for (let r in this.rooms) {
      if (this.rooms[r].hotelId == hotelId) {
        this.filteredRooms.push(this.rooms[r]);
      }
      console.log(this.rooms[r]);
    }
    return this.filteredRooms;
  }

  onHotelChange(): void {
    const selectedHotelId = this.newBookingForm.value.hotelId;
    this.filteredRooms = [];

    // Обновляем список отфильтрованных комнат для выбранного отеля
    this.filteredRooms = this.filterRoomsByHotel(selectedHotelId);
  }

  createBooking(): void {
    if (this.newBookingForm.valid) {
      const newBooking: Booking = {
        id: 0,
        clientId: 1,
        hotelId: this.newBookingForm.value.hotelId,
        roomId: this.newBookingForm.value.roomId,
        checkInDate: this.newBookingForm.value.checkInDate,
        checkOutDate: this.newBookingForm.value.checkOutDate,
        status: 'Забронировано',
      };

      this.bookingService
        .createBooking(newBooking)
        .subscribe((createdBooking) => {
          console.log('Booking created successfully:', this.bookings);
          this.newBookingForm.reset();
        });
    }
  }

  updateBooking(booking: Booking): void {
    this.bookingService.updateBooking(booking).subscribe((success) => {
      if (success) {
        console.log('Booking updated successfully');
        this.getAllBookings();
      } else {
        console.error('Failed to update booking');
      }
    });
  }

  deleteBooking(bookingId: number): void {
    this.bookingService
      .deleteBooking(bookingId)
      .subscribe((deleted: boolean) => {
        if (deleted) {
          console.log('Бронирование успешно удалено');
        } else {
          console.log('Бронирование не найдено');
        }
      });
  }

  editBooking(booking: Booking): void {
    this.editingBooking = booking;
    this.newBookingForm.patchValue({
      hotelId: booking.hotelId,
      roomId: booking.roomId,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
    });
    //this.filteredRooms = this.filterRoomsByHotel(booking.hotelId);
  }

  saveBooking(): void {
    if (this.newBookingForm.valid && this.editingBooking) {
      this.editingBooking.hotelId = this.newBookingForm.value.hotelId;
      this.editingBooking.roomId = this.newBookingForm.value.roomId;
      this.editingBooking.checkInDate = this.newBookingForm.value.checkInDate;
      this.editingBooking.checkOutDate = this.newBookingForm.value.checkOutDate;
      this.updateBooking(this.editingBooking);
      this.editingBooking = null;
      this.newBookingForm.reset();
    }
  }

  cancelEdit(): void {
    this.editingBooking = null;
    this.newBookingForm.reset();
  }
}
