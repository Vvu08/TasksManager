package com.taru.taskmanager.service;

import com.taru.taskmanager.models.UserProjectsId;

public interface UserProjectService {

    void createUserProject(int userId, int projectId);

    void updateUserProjectByUserId(int userId, int projectId, int newProjectId);
}
