package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.ProjectDTO;
import com.taru.taskmanager.dto.UserDTO;
import com.taru.taskmanager.mapper.UserMapper;
import com.taru.taskmanager.models.User;
import com.taru.taskmanager.repository.UserRepository;
import com.taru.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public Boolean existsByUsername(String username) {

        return userRepository.existsByUsername(username);
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {

        User user = UserMapper.mapToEntity(userDTO);
        // TODO security
        // user.setPassword(user.getPassword());
        userRepository.save(user);

        return UserMapper.mapToDto(user);
    }

    @Override
    public UserDTO updateUserById(int userId, UserDTO userDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("text")/*new UserNotFoundException("User with id = " + userId + " - not found!")*/);

        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());

        User updatedUser = userRepository.save(user);

        return UserMapper.mapToDto(updatedUser);
    }

    @Override
    public UserDTO getUserById(int userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("text")/*new UserNotFoundException("User with id = " + userId + " - not found!")*/);

        return UserMapper.mapToDto(user);
    }

    @Override
    public List<ProjectDTO> getProjectsByUserId(int userId) {

        // TODO
        // return list of projects from projects and user_projects tables
        return null;
    }

    @Override
    public void deleteUserById(int userId) {

        userRepository.deleteById(userId);
    }
}
