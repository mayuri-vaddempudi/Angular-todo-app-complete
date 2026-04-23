import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo';
import { Todo } from '../data-type';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-detail.html',
  styleUrl: './todo-detail.css'
})
export class TodoDetail implements OnInit {
  todo = signal<Todo | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.todoService.getById(id).subscribe((data) => {
        this.todo.set(data);
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}