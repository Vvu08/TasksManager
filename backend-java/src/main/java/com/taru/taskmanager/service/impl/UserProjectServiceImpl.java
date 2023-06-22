package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.models.*;
import com.taru.taskmanager.repository.*;
import com.taru.taskmanager.service.ProjectService;
import com.taru.taskmanager.service.UserProjectService;
import com.taru.taskmanager.service.UserRoleService;
import org.springframework.stereotype.Service;

@Service
public class UserProjectServiceImpl implements UserProjectService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final UserProjectsRepository userProjectsRepository;

    public UserProjectServiceImpl(UserRepository userRepository, ProjectRepository projectRepository, UserProjectsRepository userProjectsRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.userProjectsRepository = userProjectsRepository;
    }

    @Override
    public void createUserProject(int userId, int projectId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("text")/*new UserNotFoundException("User with id = " + userId + " - not found!")*/);

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("text")/*new ProjectNotFoundException("Project with id = " + projectId + " - not found!")*/);

        int count = userProjectsRepository.countByUserId(userId);
        if ((count == 1 && !user.getJobTitle().equals("Designer")) || (count >= 2)) {
            throw new RuntimeException("text")/*new UserHaveProjectException("User with id = " + userId + " already have Project!")*/;
        }

        userProjectsRepository.save(
                new UserProjects(
                    new UserProjectsId(
                        userId,
                        projectId),
                    user,
                    project)
        );
    }

    @Override
    public void updateUserProjectByUserId(int userId, int projectId, int newProjectId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("text")/*new UserNotFoundException("User with id = " + userId + " - not found!")*/);

        Project newProject = projectRepository.findById(newProjectId)
                .orElseThrow(() -> new RuntimeException("text")/*new ProjectNotFoundException("Project with id = " + projectId + " - not found!")*/);

        UserProjectsId userProjectsId = new UserProjectsId(userId, projectId);
        UserProjects temp = userProjectsRepository.findById(userProjectsId)
                .orElseThrow(() -> new RuntimeException("text"));
        userProjectsRepository.deleteById(temp.getId());

        userProjectsRepository.save(
                new UserProjects(
                        new UserProjectsId(
                                userId,
                                newProjectId),
                        user,
                        newProject));
    }

    @Override
    public void deleteUserProjectsById(UserProjectsId userProjectsId) {

        userProjectsRepository.deleteById(userProjectsId);
    }
}
