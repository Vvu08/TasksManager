package com.taru.taskmanager.service;

public interface UserRoleService {

    boolean existsByUserId(int userId);

    void createUserRole(int userId, int roleId);

    void updateUserRoleByUserId(int userId, int roleId);
}
