import { Component, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListService } from '../../services/todoLists.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TodoList } from '../../../types/prismaTypes';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'TodoLists',
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    TooltipModule,
  ],
  templateUrl: './TodoLists.component.html',
})
export class TodoListsComponent {
  todoListService = inject(TodoListService);
  userService = inject(UserService);
  newListTitle = signal<string>('');
  todoList = input<TodoList[]>([]);
  categoryName = input<string>();
  isSharedList = input<boolean>(false);

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
