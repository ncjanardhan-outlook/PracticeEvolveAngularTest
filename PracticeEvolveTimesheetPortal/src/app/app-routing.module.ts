import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetEntryComponent } from './modules/timesheets/components/timesheet-entry/timesheet-entry.component';

const routes: Routes = [
  // { path: 'timesheets', loadChildren: 'app/modules/timesheets/timesheets.module.ts#TimesheetsModule'}
  // { path: 'timesheets', loadChildren: '@practiceEvolve/modules/timesheets/timesheets.module.ts#TimesheetsModule' }
  { path: 'timesheetentry', component: TimesheetEntryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
