package com.taru.taskmanager.service;

import com.taru.taskmanager.dto.UserDTO;

import java.util.List;

public interface UserService {

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    UserDTO createUser(UserDTO user);

    UserDTO updateUserById(int userId, UserDTO user);

    UserDTO getUserById(int userId);

    List<UserDTO> getAllUsers();

    List<UserDTO> getUsersByProjectId(int projectId);

    void deleteUserById(int userId);
}
