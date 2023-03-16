package com.example.hereboard.errorhandling.exception.service;


import com.example.hereboard.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
