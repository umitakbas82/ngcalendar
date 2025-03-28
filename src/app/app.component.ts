import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from "./calendar/calendar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngcalendar';
  meetings = {
    '2024-03-07': ['Dring Coffee', 'Learn React', 'Sleep'],
    '2024-03-08': ['Dring Coffee', 'Learn Angular', 'Sleep'],
  };
}
