package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.RoleDTO;
import com.taru.taskmanager.mapper.RoleMapper;
import com.taru.taskmanager.models.Role;
import com.taru.taskmanager.repository.RoleRepository;
import com.taru.taskmanager.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {

        this.roleRepository = roleRepository;
    }

    @Override
    public RoleDTO getRoleById(int roleId) {

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("text")/*new RoleNotFoundException("Role with id = " + roleId + " - not found!")*/);

        return RoleMapper.mapToDto(role);
    }

    @Override
    public RoleDTO getRoleByUserId(int userId) {

        // TODO
        // get role from user_roles and role tables
        return null;
    }

    @Override
    public List<RoleDTO> getAllRoles() {

        List<Role> roles = roleRepository.findAll();

        return roles.stream()
                .map(RoleMapper::mapToDto)
                .toList();
    }
}
