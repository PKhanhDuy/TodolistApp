package com.app.todoList.controller;

import com.app.todoList.dto.CreateTodoRequest;
import com.app.todoList.dto.PaginatedTodoResponse;
import com.app.todoList.dto.TodoResponse;
import com.app.todoList.dto.TodoStatsResponse;
import com.app.todoList.dto.UpdateTodoRequest;
import com.app.todoList.service.TodoService;
import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public PaginatedTodoResponse getAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "7") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        return todoService.findAll(search, completed, page, size, sortBy, sortDir);
    }

    @GetMapping("/stats")
    public TodoStatsResponse getStats() {
        return todoService.getStats();
    }

    @GetMapping("/{id}")
    public TodoResponse getById(@PathVariable Long id) {
        return todoService.findById(id);
    }

    @PostMapping
    public ResponseEntity<TodoResponse> create(@Valid @RequestBody CreateTodoRequest request) {
        TodoResponse created = todoService.create(request);
        URI location = URI.create("/api/todos/" + created.id());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public TodoResponse update(@PathVariable Long id, @Valid @RequestBody UpdateTodoRequest request) {
        return todoService.update(id, request);
    }

    @PatchMapping("/{id}/toggle")
    public TodoResponse toggle(@PathVariable Long id) {
        return todoService.toggle(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        todoService.delete(id);
    }
}
