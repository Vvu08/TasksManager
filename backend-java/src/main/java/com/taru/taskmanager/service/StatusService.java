package com.taru.taskmanager.service;

import com.taru.taskmanager.dto.StatusDTO;

import java.util.List;

public interface StatusService {

    StatusDTO getStatusById(int statusId);

    StatusDTO getStatusByTaskId(int taskId);

    List<StatusDTO> getAllStatuses();
}