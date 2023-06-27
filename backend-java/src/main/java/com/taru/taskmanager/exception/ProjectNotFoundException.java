package com.taru.taskmanager.exception;

import java.io.Serial;

public class ProjectNotFoundException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 5;

    public ProjectNotFoundException(String message){
        super(message);
    }
}
