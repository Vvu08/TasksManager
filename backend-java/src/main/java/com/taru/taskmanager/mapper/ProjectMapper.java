package com.taru.taskmanager.mapper;

import com.taru.taskmanager.dto.ProjectDTO;
import com.taru.taskmanager.models.Project;

public class ProjectMapper {

    public static ProjectDTO mapToDto(Project project) {

        return ProjectDTO.builder()
                .id(project.getId())
                .title(project.getTitle())
                .status(project.getStatus())
                .build();
    }

    public static Project mapToEntity(ProjectDTO projectDTO) {

        return Project.builder()
                .id(projectDTO.getId())
                .title(projectDTO.getTitle())
                .status(projectDTO.getStatus())
                .build();
    }
}
