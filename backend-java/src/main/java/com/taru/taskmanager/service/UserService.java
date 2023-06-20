package com.taru.taskmanager.service;

import com.taru.taskmanager.dto.ProjectDTO;
import com.taru.taskmanager.dto.UserDTO;

import java.util.List;

public interface UserService {

    Boolean existsByUsername(String username);

    UserDTO createUser(UserDTO user);

    UserDTO updateUserById(int userId, UserDTO user);

    UserDTO getUserById(int userId);

    List<ProjectDTO> getProjectsByUserId(int userId);

    void deleteUserById(int userId);
}
