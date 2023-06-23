package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.UserDTO;
import com.taru.taskmanager.mapper.UserMapper;
import com.taru.taskmanager.models.User;
import com.taru.taskmanager.repository.UserRepository;
import com.taru.taskmanager.service.RoleService;
import com.taru.taskmanager.service.UserRoleService;
import com.taru.taskmanager.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserRoleService userRoleService;
    private final RoleService roleService;

    public UserServiceImpl(UserRepository userRepository, UserRoleService userRoleService, RoleService roleService) {
        this.userRepository = userRepository;
        this.userRoleService = userRoleService;
        this.roleService = roleService;
    }

    @Override
    public Boolean existsByUsername(String username) {

        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {

        return userRepository.existsByEmail(email);
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {

        User user = UserMapper.mapToEntity(userDTO);
        // TODO security
        // user.setPassword(user.getPassword());
        user = userRepository.save(user);

        userRoleService.createUserRole(user.getId(), 1);

        UserDTO result = UserMapper.mapToDto(user);
        result.setRole(roleService.getRoleByUserId(user.getId()));

        return result;
    }

    @Override
    public UserDTO updateUserById(int userId, UserDTO userDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("text")/*new UserNotFoundException("User with id = " + userId + " - not found!")*/);

        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setJobTitle(userDTO.getJobTitle());

        User updatedUser = userRepository.save(user);

        UserDTO result = UserMapper.mapToDto(updatedUser);
        result.setRole(roleService.getRoleByUserId(updatedUser.getId()));

        return result;
    }

    @Override
    public UserDTO getUserById(int userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("text")/*new UserNotFoundException("User with id = " + userId + " - not found!")*/);

        UserDTO result = UserMapper.mapToDto(user);
        result.setRole(roleService.getRoleByUserId(user.getId()));

        return result;
    }

    @Override
    public void deleteUserById(int userId) {

        userRoleService.deleteUserRoleByUserId(userId);
        userRepository.deleteById(userId);
    }
}