package com.ssafy.herenotification.errorhandling.exception.service;


import com.ssafy.herenotification.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
