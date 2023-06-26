package com.taru.taskmanager.controller;

import com.taru.taskmanager.dto.ProjectDTO;
import com.taru.taskmanager.dto.StoryDTO;
import com.taru.taskmanager.service.StoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StoryController {

    private final StoryService storyService;

    public StoryController(StoryService storyService) {
        this.storyService = storyService;
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/story")
    public ResponseEntity<StoryDTO> createStory(
            @RequestBody StoryDTO storyDTO,
            @RequestParam(value = "projectId") int projectId
    ) {

        StoryDTO response = storyService.createStory(projectId, storyDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/story/{id}")
    public ResponseEntity<StoryDTO> updateStoryById(
            @RequestBody StoryDTO storyDTO,
            @PathVariable("id") int storyId
    ) {

        StoryDTO response = storyService.updateStoryById(storyId, storyDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/story/{id}")
    public ResponseEntity<StoryDTO> getStoryById(@PathVariable("id") int storyId) {

        StoryDTO response = storyService.getStoryById(storyId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/story")
    public ResponseEntity<List<StoryDTO>> getAllStories() {

        List<StoryDTO> response = storyService.getAllStories();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/project/{id}/story")
    public ResponseEntity<List<StoryDTO>> getAllStoriesByProjectId(@PathVariable("id") int projectId) {

        List<StoryDTO> response = storyService.getAllStoriesByProjectId(projectId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    @DeleteMapping("/story/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") int storyId) {

        storyService.deleteStoryById(storyId);

        return new ResponseEntity<>("Deleted story with id = " + storyId, HttpStatus.OK);
    }
}