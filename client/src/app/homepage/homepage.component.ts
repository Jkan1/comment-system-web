import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../utility/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @Output() logout = new EventEmitter()
  public userName = '';
  public replyTo = '';
  public editMessage = '';
  public loading = true;
  public isReply = false;
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
      console.log(result);
    });
  }

  postComment(deleted?) {
    if (!this.userMessage || (this.userMessage).trim() == '') {
      this.userMessage = '';
      return;
    }
    let data = {
      data: this.userMessage,
      isComment: false,
      user: this.userName
    };
    if (this.isReply) {
      data.isComment = true;
      data['threadId'] = this.replyTo;
    } else if (this.editMessage) {
      data['id'] = this.editMessage;
      if (deleted) {
        data['isDeleted'] = true;
      }
    }
    this.loading = true;
    this.api.postComment(data).subscribe((result => {
      this.userMessage = '';
      this.replyTo = '';
      this.editMessage = '';
      this.isReply = false;
      this.fetchComments();
    }))
  }

  onLogout() {
    this.userMessage = '';
    this.replyTo = '';
    this.editMessage = '';
    this.isReply = false;
    this.userName = '';
    localStorage.removeItem('username');
    this.logout.emit(true);
  }

}
