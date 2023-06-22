package com.taru.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {

    private int id;
    private String title;
    private String description;
    private int priority;
    private StatusDTO status;
}
