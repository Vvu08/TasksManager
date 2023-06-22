package com.taru.taskmanager.service;

public interface StatusTasksService {

    void updateTaskStatusByTaskId(int taskId, int statusId);
}
