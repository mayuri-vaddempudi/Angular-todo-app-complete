import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../data-type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://json-api-uhll.onrender.com/todos';

  constructor(private http:HttpClient){}
  getTodos(){
    return this.http.get<Todo[]>(this.apiUrl);
  }
  addTodo(todo:Todo){
    return this.http.post<Todo>(this.apiUrl, todo)
  }
  updateTodo(todo:Todo){
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo)
  }
  deleteTodo(id:string){
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`)
  }
  getById(id: string) {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }
}
