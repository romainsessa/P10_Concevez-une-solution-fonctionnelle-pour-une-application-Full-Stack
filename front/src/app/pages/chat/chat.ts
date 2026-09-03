import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { ChatMessage } from '../../models/chat-message';
import { WebsocketService } from '../../core/services/websocket.service';

@Component({
  selector: 'app-chat',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class ChatComponent implements OnInit {

  role = '';
  currentMessage = '';
  messages: ChatMessage[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly websocketService: WebsocketService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

    this.role =
      this.route.snapshot.paramMap.get('role') ?? 'user';

    this.websocketService.connect();

    this.websocketService.messages$
      .subscribe((message: ChatMessage) => {
        console.log('MESSAGE RECU', message);
        this.messages.push(message);
        this.cdr.detectChanges();
      });
  }

  sendMessage(): void {

    if (!this.currentMessage.trim()) {
      return;
    }

    const message: ChatMessage = {
      sender: this.role.toUpperCase(),
      content: this.currentMessage,
      timestamp: new Date().toISOString()
    };

    this.websocketService.send(message);
    this.currentMessage = '';
  }
}