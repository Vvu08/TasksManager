package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.exception.StatusNotFoundException;
import com.taru.taskmanager.exception.TaskNotFoundException;
import com.taru.taskmanager.models.Status;
import com.taru.taskmanager.models.StatusTasks;
import com.taru.taskmanager.models.StatusTasksId;
import com.taru.taskmanager.models.Task;
import com.taru.taskmanager.repository.StatusRepository;
import com.taru.taskmanager.repository.StatusTasksRepository;
import com.taru.taskmanager.repository.TaskRepository;
import com.taru.taskmanager.service.StatusTasksService;
import org.springframework.stereotype.Service;

@Service
public class StatusTasksServiceImpl implements StatusTasksService {

    private final StatusTasksRepository statusTasksRepository;
    private final TaskRepository taskRepository;
    private final StatusRepository statusRepository;

    public StatusTasksServiceImpl(StatusTasksRepository statusTasksRepository, TaskRepository taskRepository, StatusRepository statusRepository) {
        this.statusTasksRepository = statusTasksRepository;
        this.taskRepository = taskRepository;
        this.statusRepository = statusRepository;
    }

    @Override
    public void updateTaskStatusByTaskId(int taskId, int statusId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task with id = " + taskId + " - not found!"));
        Status status = statusRepository.findById(statusId)
                .orElseThrow(() -> new StatusNotFoundException("Status with id = " + statusId + " - not found!"));

        StatusTasks statusTasks = statusTasksRepository.findByTaskId(taskId)
                .orElseThrow(() -> new RuntimeException("text"));
        statusTasksRepository.deleteById(statusTasks.getId());

        statusTasksRepository.save(new StatusTasks(
                new StatusTasksId(
                        taskId,
                        statusId
                ),
                task,
                status
        ));
    }
}
