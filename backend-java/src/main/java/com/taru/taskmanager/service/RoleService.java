package com.taru.taskmanager.service;

import com.taru.taskmanager.dto.RoleDTO;

import java.util.List;

public interface RoleService {

    RoleDTO getRoleById(int roleId);

    RoleDTO getRoleByUserId(int userId);

    List<RoleDTO> getAllRoles();
}
