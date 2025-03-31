import { Component, signal, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../../types/prismaTypes';
import { TodoListService } from '../../services/todoLists.service';

@Component({
  selector: 'CreateTodo',
  imports: [FormsModule],
  templateUrl: './CreateTodo.component.html',
  styleUrl: './CreateTodo.component.css',
})
export class CreateTodoComponent {
  addTask = output<Todo>();
  newTodo = signal<string>('');

  todoListService = inject(TodoListService);

  async onSave() {
    const listId = this.todoListService.selectedListId();
    if (!listId) {
      return;
    }
    this.todoListService.createTodo(listId, this.newTodo());
    this.newTodo.set('');
  }
}
