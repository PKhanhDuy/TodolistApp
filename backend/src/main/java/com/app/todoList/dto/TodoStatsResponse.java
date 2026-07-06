package com.app.todoList.dto;

public record TodoStatsResponse(
        long total,
        long completed) {
}
