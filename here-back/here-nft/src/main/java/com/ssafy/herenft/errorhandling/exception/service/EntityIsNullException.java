package com.ssafy.herenft.errorhandling.exception.service;

import com.ssafy.herenft.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
