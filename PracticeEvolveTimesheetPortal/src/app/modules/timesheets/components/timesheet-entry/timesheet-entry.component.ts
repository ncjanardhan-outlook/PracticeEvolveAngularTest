import { Component, OnInit } from '@angular/core';
import { TimesheetEntry } from 'src/app/models/timesheet-entry';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-timesheet-entry',
  templateUrl: './timesheet-entry.component.html',
  styleUrls: ['./timesheet-entry.component.scss']
})
export class TimesheetEntryComponent implements OnInit {

  public existingTimesheetEntries: TimesheetEntry[] = [];
  public timeSheetEntriesFormGroup: FormGroup;
  public defaultHourlyRate: number;

  constructor(private _formBuilder: FormBuilder) {
   
  }

  ngOnInit() {
    this.timeSheetEntriesFormGroup = this._formBuilder.group({
      timesheetEntries: this._formBuilder.array([], [Validators.required])
    })

    this.existingTimesheetEntries.forEach((item) => {
      ((this.timeSheetEntriesFormGroup.controls['timesheetEntries'] as FormArray).push(this._formBuilder.group({
        durationInHours: [item.durationInHours, Validators.required],
        durationInMinutes: [item.durationInMinutes, Validators.required],
        title: [item.title, Validators.required],
        state: [item.state, Validators.required],
        total: [item.total],
        type: [item.type],
        hourlyRate: [item.hourlyRate, Validators.required],
        entryId: [item.entryId]
      })));
    });
  }

  onNew() {
    let newEntry = new TimesheetEntry();
    newEntry.entryId = 0;
    newEntry.duration = 0;
    newEntry.durationInHours = 0;
    newEntry.durationInMinutes = 0;
    newEntry.hourlyRate = this.defaultHourlyRate;
    newEntry.state = 'New';
    newEntry.title = '';
    newEntry.total = 0;
    newEntry.type = '';

    this.existingTimesheetEntries.splice(0, 0, newEntry);

    ((this.timeSheetEntriesFormGroup.controls['timesheetEntries'] as FormArray).insert(0, this._formBuilder.group({
      durationInHours: [0, Validators.required],
      durationInMinutes: [0, Validators.required],
      title: [newEntry.title, Validators.required],
      state: [newEntry.state, Validators.required],
      total: [newEntry.total],
      type: [newEntry.type],
      hourlyRate: [newEntry.hourlyRate, Validators.required],
      entryId: [newEntry.entryId]
    })));
  }

  onSubmit() {
    console.log("Submit - this.timeSheetEntriesFormGroup", this.timeSheetEntriesFormGroup.value);

    this.existingTimesheetEntries.forEach((item) =>{
      item.state = 'Submitted';
    });

    //call service method to post to server
  }

  onSaveItem(rowIndex: number) {
    let entry = this.existingTimesheetEntries[rowIndex];

    entry.hourlyRate = (this.timeSheetEntriesFormGroup.controls['timesheetEntries'] as FormArray).at(rowIndex).get('hourlyRate').value;
    entry.durationInHours = (this.timeSheetEntriesFormGroup.controls['timesheetEntries'] as FormArray).at(rowIndex).get('durationInHours').value;
    entry.durationInMinutes = (this.timeSheetEntriesFormGroup.controls['timesheetEntries'] as FormArray).at(rowIndex).get('durationInMinutes').value;
    entry.title = (this.timeSheetEntriesFormGroup.controls['timesheetEntries'] as FormArray).at(rowIndex).get('title').value;
    entry.type = (this.timeSheetEntriesFormGroup.controls['timesheetEntries'] as FormArray).at(rowIndex).get('type').value;

    let totalDurationInMinutes = (entry.durationInHours * 60) + entry.durationInMinutes;

    //round off to the next nearest 15-minute period
    totalDurationInMinutes = totalDurationInMinutes + (totalDurationInMinutes % 15);

    entry.total = totalDurationInMinutes * (entry.hourlyRate / 60);
 
    entry.state = 'Active';
  }

  onDeleteItem(rowIndex: number) {
    this.existingTimesheetEntries.splice(rowIndex, 1);

    ((this.timeSheetEntriesFormGroup.controls['timesheetEntries'] as FormArray).removeAt(rowIndex));
  }

  onCancelItem(rowIndex: number) {
    if (this.existingTimesheetEntries[rowIndex].state == 'Edited') {
      this.existingTimesheetEntries[rowIndex].state = 'Active';
    }

    if (this.existingTimesheetEntries[rowIndex].state == 'New') {
      this.existingTimesheetEntries.splice(rowIndex, 1);

      ((this.timeSheetEntriesFormGroup.controls['timesheetEntries'] as FormArray).removeAt(rowIndex));
    }
  }

  onEditItem(rowIndex: number) {
    this.existingTimesheetEntries[rowIndex].state = 'Edited';
  }

  doesNewEntryExist() {
    return this.existingTimesheetEntries.some((item) => item.state == 'New');
  }

  isAnyRowBeingEdited() {
    return this.existingTimesheetEntries.some((item) => item.state == 'Edited' || item.state == 'New');
  }
}
