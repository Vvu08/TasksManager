package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.RoleDTO;
import com.taru.taskmanager.exception.RoleNotFoundException;
import com.taru.taskmanager.mapper.RoleMapper;
import com.taru.taskmanager.models.Role;
import com.taru.taskmanager.models.UserRole;
import com.taru.taskmanager.repository.RoleRepository;
import com.taru.taskmanager.repository.UserRoleRepository;
import com.taru.taskmanager.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    public RoleServiceImpl(RoleRepository roleRepository, UserRoleRepository userRoleRepository) {

        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public RoleDTO getRoleById(int roleId) {

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RoleNotFoundException("Role with id = " + roleId + " - not found!"));

        return RoleMapper.mapToDto(role);
    }

    @Override
    public RoleDTO getRoleByUserId(int userId) {

        UserRole userRole = userRoleRepository.findByUserId(userId)
                .orElseThrow(() -> new RoleNotFoundException("User with id = " + userId + " - don't have a role!"));

        return RoleMapper.mapToDto(userRole.getRole());
    }

    @Override
    public List<RoleDTO> getAllRoles() {

        List<Role> roles = roleRepository.findAll();

        return roles.stream()
                .map(RoleMapper::mapToDto)
                .toList();
    }
}
