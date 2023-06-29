package com.taru.taskmanager.exception;

import java.io.Serial;

public class AccessDeniedException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 9;

    public AccessDeniedException(String message){
        super(message);
    }
}
