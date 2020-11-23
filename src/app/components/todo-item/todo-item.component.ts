import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = new Todo();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  title: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  // Set Dynamic Classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed,
    };
    return classes;
  }

  // Check/Uncheck
  onChecked(todo: any) {
    todo.completed = !todo.completed;
    this.todoService
      .toggleCompletion(todo)
      .subscribe((todo) => console.log(todo));
  }

  // Delete
  onDelete(todo: any) {
    this.deleteTodo.emit(todo);
  }
}
