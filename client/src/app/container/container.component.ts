import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  public userSetup = false;

  constructor() { }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    if (username && username.length >= 3){
      this.userSetup = true;
    }
  }

  onUserSubmit(formValue: { username: string }) {
    localStorage.setItem('username', formValue.username);
    this.userSetup = true;
  }

}
