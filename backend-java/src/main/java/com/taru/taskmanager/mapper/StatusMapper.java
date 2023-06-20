package com.taru.taskmanager.mapper;

import com.taru.taskmanager.dto.StatusDTO;
import com.taru.taskmanager.models.Status;

public class StatusMapper {

    public static StatusDTO mapToDto(Status status) {

        return StatusDTO.builder()
                .id(status.getId())
                .name(status.getName())
                .build();
    }

    public static Status mapToEntity(StatusDTO statusDTO) {

        return Status.builder()
                .id(statusDTO.getId())
                .name(statusDTO.getName())
                .build();
    }
}
