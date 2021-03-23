import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog, Comment } from '@blog-workspace/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  readonly url = 'http://localhost:3333/api/blog';

  constructor(private http: HttpClient) { }
  

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.url}/${id}`);
  }

}
