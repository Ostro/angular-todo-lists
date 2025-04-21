import { Component, inject, input } from '@angular/core';
import { Todo } from '../../../types/prismaTypes';
import { TodoListService } from '../../services/todoLists.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'TodoTask',
  imports: [
    ButtonModule,
    CheckboxModule,
    FormsModule,
    AvatarModule,
    TooltipModule,
  ],
  templateUrl: './TodoTask.component.html',
})
export class TodoTaskComponent {
  todo = input.required<Todo>();
  todoListService = inject(TodoListService);
  userService = inject(UserService);

  completeTodo() {
    this.todoListService.completeTodo(!this.todo().completed, this.todo().id);
  }
}
