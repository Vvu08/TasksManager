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
@Table(name = "status_tasks")
public class StatusTasks {

    @EmbeddedId
    private StatusTasksId id;
    @ManyToOne
    @MapsId("taskId")
    @JoinColumn(name = "task_id")
    private Task task;
    @ManyToOne
    @MapsId("statusId")
    @JoinColumn(name = "status_id")
    private Status status;
}
