package com.taru.taskmanager.repository;

import com.taru.taskmanager.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Integer> {

    List<Story> findByProjectId(Integer projectId);
}
