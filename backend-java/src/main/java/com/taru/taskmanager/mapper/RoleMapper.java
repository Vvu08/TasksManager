package com.taru.taskmanager.mapper;

import com.taru.taskmanager.dto.RoleDTO;
import com.taru.taskmanager.models.Role;

public class RoleMapper {

    public static RoleDTO mapToDto(Role role) {

        return RoleDTO.builder()
                .id(role.getId())
                .type(role.getType())
                .build();
    }

    public static Role mapToEntity(RoleDTO roleDTO) {

        return Role.builder()
                .id(roleDTO.getId())
                .type(roleDTO.getType())
                .build();
    }
}
