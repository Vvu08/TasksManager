package com.taru.taskmanager.exception;

import java.io.Serial;

public class StoryNotFoundException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 8;

    public StoryNotFoundException(String message){
        super(message);
    }
}
