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
                .story(StoryMapper.mapToDto(task.getStory()))
                .user(UserMapper.mapToDto(task.getUser()))
                .status(StatusMapper.mapToDto(task.getStatus()))
                .build();
    }

    public static Task mapToEntity(TaskDTO taskDTO) {

        return Task.builder()
                .id(taskDTO.getId())
                .title(taskDTO.getTitle())
                .description(taskDTO.getDescription())
                .priority(taskDTO.getPriority())
                .story(StoryMapper.mapToEntity(taskDTO.getStory()))
                .user(UserMapper.mapToEntity(taskDTO.getUser()))
                .status(StatusMapper.mapToEntity(taskDTO.getStatus()))
                .build();
    }
}
