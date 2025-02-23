import { Component, inject } from '@angular/core';
import { TodoTaskComponent } from './TodoTask/TodoTask.component';
import { CreateTodoComponent } from './CreateTodo/CreateTodo.component';
import { TodoListsComponent } from './TodoLists/TodoLists.component';
import { TodoListService } from '../services/todoLists.service';

@Component({
  selector: 'app-todos',
  imports: [TodoTaskComponent, CreateTodoComponent, TodoListsComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  todoListService = inject(TodoListService);
}
