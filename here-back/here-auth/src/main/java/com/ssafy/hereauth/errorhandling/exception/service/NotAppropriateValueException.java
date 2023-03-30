package com.ssafy.hereauth.errorhandling.exception.service;


import com.ssafy.hereauth.errorhandling.exception.DefaultException;

public class NotAppropriateValueException extends DefaultException {
    public NotAppropriateValueException(String message) {
        super(message);
    }
}
