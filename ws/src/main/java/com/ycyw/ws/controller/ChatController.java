package com.ycyw.ws.controller;

import com.ycyw.ws.model.ChatMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ChatController.class);

    @MessageMapping("/send") // messages envoyé sur /app/send
    @SendTo("/topic/messages") // messages écoutés sur /topic/messages
    public ChatMessage sendMessage(ChatMessage message) {

    	LOGGER.info("[{}] [{}] {}",
    			message.timestamp(),
    			message.sender(),
    			message.content());

        return message;
    }
}