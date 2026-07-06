package com.app.todoList.dto;

public record AuthResponse(
        String token,
        String username) {
}
