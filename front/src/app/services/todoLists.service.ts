import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Todo, TodoList } from '../../types/prismaTypes';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private http = inject(HttpClient);
  private todoLists: TodoList[] = [];
  private currentTodoList: Todo[] = [];
  selectedListId = signal<number | null>(null);

  constructor() {
    // fetch todo lists when selected list changes
    effect(() => {
      const newListId = this.selectedListId();
      if (newListId) {
        this.fetchTodos(newListId);
      }
    });
  }

  //Todo Lists
  getTodoLists() {
    return this.todoLists;
  }

  deleteList(listId: number) {
    this.http
      .delete(`http://localhost:3000/todoList/${listId}`)
      .subscribe(() => {
        this.todoLists = this.todoLists.filter((l) => l.id !== listId);
        if (this.selectedListId() === listId) {
          this.selectedListId.set(this.todoLists?.[0]?.id);
        }
      });
  }

  createList(title: string) {
    this.http
      .post<TodoList>('http://localhost:3000/todoList', { title })
      .subscribe((data) => {
        this.todoLists = [...this.todoLists, data];
        this.selectedListId.set(data.id);
      });
  }

  fetchLists() {
    this.http
      .get<TodoList[]>('http://localhost:3000/todoLists')
      .subscribe((data) => {
        this.todoLists = data;
        this.selectedListId.set(data?.[0]?.id);
      });
    return this.todoLists;
  }

  //Todos
  getTodos() {
    return this.currentTodoList;
  }

  fetchTodos(listId: number) {
    return this.http
      .get<Todo[]>(`http://localhost:3000/todos/${listId}`)
      .subscribe((data) => {
        this.currentTodoList = data;
      });
  }

  createTodo(todoListId: number, description: string) {
    return this.http
      .post<Todo>(`http://localhost:3000/todo/${todoListId}`, {
        description,
      })
      .subscribe((data) => {
        this.currentTodoList = [...this.currentTodoList, data];
      });
  }

  completeTodo(completed: boolean, todoId: number) {
    this.http
      .put<Todo>(`http://localhost:3000/todo/${todoId}`, { completed })
      .subscribe((data) => {
        this.currentTodoList = this.currentTodoList.map((t) =>
          t.id === todoId ? data : t
        );
      });
  }

  deleteTodo(todoId: number) {
    return this.http
      .delete(`http://localhost:3000/todo/${todoId}`)
      .subscribe(() => {
        this.currentTodoList = this.currentTodoList.filter(
          (t) => t.id !== todoId
        );
      });
  }
}
