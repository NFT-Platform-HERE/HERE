package com.ssafy.hereboard.errorhandling.exception.service;


import com.ssafy.hereboard.errorhandling.exception.DefaultException;

public class BadRequestVariableException extends DefaultException {
    public BadRequestVariableException(String message) {
        super(message);
    }
}
