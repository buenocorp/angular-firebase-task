import { TaskService } from './../task.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Task } from '../models/task.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  dialogTitle = 'New Task';
  task: Task = { title: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogdRef: MatDialogRef<TaskDialogComponent>,
    private taskService: TaskService) { }

  ngOnInit(): void {
    if (this.data) {
      this.dialogTitle = 'Update Task';
      this.task = this.data.task;
    }
  }

  onSave() {
    const operation: Promise<void> =
      (!this.data) ? this.taskService.create(this.task) : this.taskService.update(this.task);

    operation
      .then(() => {
        this.dialogdRef.close();
      });
  }
}
