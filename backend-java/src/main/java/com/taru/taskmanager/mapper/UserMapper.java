package com.taru.taskmanager.mapper;

import com.taru.taskmanager.dto.UserDTO;
import com.taru.taskmanager.models.User;

public class UserMapper {

    public static UserDTO mapToDto(User user) {

        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .username(user.getUsername())
                .jobTitle(user.getJobTitle())
                .role(RoleMapper.mapToDto(user.getRole()))
                .build();
    }

    public static User mapToEntity(UserDTO userDTO) {

        return User.builder()
                .id(userDTO.getId())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .username(userDTO.getUsername())
                .jobTitle(userDTO.getJobTitle())
                .role(RoleMapper.mapToEntity(userDTO.getRole()))
                .build();
    }
}
