package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.models.Role;
import com.taru.taskmanager.models.User;
import com.taru.taskmanager.models.UserRole;
import com.taru.taskmanager.models.UserRoleId;
import com.taru.taskmanager.repository.RoleRepository;
import com.taru.taskmanager.repository.UserRepository;
import com.taru.taskmanager.repository.UserRoleRepository;
import com.taru.taskmanager.service.UserRoleService;
import org.springframework.stereotype.Service;

@Service
public class UserRoleServiceImpl implements UserRoleService {

    private final UserRoleRepository userRoleRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserRoleServiceImpl(UserRoleRepository userRoleRepository, UserRepository userRepository, RoleRepository roleRepository) {
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public boolean existsByUserId(int userId) {

        return userRoleRepository.existsByUserId(userId);
    }

    @Override
    public void createUserRole(int userId, int roleId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("text")/*new UserNotFoundException("User with id = " + userId + " - not found!")*/);

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("text")/*new RoleNotFoundException("Role with id = " + roleId + " - not found!")*/);

        if (userRoleRepository.existsByUserId(userId)) {
            throw new RuntimeException("text")/*new UserHaveRoleException("User with id = " + userId + " already have Role!")*/;
        }

        userRoleRepository.save(
                new UserRole(
                    new UserRoleId(
                        userId,
                        roleId),
                    user,
                    role));
    }

    @Override
    public void updateUserRoleByUserId(int userId, int roleId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("text")/*new UserNotFoundException("User with id = " + userId + " - not found!")*/);

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("text")/*new RoleNotFoundException("Role with id = " + roleId + " - not found!")*/);

        UserRole temp = userRoleRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("text"));
        userRoleRepository.deleteById(new UserRoleId(userId, temp.getRole().getId()));

        userRoleRepository.save(
                new UserRole(
                        new UserRoleId(
                                userId,
                                roleId),
                        user,
                        role));
    }
}
