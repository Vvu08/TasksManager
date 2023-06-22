package com.taru.taskmanager.service.impl;

import com.taru.taskmanager.dto.StatusDTO;
import com.taru.taskmanager.mapper.StatusMapper;
import com.taru.taskmanager.models.Status;
import com.taru.taskmanager.models.StatusTasks;
import com.taru.taskmanager.repository.StatusRepository;
import com.taru.taskmanager.repository.StatusTasksRepository;
import com.taru.taskmanager.service.StatusService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;
    private final StatusTasksRepository statusTasksRepository;

    public StatusServiceImpl(StatusRepository statusRepository, StatusTasksRepository statusTasksRepository) {
        this.statusRepository = statusRepository;
        this.statusTasksRepository = statusTasksRepository;
    }

    @Override
    public StatusDTO getStatusById(int statusId) {

        Status status = statusRepository.findById(statusId)
                .orElseThrow(() -> new RuntimeException("text")/*new StatusNotFoundException("Status with id = " + statusId + " - not found!")*/);

        return StatusMapper.mapToDto(status);
    }

    @Override
    public StatusDTO getStatusByTaskId(int taskId) {

        StatusTasks statusTasks = statusTasksRepository.findByTaskId(taskId)
                .orElseThrow(() -> new RuntimeException("text"));

        return StatusMapper.mapToDto(statusTasks.getStatus());
    }

    @Override
    public List<StatusDTO> getAllStatuses() {

        List<Status> statuses = statusRepository.findAll();

        return statuses.stream()
                .map(StatusMapper::mapToDto)
                .toList();
    }
}
