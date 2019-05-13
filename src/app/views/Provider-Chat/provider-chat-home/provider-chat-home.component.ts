import { Component, OnInit } from '@angular/core';
//---------------------------
// Router
//---------------------------
import { Router }                     from '@angular/router';
import { ActivatedRoute }             from '@angular/router';

@Component({
  selector: 'app-provider-chat-home',
  templateUrl: './provider-chat-home.component.html',
  styleUrls: ['./provider-chat-home.component.css']
})
export class ProviderChatHomeComponent implements OnInit {

  constructor(
    private rt                   : Router,
    private activeroute          : ActivatedRoute
  ) { }

  ngOnInit() {
    let visitID = localStorage.getItem('VisitId'); //this.activeroute.snapshot.paramMap.get('id');
    
    
    this.rt.navigate([`/home/provider-chat/provider-chat-tab/`,visitID]);
    //this.rt.navigate([`/home/provider-chat/${userId}/provider-chat-tab/`,userId])
  }

}
