import { Component, inject, input } from '@angular/core';
import { Todo } from '../../../types/prismaTypes';
import { TodoListService } from '../../services/todoLists.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'TodoTask',
  imports: [ButtonModule, CheckboxModule, FormsModule],
  templateUrl: './TodoTask.component.html',
})
export class TodoTaskComponent {
  todo = input.required<Todo>();

  todoListService = inject(TodoListService);

  completeTodo() {
    this.todoListService.completeTodo(!this.todo().completed, this.todo().id);
  }
}
