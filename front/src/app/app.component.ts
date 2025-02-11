import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { Todo, TodoList } from '../types/prismaTypes';
import { TodoListsComponent } from './todo-lists/todo-lists.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TodoTaskComponent,
    CreateTodoComponent,
    TodoListsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  tasks: Todo[] = [];
  todoLists: TodoList[] = [];
  selectedListId = signal<number | null>(null);

  onSelectList(listId: number) {
    this.selectedListId.set(listId);
  }

  onListDeleted(listId: number) {
    this.todoLists = this.todoLists.filter((l) => l.id !== listId);
    if (this.selectedListId() === listId) {
      this.selectedListId.set(this.todoLists?.[0]?.id);
    }

    fetch(`http://localhost:3000/todoList/${listId}`, {
      method: 'DELETE',
    });
  }

  onListCreated(newList: TodoList) {
    console.log('newList', newList);
    this.todoLists = [...this.todoLists, newList];
  }

  onNewTask(newTask: Todo) {
    this.tasks.push(newTask);
  }

  onRemoveTask(task: Todo) {
    console.log('onRemoveTask task', task);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  constructor() {
    effect(async () => {
      if (!!this.selectedListId()) {
        const res = await fetch(
          `http://localhost:3000/todos/${this.selectedListId()}`
        );
        const data = await res.json();
        this.tasks = data;
      }
    });

    effect(async () => {
      const res = await fetch('http://localhost:3000/todoLists');
      const data = await res.json();
      this.todoLists = data;
      this.selectedListId.set(data?.[0]?.id);
    });
  }
}
