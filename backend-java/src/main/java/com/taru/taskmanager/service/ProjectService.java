package com.taru.taskmanager.service;

import com.taru.taskmanager.dto.ProjectDTO;

import java.util.List;

public interface ProjectService {

    ProjectDTO createProject(ProjectDTO project);

    ProjectDTO updateProjectById(int projectId, ProjectDTO project);

    ProjectDTO getProjectById(int projectId);

    List<ProjectDTO> getAllProjects();

    List<ProjectDTO> getProjectsByUserId(int userId);

    void deleteProjectById(int projectId);
}
