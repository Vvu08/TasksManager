package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.exception.AccessDeniedException;
import com.taru.taskmanager.exception.RoleNotFoundException;
import com.taru.taskmanager.exception.UserNotFoundException;
import com.taru.taskmanager.exception.UserRoleException;
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
    public void createUserRole(int userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id = " + userId + " - not found!"));

        Role role = roleRepository.findByType("ROLE_USER")
                .orElseThrow(() -> new RoleNotFoundException("Role = \"ROLE_USER\" - not found!"));

        if (role.getType().equals("ROLE_ADMIN")){
            throw new AccessDeniedException("You can't create user_role with role ADMIN!");
        } else if (userRoleRepository.existsByUserId(userId)) {
            throw new UserRoleException("User with id = " + userId + " already have Role!");
        }

        userRoleRepository.save(
                new UserRole(
                    new UserRoleId(
                        userId,
                        role.getId()),
                    user,
                    role)
        );
    }

    @Override
    public void updateUserRoleByUserId(int userId, int roleId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id = " + userId + " - not found!"));

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RoleNotFoundException("Role with id = " + roleId + " - not found!"));

        UserRole temp = userRoleRepository.findByUserId(userId)
                .orElseThrow(() -> new RoleNotFoundException("User with id = " + userId + " - don't have a role!"));

        if (temp.getRole().getType().equals("ROLE_ADMIN")){
            throw new AccessDeniedException("You can't change role of user with role ADMIN!");
        } else if (role.getType().equals("ROLE_ADMIN")){
            throw new AccessDeniedException("You can't change role of user to role ADMIN!");
        }

        userRoleRepository.deleteById(new UserRoleId(userId, temp.getRole().getId()));

        userRoleRepository.save(
                new UserRole(
                        new UserRoleId(
                                userId,
                                roleId),
                        user,
                        role));
    }

    @Override
    public void deleteUserRoleByUserId(int userId) {

        UserRole userRole = userRoleRepository.findByUserId(userId)
                .orElseThrow(() -> new UserRoleException("User with id = " + userId + " - don't have a role!"));
        if (userRole.getRole().getType().equals("ROLE_ADMIN")){
            throw new AccessDeniedException("You can't delete role of user with role ADMIN!");
        }
        userRoleRepository.deleteById(new UserRoleId(userId, userRole.getRole().getId()));
    }
}
