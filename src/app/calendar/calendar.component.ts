import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  today: Signal<DateTime>=signal(DateTime.local());

  fistDayOfActiveMonth: WritableSignal<DateTime>=signal(
    this.today().startOf('month'),

  );

  weekDays:Signal<string[]>=signal(Info.weekdays('short'));
  daysOfMonth:Signal<DateTime[]>=computed(()=>{
    return Interval.fromDateTimes(
      this.fistDayOfActiveMonth().startOf('week'),
      this.fistDayOfActiveMonth().endOf('month').endOf('week'),

    ).splitBy({day:1}).map(d=>{

      if(d.start===null){
        throw new Error('Wrong Dates');
      }

      return d.start;
    })
  });


  constructor(){
    console.log(this.daysOfMonth())
  }

}
