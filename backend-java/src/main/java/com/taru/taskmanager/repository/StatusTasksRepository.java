package com.taru.taskmanager.repository;

import com.taru.taskmanager.models.StatusTasks;
import com.taru.taskmanager.models.StatusTasksId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StatusTasksRepository extends JpaRepository<StatusTasks, StatusTasksId> {

    Optional<StatusTasks> findByTaskId(Integer taskId);
}
