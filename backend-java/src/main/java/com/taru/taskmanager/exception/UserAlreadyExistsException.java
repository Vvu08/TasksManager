package com.taru.taskmanager.exception;

import java.io.Serial;

public class UserAlreadyExistsException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 3;

    public UserAlreadyExistsException(String message){
        super(message);
    }
}
