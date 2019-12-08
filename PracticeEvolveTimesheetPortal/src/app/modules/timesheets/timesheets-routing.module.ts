import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetEntryComponent } from './components/timesheet-entry/timesheet-entry.component';

const routes: Routes = [
  { path: 'entry', component: TimesheetEntryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetsRoutingModule { }
