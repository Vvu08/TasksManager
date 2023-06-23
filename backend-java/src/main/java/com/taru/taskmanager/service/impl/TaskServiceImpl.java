package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.TaskDTO;
import com.taru.taskmanager.mapper.StatusMapper;
import com.taru.taskmanager.mapper.TaskMapper;
import com.taru.taskmanager.models.*;
import com.taru.taskmanager.repository.*;
import com.taru.taskmanager.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;
    private final StatusTasksRepository statusTasksRepository;

    public TaskServiceImpl(TaskRepository taskRepository, StoryRepository storyRepository, UserRepository userRepository, StatusRepository statusRepository, StatusTasksRepository statusTasksRepository) {
        this.taskRepository = taskRepository;
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
        this.statusRepository = statusRepository;
        this.statusTasksRepository = statusTasksRepository;
    }

    @Override
    public TaskDTO createTask(int storyId, TaskDTO taskDTO) {

        Task task = TaskMapper.mapToEntity(taskDTO);
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new RuntimeException("text")/*new StoryNotFoundException("Story with id = " + storyId + " - not found!")*/);

        task.setStory(story);
        task = taskRepository.save(task);

        Status status = statusRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("text")/*new StatusNotFoundException("Status with id = " + statusId + " - not found!")*/);
        statusTasksRepository.save(
                new StatusTasks(
                        new StatusTasksId(task.getId(), status.getId()),
                        task,
                        status
                ));

        TaskDTO result = TaskMapper.mapToDto(task);
        result.setStatus(StatusMapper.mapToDto(status));

        return result;
    }

    @Override
    public TaskDTO updateTaskById(int taskId, TaskDTO taskDTO) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("text")/*new TaskNotFoundException("Task with id = " + taskId + " - not found!")*/);

        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setPriority(taskDTO.getPriority());

        Task updatedTask = taskRepository.save(task);

        TaskDTO result = TaskMapper.mapToDto(updatedTask);
        result.setStatus(StatusMapper.mapToDto(statusTasksRepository.findByTaskId(updatedTask.getId()).get().getStatus()));

        return result;
    }

    @Override
    public void setUserToTaskByTaskId(int taskId, int userId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("text")/*new TaskNotFoundException("Task with id = " + taskId + " - not found!")*/);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("text")/*new UserNotFoundException("User with id = " + userId + " - not found!")*/);

        task.setUser(user);
        taskRepository.save(task);
    }

    @Override
    public TaskDTO getTaskById(int taskId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("text")/*new TaskNotFoundException("Task with id = " + taskId + " - not found!")*/);

        TaskDTO result = TaskMapper.mapToDto(task);
        result.setStatus(StatusMapper.mapToDto(statusTasksRepository.findByTaskId(task.getId()).get().getStatus()));

        return result;
    }

    @Override
    public List<TaskDTO> getAllTasks() {

        List<Task> tasks = taskRepository.findAll();

        return tasks.stream()
                .map(task -> {
                    TaskDTO result = TaskMapper.mapToDto(task);
                    result.setStatus(StatusMapper.mapToDto(statusTasksRepository.findByTaskId(task.getId()).get().getStatus()));
                    return result;
                })
                .toList();
    }

    @Override
    public List<TaskDTO> getAllTasksByUserId(int userId) {

        List<Task> tasks = taskRepository.findByUserId(userId);

        return tasks.stream()
                .map(task -> {
                    TaskDTO result = TaskMapper.mapToDto(task);
                    result.setStatus(StatusMapper.mapToDto(statusTasksRepository.findByTaskId(task.getId()).get().getStatus()));
                    return result;
                })
                .toList();
    }

    @Override
    public List<TaskDTO> getAllTasksByStoryId(int storyId) {

        List<Task> tasks = taskRepository.findByStoryId(storyId);

        return tasks.stream()
                .map(task -> {
                    TaskDTO result = TaskMapper.mapToDto(task);
                    result.setStatus(StatusMapper.mapToDto(statusTasksRepository.findByTaskId(task.getId()).get().getStatus()));
                    return result;
                })
                .toList();
    }

    @Override
    public void deleteTaskById(int taskId) {

        taskRepository.deleteById(taskId);
    }
}
