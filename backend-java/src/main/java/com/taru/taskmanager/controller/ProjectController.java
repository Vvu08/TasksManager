package com.taru.taskmanager.controller;

import com.taru.taskmanager.dto.ProjectDTO;
import com.taru.taskmanager.service.ProjectService;
import com.taru.taskmanager.service.UserProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProjectController {

    private final ProjectService projectService;
    private final UserProjectService userProjectService;

    public ProjectController(ProjectService projectService, UserProjectService userProjectService) {
        this.projectService = projectService;
        this.userProjectService = userProjectService;
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/project")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {

        ProjectDTO response = projectService.createProject(projectDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    @PostMapping("/project/{projectId}/assign/{userId}")
    public ResponseEntity<String> assignUserToProject(
            @PathVariable("projectId") int projectId,
            @PathVariable("userId") int userId
    ) {

        userProjectService.createUserProject(userId, projectId);

        return new ResponseEntity<>(
                "User with id = " + userId + " assigned to project with id = " + projectId,
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/project/{id}")
    public ResponseEntity<ProjectDTO> updateProjectById(
            @RequestBody ProjectDTO projectDTO,
            @PathVariable("id") int projectId
    ) {

        ProjectDTO response = projectService.updateProjectById(projectId, projectDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable("id") int projectId) {

        ProjectDTO response = projectService.getProjectById(projectId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/project")
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {

        List<ProjectDTO> response = projectService.getAllProjects();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/{id}/projects")
    public ResponseEntity<List<ProjectDTO>> getAllProjectsByUserId(@PathVariable("id") int userId) {

        List<ProjectDTO> response = projectService.getProjectsByUserId(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @DeleteMapping("/project/{id}")
    public ResponseEntity<String> deleteProjectById(@PathVariable("id") int projectId) {

        projectService.deleteProjectById(projectId);

        return new ResponseEntity<>("Deleted project with id = " + projectId, HttpStatus.OK);
    }
}