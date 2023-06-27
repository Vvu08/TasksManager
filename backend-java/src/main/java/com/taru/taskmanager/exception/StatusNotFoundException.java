package com.taru.taskmanager.exception;

import java.io.Serial;

public class StatusNotFoundException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 7;

    public StatusNotFoundException(String message){
        super(message);
    }
}
