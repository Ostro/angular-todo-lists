import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListService } from '../../services/todoLists.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'TodoLists',
  imports: [FormsModule, CommonModule, ButtonModule, InputTextModule],
  templateUrl: './TodoLists.component.html',
})
export class TodoListsComponent {
  todoListService = inject(TodoListService);
  newListTitle = signal<string>('');

  createList() {
    this.todoListService.createList(this.newListTitle());
    this.newListTitle.set('');
  }

  chooseList(id: number) {
    this.todoListService.selectedListId.set(id);
  }

  deleteList(listId: number) {
    this.todoListService.deleteList(listId);
  }
}
