package com.ssafy.herenotification.errorhandling.exception.service;


import com.ssafy.herenotification.errorhandling.exception.DefaultException;

public class DuplicatedValueException extends DefaultException {
    public DuplicatedValueException(String message) {
        super(message);
    }
}
