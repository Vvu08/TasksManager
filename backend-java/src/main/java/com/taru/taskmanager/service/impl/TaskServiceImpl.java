package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.TaskDTO;
import com.taru.taskmanager.mapper.TaskMapper;
import com.taru.taskmanager.models.Story;
import com.taru.taskmanager.models.Task;
import com.taru.taskmanager.models.User;
import com.taru.taskmanager.repository.StatusTaskRepository;
import com.taru.taskmanager.repository.StoryRepository;
import com.taru.taskmanager.repository.TaskRepository;
import com.taru.taskmanager.repository.UserRepository;
import com.taru.taskmanager.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private final StatusTaskRepository statusTaskRepository;

    public TaskServiceImpl(TaskRepository taskRepository, StoryRepository storyRepository, UserRepository userRepository, StatusTaskRepository statusTaskRepository) {
        this.taskRepository = taskRepository;
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
        this.statusTaskRepository = statusTaskRepository;
    }

    @Override
    public TaskDTO createTask(int storyId, TaskDTO taskDTO) {

        Task task = TaskMapper.mapToEntity(taskDTO);
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new RuntimeException("text")/*new StoryNotFoundException("Story with id = " + storyId + " - not found!")*/);

        task.setStory(story);
        task = taskRepository.save(task);

        return TaskMapper.mapToDto(task);
    }

    @Override
    public TaskDTO updateTaskById(int taskId, TaskDTO taskDTO) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("text")/*new TaskNotFoundException("Task with id = " + taskId + " - not found!")*/);

        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setPriority(taskDTO.getPriority());

        Task updatedTask = taskRepository.save(task);

        return TaskMapper.mapToDto(updatedTask);
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

        return TaskMapper.mapToDto(task);
    }

    @Override
    public List<TaskDTO> getAllTasks() {

        List<Task> tasks = taskRepository.findAll();

        return tasks.stream()
                .map(TaskMapper::mapToDto)
                .toList();
    }

    @Override
    public List<TaskDTO> getAllTasksByUserId(int userId) {

        List<Task> tasks = taskRepository.findByUserId(userId);

        return tasks.stream()
                .map(TaskMapper::mapToDto)
                .toList();
    }

    @Override
    public List<TaskDTO> getAllTasksByStoryId(int storyId) {

        List<Task> tasks = taskRepository.findByStoryId(storyId);

        return tasks.stream()
                .map(TaskMapper::mapToDto)
                .toList();
    }

    @Override
    public void deleteTaskById(int taskId) {

        taskRepository.deleteById(taskId);
    }
}
