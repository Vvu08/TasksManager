package com.taru.taskmanager.exception;

import java.io.Serial;

public class WrongPasswordException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 2;

    public WrongPasswordException(String message){
        super(message);
    }
}
