
import { Component, OnInit } from '@angular/core';
import { PostsInterface } from '../../shared/posts.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  posts!: PostsInterface[];
  apiUrl: string = `https://jsonplaceholder.typicode.com/posts`
  selectedId!: PostsInterface

  ngOnInit(): void {
    this.getData()
  }

  constructor(private http: HttpClient) { }

  getData() {
    this.http.get<PostsInterface[]>(this.apiUrl).subscribe({
      next: (resp) => {
        this.posts = resp;
      },
      complete: () => { },
      error: (err) => { console.log(err) }
    })
  }

  postData() {
    const newPost = {
      userId: 100,
      title: 'POST TEST TITLE',
      body: 'POST TEST BODY'
    }

    this.http.post(this.apiUrl, newPost).subscribe({
      next: (resp) => {
        this.posts.push(resp as PostsInterface)
      }
    })
    this.getData()
  }

  editData(post: PostsInterface) {
    const updatedData = {
      title: 'PUT TEST TITLE',
      body: 'PUT TEST BODY'
    }

    this.http.put<PostsInterface[]>(`${this.apiUrl}/${post.id}`, updatedData).subscribe({
      next: () => {
        this.posts = this.posts.map(el => el.id === post.id ? { ...el, ...updatedData } : el);
      }
    })

    this.getData()
  }


  deleteData(post: PostsInterface) {
    this.http.delete<PostsInterface[]>(`${this.apiUrl}/${post.id}`).subscribe({
      next: () => {
        this.posts = this.posts.filter(el => el.id !== post.id);
      },
    })
    this.getData()
  }



}
