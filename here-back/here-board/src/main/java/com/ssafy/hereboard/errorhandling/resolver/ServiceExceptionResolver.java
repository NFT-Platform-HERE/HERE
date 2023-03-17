package com.ssafy.hereboard.errorhandling.resolver;

import com.ssafy.hereboard.dto.common.response.ResponseErrorDto;
import com.ssafy.hereboard.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereboard.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ServiceExceptionResolver {

    private final ResponseUtil responseUtil;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = EntityIsNullException.class)
    public ResponseErrorDto<?> handle(EntityIsNullException e, HttpServletRequest request) {
        return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }
}
