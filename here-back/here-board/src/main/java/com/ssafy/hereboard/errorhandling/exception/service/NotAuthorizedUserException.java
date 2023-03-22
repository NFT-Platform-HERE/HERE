package com.ssafy.hereboard.errorhandling.exception.service;


import com.ssafy.hereboard.errorhandling.exception.DefaultException;

public class NotAuthorizedUserException extends DefaultException {
    public NotAuthorizedUserException(String message) {
        super(message);
    }
}
