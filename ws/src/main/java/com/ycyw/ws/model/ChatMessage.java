package com.ycyw.ws.model;

import java.time.Instant;

public record ChatMessage(String sender, String content, Instant timestamp) {}