package com.app.todoList.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UpdateTodoRequest(
        @NotBlank(message = "Tiêu đề không được để trống.")
        @Size(max = 255, message = "Tiêu đề không được quá 255 ký tự.")
        String title,

        @NotNull(message = "Trạng thái không được để trống.")
        Boolean completed) {
}
