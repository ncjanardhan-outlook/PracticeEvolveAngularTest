import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetsRoutingModule } from './timesheets-routing.module';
import { TimesheetEntryComponent } from './components/timesheet-entry/timesheet-entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TimesheetEntryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimesheetsRoutingModule
  ]
})
export class TimesheetsModule { }
