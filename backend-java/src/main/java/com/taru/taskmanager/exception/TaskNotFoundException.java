package com.taru.taskmanager.exception;

import java.io.Serial;

public class TaskNotFoundException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 6;

    public TaskNotFoundException(String message){
        super(message);
    }
}
