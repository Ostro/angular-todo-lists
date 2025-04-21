import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Todo, TodoList } from '../../types/prismaTypes';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private http = inject(HttpClient);
  private userService = inject(UserService);

  myLists: TodoList[] = [];
  sharedLists: TodoList[] = [];
  private currentTodoList: Todo[] = [];
  selectedListId = signal<number | null>(null);

  constructor() {
    // fetch todo list items when selected list changes
    effect(() => {
      const newListId = this.selectedListId();
      if (newListId) {
        this.fetchTodos(newListId);
      }
    });

    effect(() => {
      if (this.userService.jwt()) {
        // fetch todo lists when user logs in
        this.fetchLists();
      } else {
        // clear todo lists when user logs out
        this.selectedListId.set(null);
        this.currentTodoList = [];
        this.myLists = [];
        this.sharedLists = [];
      }
    });
  }

  deleteList(listId: number) {
    this.http
      .delete(`http://localhost:3000/todoList/${listId}`)
      .subscribe(() => {
        this.myLists = this.myLists.filter((l) => l.id !== listId);
        if (this.selectedListId() === listId) {
          this.selectedListId.set(
            this?.myLists?.[0]?.id || this?.sharedLists?.[0]?.id
          );
        }
      });
  }

  createList(title: string) {
    this.http
      .post<TodoList>('http://localhost:3000/todoList', { title })
      .subscribe((data) => {
        this.myLists = [...this.myLists, data];
        this.selectedListId.set(data.id);
      });
  }

  fetchLists() {
    this.http
      .get<{ myLists: TodoList[]; sharedLists: TodoList[] }>(
        'http://localhost:3000/todoLists'
      )
      .subscribe((data) => {
        this.myLists = data.myLists;
        this.sharedLists = data.sharedLists;
        this.selectedListId.set(
          data?.myLists?.[0]?.id || data?.sharedLists?.[0]?.id
        );
      });
    return this.myLists;
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
