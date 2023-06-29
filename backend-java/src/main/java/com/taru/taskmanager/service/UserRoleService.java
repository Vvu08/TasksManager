package com.taru.taskmanager.service;

public interface UserRoleService {

    void createUserRole(int userId);

    void updateUserRoleByUserId(int userId, int roleId);

    void deleteUserRoleByUserId(int userId);
}
