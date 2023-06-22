package com.taru.taskmanager.repository;

import com.taru.taskmanager.models.UserRole;
import com.taru.taskmanager.models.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {

    boolean existsByUserId(Integer userId);
    Optional<UserRole> findByUserId(Integer userId);
    void deleteById(UserRoleId userRoleId);
}
