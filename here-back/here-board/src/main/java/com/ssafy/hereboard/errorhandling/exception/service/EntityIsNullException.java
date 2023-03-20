package com.ssafy.hereboard.errorhandling.exception.service;


import com.ssafy.hereboard.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
