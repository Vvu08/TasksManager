package com.taru.taskmanager.service;

import com.taru.taskmanager.dto.UserDTO;

public interface UserService {

    Boolean existsByUsername(String username);

    UserDTO createUser(UserDTO user);

    UserDTO updateUserById(int userId, UserDTO user);

    UserDTO getUserById(int userId);

    void deleteUserById(int userId);
}
