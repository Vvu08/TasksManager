package com.taru.taskmanager.controller;

import com.taru.taskmanager.dto.StatusDTO;
import com.taru.taskmanager.service.StatusService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StatusController {

    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<StatusDTO> getStatusById(@PathVariable("id") int statusId) {

        StatusDTO response = statusService.getStatusById(statusId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/task/{id}/status")
    public ResponseEntity<StatusDTO> getStatusByTaskId(@PathVariable("id") int taskId) {

        StatusDTO response = statusService.getStatusByTaskId(taskId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/status")
    public ResponseEntity<List<StatusDTO>> getAllStatuses() {

        List<StatusDTO> response = statusService.getAllStatuses();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}