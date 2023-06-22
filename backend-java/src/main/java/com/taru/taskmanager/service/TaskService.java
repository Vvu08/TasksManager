package com.taru.taskmanager.service;

import com.taru.taskmanager.dto.TaskDTO;

import java.util.List;

public interface TaskService {

    TaskDTO createTask(int storyId, TaskDTO taskDTO);

    TaskDTO updateTaskById(int taskId, TaskDTO taskDTO);

    void setUserToTaskByTaskId(int taskId, int userId);

    TaskDTO getTaskById(int taskId);

    List<TaskDTO> getAllTasks();

    List<TaskDTO> getAllTasksByUserId(int userId);

    List<TaskDTO> getAllTasksByStoryId(int storyId);

    void deleteTaskById(int taskId);
}
