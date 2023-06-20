package com.taru.taskmanager.repository;

import com.taru.taskmanager.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Integer> {

}
