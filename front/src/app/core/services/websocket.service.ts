import { Injectable, NgZone } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject } from 'rxjs';

import { ChatMessage } from '../../models/chat-message';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    private client!: Client;

    private readonly messageSubject =
        new Subject<ChatMessage>();

    readonly messages$ =
        this.messageSubject.asObservable();

    constructor(
        private readonly ngZone: NgZone
    ) {
    }

    connect(): void {

        if (this.client?.connected) {
            return;
        }

        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            debug: (message: string) => {
                console.log(message);
            }
        });

        this.client.onConnect = () => {

            console.log('WebSocket connecté');

            this.client.subscribe(
                '/topic/messages',
                (message: IMessage) => {

                    const chatMessage =
                        JSON.parse(message.body) as ChatMessage;

                    this.ngZone.run(() => {
                        this.messageSubject.next(chatMessage);
                    });
                }
            );
        };

        this.client.activate();
    }

    send(message: ChatMessage): void {

        this.client.publish({
            destination: '/app/send',
            body: JSON.stringify(message)
        });
    }
}