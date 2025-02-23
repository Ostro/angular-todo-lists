import { Component, inject, input, output } from '@angular/core';
import { Todo } from '../../../types/prismaTypes';
import { TodoListService } from '../../services/todoLists.service';

@Component({
  selector: 'TodoTask',
  imports: [],
  templateUrl: './TodoTask.component.html',
  styleUrl: './TodoTask.component.css',
})
export class TodoTaskComponent {
  todo = input.required<Todo>();
  removeTodo = output<Todo>();

  todoListService = inject(TodoListService);

  completeTodo() {
    this.todoListService.completeTodo(!this.todo().completed, this.todo().id);
  }
}
