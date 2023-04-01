package com.ssafy.hereauth.errorhandling.exception.service;


import com.ssafy.hereauth.errorhandling.exception.DefaultException;

public class DuplicatedValueException extends DefaultException {
    public DuplicatedValueException(String message) {
        super(message);
    }
}
