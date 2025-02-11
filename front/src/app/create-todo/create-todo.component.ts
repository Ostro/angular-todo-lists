import { Component, signal, output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../types/prismaTypes';

@Component({
  selector: 'app-create-todo',
  imports: [FormsModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
})
export class CreateTodoComponent {
  addTask = output<Todo>();
  newTodo = signal<string>('');
  listId = input.required<number | null>();

  async onSave() {
    console.log('New Todo:', this.newTodo());
    const res = await fetch(`http://localhost:3000/todo/${this.listId()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        description: this.newTodo(),
      }),
    });
    this.newTodo.set('');
    const data = await res.json();
    this.addTask.emit(data);
  }
}
