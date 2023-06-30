package com.taru.taskmanager.controller;

import com.taru.taskmanager.dto.UserDTO;
import com.taru.taskmanager.service.UserRoleService;
import com.taru.taskmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final UserRoleService userRoleService;

    public UserController(UserService userService, UserRoleService userRoleService) {
        this.userService = userService;
        this.userRoleService = userRoleService;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") int userId) {

        UserDTO response = userService.getUserById(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<UserDTO>> getAllUsers() {

        List<UserDTO> response = userService.getAllUsers();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/project/{id}/users")
    public ResponseEntity<List<UserDTO>> getAllUsersByProjectId(@PathVariable("id") int projectId) {

        List<UserDTO> response = userService.getUsersByProjectId(projectId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/user/{id}")
    public ResponseEntity<UserDTO> updateUserById(@RequestBody UserDTO userDTO, @PathVariable("id") int userId) {

        UserDTO response = userService.updateUserById(userId, userDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/user/{id}/updateRole")
    public ResponseEntity<UserDTO> updateUserRoleByUserId(
            @PathVariable("id") int userId,
            @RequestParam(value = "newRoleId", defaultValue = "1") int newRoleId
    ) {

        userRoleService.updateUserRoleByUserId(userId, newRoleId);

        UserDTO response = userService.getUserById(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") int userId) {

        userService.deleteUserById(userId);

        return new ResponseEntity<>("Deleted user with id = " + userId, HttpStatus.OK);
    }
}