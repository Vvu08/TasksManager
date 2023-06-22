package com.taru.taskmanager.mapper;

import com.taru.taskmanager.dto.StoryDTO;
import com.taru.taskmanager.models.Story;

public class StoryMapper {

    public static StoryDTO mapToDto(Story story) {

        return StoryDTO.builder()
                .id(story.getId())
                .title(story.getTitle())
                .description(story.getDescription())
                .startDate(story.getStartDate())
                .endDate(story.getEndDate())
                .build();
    }

    public static Story mapToEntity(StoryDTO storyDTO) {

        return Story.builder()
                .id(storyDTO.getId())
                .title(storyDTO.getTitle())
                .description(storyDTO.getDescription())
                .startDate(storyDTO.getStartDate())
                .endDate(storyDTO.getEndDate())
                .build();
    }
}
