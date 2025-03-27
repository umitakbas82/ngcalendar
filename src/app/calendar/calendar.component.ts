import { Component, InputSignal, Signal, WritableSignal, computed, input, signal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { Meetings } from './meeetings.interface';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

  meetings:InputSignal<Meetings>=input.required();
  today: Signal<DateTime>=signal(DateTime.local());

  fistDayOfActiveMonth: WritableSignal<DateTime>=signal(
    this.today().startOf('month'),
  );

  activeDay:WritableSignal<DateTime | null>=signal(null);
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

  DATE_MED=DateTime.DATE_MED;
  activateDayMeetings:Signal<string[]>=computed (()=>{
    const activeDay=this.activeDay();
    if(activeDay===null){
      return[]
    }
    const activeDayISO=activeDay.toISODate()


    if(!activeDayISO){
      return[];
    }
    return this.meetings()[activeDayISO]??[];
  })
  constructor(){
    console.log(this.daysOfMonth())
  }

}
