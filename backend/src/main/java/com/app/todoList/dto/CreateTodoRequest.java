package com.app.todoList.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateTodoRequest(
        @NotBlank(message = "Tiêu đề không được để trống.")
        @Size(max = 255, message = "Tiêu đề không được quá 255 ký tự.")
        String title,

        Boolean completed) {
}
