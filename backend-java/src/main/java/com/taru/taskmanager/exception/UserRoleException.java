package com.taru.taskmanager.exception;

import java.io.Serial;

public class UserRoleException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 10;

    public UserRoleException(String message){
        super(message);
    }
}
