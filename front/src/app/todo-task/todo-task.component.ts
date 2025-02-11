import { Component, input, output } from '@angular/core';
import { Todo } from '../../types/prismaTypes';

@Component({
  selector: 'app-todo-task',
  imports: [],
  templateUrl: './todo-task.component.html',
  styleUrl: './todo-task.component.css',
})
export class TodoTaskComponent {
  task = input.required<Todo>();
  removeTodo = output<Todo>();

  toogleTask() {
    this.task().completed = !this.task().completed;
    fetch(`http://localhost:3000/todo/${this.task().id}`, {
      method: 'put',
      body: JSON.stringify({ completed: this.task().completed }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteTask(task: Todo) {
    this.removeTodo.emit(task);
    try {
      fetch(`http://localhost:3000/todo/${task.id}`, { method: 'delete' });
    } catch (error) {
      //TODO Toast and rerender optmistic task delete
    }
  }
}
