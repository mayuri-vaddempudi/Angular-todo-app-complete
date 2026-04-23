import { Routes } from '@angular/router';
import { TodoList } from './todo-list/todo-list';
import { TodoDetail } from './todo-detail/todo-detail';

export const routes: Routes = [
    { path: '', component: TodoList },
    { path: 'todo/:id', component: TodoDetail }
];
