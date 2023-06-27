package com.taru.taskmanager.exception;

import java.io.Serial;

public class RoleNotFoundException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 4;

    public RoleNotFoundException(String message){
        super(message);
    }
}
