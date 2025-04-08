import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TodoListService } from '../../services/todoLists.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'CreateTodo',
  imports: [FormsModule, ButtonModule, InputTextModule],
  templateUrl: './CreateTodo.component.html',
})
export class CreateTodoComponent {
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
