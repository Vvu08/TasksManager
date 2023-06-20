package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.ProjectDTO;
import com.taru.taskmanager.mapper.ProjectMapper;
import com.taru.taskmanager.models.Project;
import com.taru.taskmanager.repository.ProjectRepository;
import com.taru.taskmanager.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {

        Project project = ProjectMapper.mapToEntity(projectDTO);

        project = projectRepository.save(project);

        return ProjectMapper.mapToDto(project);
    }

    @Override
    public ProjectDTO updateProjectById(int projectId, ProjectDTO projectDTO) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("text")/*new ProjectNotFoundException("Project with id = " + projectId + " - not found!")*/);

        project.setTitle(projectDTO.getTitle());
        project.setStatus(projectDTO.getStatus());

        Project updatedProject = projectRepository.save(project);

        return ProjectMapper.mapToDto(updatedProject);
    }

    @Override
    public ProjectDTO getProjectById(int projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("text")/*new ProjectNotFoundException("Project with id = " + projectId + " - not found!")*/);

        return ProjectMapper.mapToDto(project);
    }

    @Override
    public List<ProjectDTO> getAllProjects() {

        List<Project> projects = projectRepository.findAll();

        return projects.stream()
                .map(ProjectMapper::mapToDto)
                .toList();
    }

    @Override
    public void deleteProjectById(int projectId) {

        projectRepository.deleteById(projectId);
    }
}
