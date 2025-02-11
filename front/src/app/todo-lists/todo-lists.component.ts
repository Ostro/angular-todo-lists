import { Component, effect, input, output, signal } from '@angular/core';
import { TodoList } from '../../types/prismaTypes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-lists',
  imports: [FormsModule],
  templateUrl: './todo-lists.component.html',
  styleUrl: './todo-lists.component.css',
})
export class TodoListsComponent {
  todoLists = input<TodoList[]>();
  selectedListId = input<number | null>();
  newListTitle = signal<string>('');
  listClicked = output<number>();
  listCreated = output<TodoList>();
  listDeleted = output<number>();

  async createList() {
    const res = await fetch('http://localhost:3000/todoList', {
      method: 'POST',
      body: JSON.stringify({ title: this.newListTitle() }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('emitting', data);
    this.listCreated.emit(data);
    this.chooseList(data.id);
    this.newListTitle.set('');
  }

  chooseList(id: number) {
    this.listClicked.emit(id);
  }

  deleteList(id: number) {
    this.listDeleted.emit(id);
  }
}
