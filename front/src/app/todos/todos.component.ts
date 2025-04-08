import { Component, inject } from '@angular/core';
import { TodoTaskComponent } from './TodoTask/TodoTask.component';
import { CreateTodoComponent } from './CreateTodo/CreateTodo.component';
import { TodoListsComponent } from './TodoLists/TodoLists.component';
import { TodoListService } from '../services/todoLists.service';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-todos',
  imports: [
    CommonModule,
    TodoTaskComponent,
    CreateTodoComponent,
    TodoListsComponent,
    DividerModule,
  ],
  templateUrl: './todos.component.html',
})
export class TodosComponent {
  todoListService = inject(TodoListService);
}
