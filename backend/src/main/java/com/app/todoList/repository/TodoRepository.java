package com.app.todoList.repository;

import com.app.todoList.entity.Todo;
import com.app.todoList.entity.User;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    Optional<Todo> findByIdAndUser(Long id, User user);

    long countByUser(User user);

    long countByUserAndCompleted(User user, boolean completed);

    @Query(
            value = """
                    SELECT t FROM Todo t
                    WHERE t.user = :user
                    AND (:searchPattern IS NULL OR t.title ILIKE :searchPattern)
                    AND (:completed IS NULL OR t.completed = :completed)
                    """,
            countQuery = """
                    SELECT COUNT(t) FROM Todo t
                    WHERE t.user = :user
                    AND (:searchPattern IS NULL OR t.title ILIKE :searchPattern)
                    AND (:completed IS NULL OR t.completed = :completed)
                    """)
    Page<Todo> findByUserWithFilters(
            @Param("user") User user,
            @Param("searchPattern") String searchPattern,
            @Param("completed") Boolean completed,
            Pageable pageable);
}
