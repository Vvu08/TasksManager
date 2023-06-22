package com.taru.taskmanager.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_projects")
public class UserProjects {

    @EmbeddedId
    private UserProjectsId id;
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    private Project project;
}