package com.taru.taskmanager.controller;

import com.taru.taskmanager.dto.RoleDTO;
import com.taru.taskmanager.dto.UserDTO;
import com.taru.taskmanager.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/role/{id}")
    public ResponseEntity<RoleDTO> getRoleById(@PathVariable("id") int roleId) {

        RoleDTO response = roleService.getRoleById(roleId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user/{id}/role")
    public ResponseEntity<RoleDTO> getRoleByUserId(@PathVariable("id") int userId) {

        RoleDTO response = roleService.getRoleByUserId(userId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/role")
    public ResponseEntity<List<RoleDTO>> getAllRoles() {

        List<RoleDTO> response = roleService.getAllRoles();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}