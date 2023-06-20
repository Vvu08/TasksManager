package com.taru.taskmanager.service;

import com.taru.taskmanager.dto.StoryDTO;

import java.util.List;

public interface StoryService {

    StoryDTO createStory(StoryDTO storyDTO);

    StoryDTO updateStoryById(int storyId, StoryDTO storyDTO);

    StoryDTO getStoryById(int storyId);

    List<StoryDTO> getAllStories();

    List<StoryDTO> getAllStoriesByProjectId(int projectId);

    void deleteStoryById(int storyId);
}
