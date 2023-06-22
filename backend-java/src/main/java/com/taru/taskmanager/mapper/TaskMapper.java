package com.taru.taskmanager.mapper;

import com.taru.taskmanager.dto.TaskDTO;
import com.taru.taskmanager.models.Task;

public class TaskMapper {

    public static TaskDTO mapToDto(Task task) {

        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .build();
    }

    public static Task mapToEntity(TaskDTO taskDTO) {

        return Task.builder()
                .id(taskDTO.getId())
                .title(taskDTO.getTitle())
                .description(taskDTO.getDescription())
                .priority(taskDTO.getPriority())
                .build();
    }
}
