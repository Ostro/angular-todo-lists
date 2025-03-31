import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListService } from '../../services/todoLists.service';
import { CommonModule } from '@angular/common';
import { TodoList } from '../../../types/prismaTypes';

@Component({
  selector: 'TodoLists',
  imports: [FormsModule, CommonModule],
  templateUrl: './TodoLists.component.html',
  styleUrl: './TodoLists.component.css',
})
export class TodoListsComponent {
  todoListService = inject(TodoListService);
  newListTitle = signal<string>('');

  constructor() {
    this.todoListService.fetchLists();
  }

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
