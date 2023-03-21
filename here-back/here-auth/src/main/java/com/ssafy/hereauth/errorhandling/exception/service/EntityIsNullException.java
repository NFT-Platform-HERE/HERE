package com.ssafy.hereauth.errorhandling.exception.service;


import com.ssafy.hereauth.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
