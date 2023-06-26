package com.taru.taskmanager.controller;

import com.taru.taskmanager.dto.StoryDTO;
import com.taru.taskmanager.dto.TaskDTO;
import com.taru.taskmanager.service.StatusTasksService;
import com.taru.taskmanager.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    private final TaskService taskService;
    private final StatusTasksService statusTasksService;

    public TaskController(TaskService taskService, StatusTasksService statusTasksService) {
        this.taskService = taskService;
        this.statusTasksService = statusTasksService;
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/task")
    public ResponseEntity<TaskDTO> createTask(
            @RequestBody TaskDTO taskDTO,
            @RequestParam(value = "storyId") int storyId
    ) {

        TaskDTO response = taskService.createTask(storyId, taskDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/task/{id}")
    public ResponseEntity<TaskDTO> updateTaskById(
            @RequestBody TaskDTO taskDTO,
            @PathVariable("id") int taskId
    ) {

        TaskDTO response = taskService.updateTaskById(taskId, taskDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/task/{taskId}/updateStatus/{statusId}")
    public ResponseEntity<String> updateTaskStatusByTaskId(
            @PathVariable("taskId") int taskId,
            @PathVariable("statusId") int statusId
    ) {

        statusTasksService.updateTaskStatusByTaskId(taskId, statusId);

        return new ResponseEntity<>(
                "Status in task with id = " + taskId + " - was updated to = " + statusId,
                HttpStatus.OK);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/task/{taskId}/assign/{userId}")
    public ResponseEntity<String> assignUserToTask(
            @PathVariable("taskId") int taskId,
            @PathVariable("userId") int userId
    ) {

        taskService.setUserToTaskByTaskId(taskId, userId);

        return new ResponseEntity<>(
                "User with id = " + userId + " assigned to task with id = " + taskId,
                HttpStatus.OK
        );
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable("id") int taskId) {

        TaskDTO response = taskService.getTaskById(taskId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/task")
    public ResponseEntity<List<TaskDTO>> getAllTasks() {

        List<TaskDTO> response = taskService.getAllTasks();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/{id}/task")
    public ResponseEntity<List<TaskDTO>> getAllTasksByUserId(@PathVariable("id") int userId) {

        List<TaskDTO> response = taskService.getAllTasksByUserId(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/story/{id}/task")
    public ResponseEntity<List<TaskDTO>> getAllTasksByStoryId(@PathVariable("id") int storyId) {

        List<TaskDTO> response = taskService.getAllTasksByStoryId(storyId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @DeleteMapping("/task/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") int taskId) {

        taskService.deleteTaskById(taskId);

        return new ResponseEntity<>("Deleted task with id = " + taskId, HttpStatus.OK);
    }
}