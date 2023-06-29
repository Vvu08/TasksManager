package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.UserDTO;
import com.taru.taskmanager.exception.AccessDeniedException;
import com.taru.taskmanager.exception.UserNotFoundException;
import com.taru.taskmanager.mapper.UserMapper;
import com.taru.taskmanager.models.Task;
import com.taru.taskmanager.models.User;
import com.taru.taskmanager.models.UserProjects;
import com.taru.taskmanager.models.UserRole;
import com.taru.taskmanager.repository.TaskRepository;
import com.taru.taskmanager.repository.UserProjectsRepository;
import com.taru.taskmanager.repository.UserRepository;
import com.taru.taskmanager.repository.UserRoleRepository;
import com.taru.taskmanager.service.RoleService;
import com.taru.taskmanager.service.UserRoleService;
import com.taru.taskmanager.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserRoleService userRoleService;
    private final RoleService roleService;
    private final TaskRepository taskRepository;
    private final UserProjectsRepository userProjectsRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserRoleService userRoleService, RoleService roleService, TaskRepository taskRepository, UserProjectsRepository userProjectsRepository, UserRoleRepository userRoleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userRoleService = userRoleService;
        this.roleService = roleService;
        this.taskRepository = taskRepository;
        this.userProjectsRepository = userProjectsRepository;
        this.userRoleRepository = userRoleRepository;
        this.passwordEncoder = passwordEncoder;
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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);

        userRoleService.createUserRole(user.getId());

        UserDTO result = UserMapper.mapToDto(user);
        result.setRole(roleService.getRoleByUserId(user.getId()));

        return result;
    }

    @Override
    public UserDTO updateUserById(int userId, UserDTO userDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id = " + userId + " - not found!"));

        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setJobTitle(userDTO.getJobTitle());

        User updatedUser = userRepository.save(user);

        UserDTO result = UserMapper.mapToDto(updatedUser);
        result.setRole(roleService.getRoleByUserId(updatedUser.getId()));

        return result;
    }

    @Override
    public UserDTO getUserById(int userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id = " + userId + " - not found!"));

        UserDTO result = UserMapper.mapToDto(user);
        result.setRole(roleService.getRoleByUserId(user.getId()));

        return result;
    }

    @Override
    public List<UserDTO> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream()
                .map(u -> {
                    UserDTO userDTO = UserMapper.mapToDto(u);
                    userDTO.setRole(roleService.getRoleByUserId(u.getId()));
                    return userDTO;
                }).toList();
    }

    @Override
    public void deleteUserById(int userId) {

        UserRole userRole = userRoleRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User with id = " + userId + " - does not have a role!"));

        if (userRole.getRole().getType().equals("ROLE_ADMIN")){
            throw new AccessDeniedException("You can't delete user with role ADMIN!");
        }

        List<Task> tasks = taskRepository.findByUserId(userId);
        tasks.forEach(t -> {
            t.setUser(null);
            taskRepository.save(t);
        });
        List<UserProjects> userProjects = userProjectsRepository.findByUserId(userId);
        userProjects.forEach(us -> {
            userProjectsRepository.deleteById(us.getId());
        });
        userRoleService.deleteUserRoleByUserId(userId);
        userRepository.deleteById(userId);
    }
}
