package com.taru.taskmanager.repository;

import com.taru.taskmanager.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

}
