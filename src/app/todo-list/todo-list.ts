import { Component, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Todo } from '../data-type';
import{TodoService} from "../services/todo";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos = signal <Todo[]>([]);
  filter = signal<'all' | 'active' | 'completed'>('all');
  
  editingId = signal<string | null>(null);
  editInput = new FormControl('', Validators.required);

  todoInput = new FormControl('', Validators.required);

  filteredTodos = computed(() => {
    const all = this.todos();
    const current = this.filter();

    if (current === 'active') return all.filter(t => !t.completed);
    if (current === 'completed') return all.filter(t => t.completed);
    return all;
  });

  constructor(private todoService:TodoService){}

  ngOnInit(){
    this.loadTodos();
  }

  loadTodos(){
    this.todoService.getTodos().subscribe((data)=>{this.todos.set(data)})
  }

  addTodo(){
    if(this.todoInput.invalid)return;

    const newTodo:Todo ={
      title : this.todoInput.value!,
      completed : false
    }
    this.todoService.addTodo(newTodo).subscribe(()=>{
      this.loadTodos();
      this.todoInput.reset();
    })
  }
  toggleComplete(todo: Todo) {
    const updated: Todo = {
      ...todo,
      completed: !todo.completed  // flip true→false or false→true
    };
    this.todoService.updateTodo(updated).subscribe(() => {
      this.loadTodos();
    });
  }
  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }
  setFilter(value: 'all' | 'active' | 'completed') {
    this.filter.set(value);
  }
  startEdit(todo: Todo) {
    this.editingId.set(todo.id!);
    this.editInput.setValue(todo.title);
  }

  // Save the edited todo
  saveEdit(todo: Todo) {
    if (this.editInput.invalid) return;
    const updated: Todo = {
      ...todo,
      title: this.editInput.value!
    };
    this.todoService.updateTodo(updated).subscribe(() => {
      this.loadTodos();
      this.editingId.set(null);  // exit edit mode
    });
  }

  // Cancel editing
  cancelEdit() {
    this.editingId.set(null);
  }

}
