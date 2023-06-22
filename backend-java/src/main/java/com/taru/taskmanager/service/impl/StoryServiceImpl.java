package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.StoryDTO;
import com.taru.taskmanager.mapper.StoryMapper;
import com.taru.taskmanager.models.Project;
import com.taru.taskmanager.models.Story;
import com.taru.taskmanager.repository.ProjectRepository;
import com.taru.taskmanager.repository.StoryRepository;
import com.taru.taskmanager.service.StoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;
    private final ProjectRepository projectRepository;

    public StoryServiceImpl(StoryRepository storyRepository, ProjectRepository projectRepository) {
        this.storyRepository = storyRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public StoryDTO createStory(int projectId, StoryDTO storyDTO) {

        Story story = StoryMapper.mapToEntity(storyDTO);
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("text")/*new ProjectNotFoundException("Project with id = " + projectId + " - not found!")*/);

        story.setProject(project);
        story = storyRepository.save(story);

        return StoryMapper.mapToDto(story);
    }

    @Override
    public StoryDTO updateStoryById(int storyId, StoryDTO storyDTO) {

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new RuntimeException("text")/*new StoryNotFoundException("Story with id = " + storyId + " - not found!")*/);

        story.setTitle(storyDTO.getTitle());
        story.setDescription(storyDTO.getDescription());
        story.setStartDate(storyDTO.getStartDate());
        story.setEndDate(storyDTO.getEndDate());

        Story updatedStory = storyRepository.save(story);

        return StoryMapper.mapToDto(updatedStory);
    }

    @Override
    public StoryDTO getStoryById(int storyId) {

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new RuntimeException("text")/*new StoryNotFoundException("Story with id = " + storyId + " - not found!")*/);

        return StoryMapper.mapToDto(story);
    }

    @Override
    public List<StoryDTO> getAllStories() {

        List<Story> stories = storyRepository.findAll();

        return stories.stream()
                .map(StoryMapper::mapToDto)
                .toList();
    }

    @Override
    public List<StoryDTO> getAllStoriesByProjectId(int projectId) {

        List<Story> stories = storyRepository.findByProjectId(projectId);

        return stories.stream()
                .map(StoryMapper::mapToDto)
                .toList();
    }

    @Override
    public void deleteStoryById(int storyId) {

        storyRepository.deleteById(storyId);
    }
}
