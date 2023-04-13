import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

interface MessageResponse {
  message: string;
}

@Component({
  selector: 'app-message-component',
  templateUrl: './message-component.component.html',
  styleUrls: ['./message-component.component.css']
})
export class MessageComponentComponent implements OnInit {
  message: string = '';

  constructor(public apiService: ApiService) { }

  ngOnInit() {

    this.apiService.sayHello().subscribe(response => {
      this.message = JSON.stringify(response);
    });    

  }
}
