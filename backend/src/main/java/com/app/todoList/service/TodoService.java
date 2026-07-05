package com.app.todoList.service;

import com.app.todoList.dto.CreateTodoRequest;
import com.app.todoList.dto.TodoResponse;
import com.app.todoList.dto.UpdateTodoRequest;
import com.app.todoList.entity.Todo;
import com.app.todoList.exception.ResourceNotFoundException;
import com.app.todoList.repository.TodoRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Transactional(readOnly = true)
    public List<TodoResponse> findAll() {
        return todoRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(TodoResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TodoResponse findById(Long id) {
        return TodoResponse.from(getTodoOrThrow(id));
    }

    @Transactional
    public TodoResponse create(CreateTodoRequest request) {
        Todo todo = Todo.builder()
                .title(request.title())
                .completed(Boolean.TRUE.equals(request.completed()))
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
        return todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Không tìm thấy việc cần làm với id = " + id));
    }
}
