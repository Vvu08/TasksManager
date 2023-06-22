package com.taru.taskmanager.repository;

import com.taru.taskmanager.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByUserId(Integer userId);
    List<Task> findByStoryId(Integer storyId);
}
