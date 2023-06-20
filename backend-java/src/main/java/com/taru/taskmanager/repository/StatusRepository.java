package com.taru.taskmanager.repository;

import com.taru.taskmanager.models.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Integer> {

}
