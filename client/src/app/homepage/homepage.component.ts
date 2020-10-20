import { Component, OnInit } from '@angular/core';
import { ApiService } from '../utility/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public userName = '';
  public loading = true;
  public userMessage = '';
  public messages = [];
  public loadedComments = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
    this.fetchComments();
  }

  fetchComments() {
    this.api.getComments().subscribe((result) => {
      this.messages = result;
      this.loading = false;
    });
  }

  postComment() {
    if (!this.userMessage || (this.userMessage).trim() == '') {
      this.userMessage = '';
      return;
    }
    this.loading = true;
    this.api.postComment({
      data: this.userMessage,
      isComment: false,
      user: this.userName
    }).subscribe((result => {
      this.userMessage = '';
      this.fetchComments();
    }))
  }


}
