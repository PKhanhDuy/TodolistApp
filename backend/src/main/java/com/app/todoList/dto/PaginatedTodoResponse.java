package com.app.todoList.dto;

import java.util.List;

public record PaginatedTodoResponse(
        List<TodoResponse> content,
        int page,
        int size,
        long totalElements,
        int totalPages) {
}
