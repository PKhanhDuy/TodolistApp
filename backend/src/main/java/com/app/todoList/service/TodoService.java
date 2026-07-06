package com.app.todoList.service;

import com.app.todoList.dto.CreateTodoRequest;
import com.app.todoList.dto.PaginatedTodoResponse;
import com.app.todoList.dto.TodoResponse;
import com.app.todoList.dto.TodoStatsResponse;
import com.app.todoList.dto.UpdateTodoRequest;
import com.app.todoList.entity.Todo;
import com.app.todoList.entity.User;
import com.app.todoList.exception.ResourceNotFoundException;
import com.app.todoList.repository.TodoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodoService {

    public static final int DEFAULT_PAGE_SIZE = 7;

    private final TodoRepository todoRepository;
    private final CurrentUserService currentUserService;

    public TodoService(TodoRepository todoRepository, CurrentUserService currentUserService) {
        this.todoRepository = todoRepository;
        this.currentUserService = currentUserService;
    }

    @Transactional(readOnly = true)
    public PaginatedTodoResponse findAll(
            String search, Boolean completed, int page, int size, String sortBy, String sortDir) {
        User user = currentUserService.getCurrentUser();
        String searchPattern = (search == null || search.isBlank()) ? null : "%" + search.trim() + "%";
        int safePage = Math.max(page, 0);
        int safeSize = size > 0 ? size : DEFAULT_PAGE_SIZE;
        Sort sort = resolveSort(sortBy, sortDir);

        Page<Todo> result = todoRepository.findByUserWithFilters(
                user,
                searchPattern,
                completed,
                PageRequest.of(safePage, safeSize, sort));

        return new PaginatedTodoResponse(
                result.getContent().stream().map(TodoResponse::from).toList(),
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages());
    }

    @Transactional(readOnly = true)
    public TodoStatsResponse getStats() {
        User user = currentUserService.getCurrentUser();
        long total = todoRepository.countByUser(user);
        long completed = todoRepository.countByUserAndCompleted(user, true);
        return new TodoStatsResponse(total, completed);
    }

    @Transactional(readOnly = true)
    public TodoResponse findById(Long id) {
        return TodoResponse.from(getTodoOrThrow(id));
    }

    @Transactional
    public TodoResponse create(CreateTodoRequest request) {
        User user = currentUserService.getCurrentUser();
        Todo todo = Todo.builder()
                .title(request.title())
                .completed(Boolean.TRUE.equals(request.completed()))
                .user(user)
                .build();
        return TodoResponse.from(todoRepository.save(todo));
    }

    @Transactional
    public TodoResponse update(Long id, UpdateTodoRequest request) {
        Todo todo = getTodoOrThrow(id);
        todo.setTitle(request.title());
        todo.setCompleted(request.completed());
        return TodoResponse.from(todoRepository.save(todo));
    }

    @Transactional
    public TodoResponse toggle(Long id) {
        Todo todo = getTodoOrThrow(id);
        todo.setCompleted(!todo.isCompleted());
        return TodoResponse.from(todoRepository.save(todo));
    }

    @Transactional
    public void delete(Long id) {
        Todo todo = getTodoOrThrow(id);
        todoRepository.delete(todo);
    }

    private Todo getTodoOrThrow(Long id) {
        User user = currentUserService.getCurrentUser();
        return todoRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy việc cần làm với id = " + id));
    }

    private Sort resolveSort(String sortBy, String sortDir) {
        boolean ascending = "asc".equalsIgnoreCase(sortDir);
        String field = sortBy == null ? "createdAt" : sortBy.trim();

        if ("title".equalsIgnoreCase(field)) {
            return ascending ? Sort.by("title").ascending() : Sort.by("title").descending();
        }

        return ascending ? Sort.by("createdAt").ascending() : Sort.by("createdAt").descending();
    }
}
