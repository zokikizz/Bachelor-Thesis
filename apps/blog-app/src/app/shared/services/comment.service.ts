import { ListResponse } from './../../../../../api/src/app/search/intefaces/list-response';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '@blog-workspace/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  readonly url = 'http://localhost:3333/api/comment';
  refreshCommentList = new Subject<void>();

  constructor(private http: HttpClient) { }


  createComment(comment: Comment) {
    return this.http.post(`${this.url}`, { ...comment });
  }

  getComments(blogId: string): Observable<ListResponse<Comment>> {
    return this.http.get<ListResponse<Comment>>(`${this.url}/list/${blogId}`);
  }


  get refreshCommentListObservable(): Observable<void> {
    return this.refreshCommentList.asObservable();
  }
  
  newCommentAddedEvent() {
    this.refreshCommentList.next(null);
  }

  

}
