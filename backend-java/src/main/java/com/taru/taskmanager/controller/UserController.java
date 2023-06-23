package com.taru.taskmanager.controller;

import com.taru.taskmanager.dto.UserDTO;
import com.taru.taskmanager.service.UserRoleService;
import com.taru.taskmanager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final UserRoleService userRoleService;

    public UserController(UserService userService, UserRoleService userRoleService) {
        this.userService = userService;
        this.userRoleService = userRoleService;
    }

    @PostMapping("/user/create")
    public ResponseEntity<String> createUser(@RequestBody UserDTO userDTO) {

        if (userService.existsByUsername(userDTO.getUsername())) {
            return new ResponseEntity<>("Username is taken!", HttpStatus.BAD_REQUEST);
        } else if (userService.existsByEmail(userDTO.getEmail())) {
            return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
        }

        userService.createUser(userDTO);

        return new ResponseEntity<>("User registered!", HttpStatus.CREATED);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") int userId) {

        UserDTO response = userService.getUserById(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/user/{id}/update")
    public ResponseEntity<UserDTO> updateUserById(@RequestBody UserDTO userDTO, @PathVariable("id") int userId) {

        UserDTO response = userService.updateUserById(userId, userDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/user/{id}/updateRole")
    public ResponseEntity<UserDTO> updateUserRoleByUserId(
            @PathVariable("id") int userId,
            @RequestParam(value = "newRoleId", defaultValue = "1") int newRoleId
    ) {

        userRoleService.updateUserRoleByUserId(userId, newRoleId);

        UserDTO response = userService.getUserById(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/user/{id}/delete")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") int userId) {

        userService.deleteUserById(userId);

        return new ResponseEntity<>("Deleted user with id = " + userId, HttpStatus.OK);
    }
}