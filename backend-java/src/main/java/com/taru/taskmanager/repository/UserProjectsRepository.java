package com.taru.taskmanager.repository;

import com.taru.taskmanager.models.UserProjects;
import com.taru.taskmanager.models.UserProjectsId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProjectsRepository extends JpaRepository<UserProjects, UserProjectsId> {

    List<UserProjects> findByUserId(Integer userId);
    List<UserProjects> findByProjectId(Integer projectId);
    Integer countByUserId(Integer userId);
    void deleteById(UserProjectsId userProjectsId);
}
