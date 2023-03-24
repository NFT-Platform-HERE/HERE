package com.ssafy.herenft.errorhandling.resolver;

import com.ssafy.herenft.dto.common.response.ResponseErrorDto;
import com.ssafy.herenft.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.herenft.mattermost.NotificationManager;
import com.ssafy.herenft.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ServiceExceptionResolver {

    private final ResponseUtil responseUtil;

    @Autowired
    private NotificationManager notificationManager;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = EntityIsNullException.class)
    public ResponseErrorDto<?> handle(EntityIsNullException e, HttpServletRequest request) {
        notificationManager.sendNotification(e, request.getRequestURI(), getParams(request));
        return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseErrorDto<?> handle(MethodArgumentNotValidException e, HttpServletRequest request) {
        ObjectError objectError = e.getBindingResult().getAllErrors().stream().findFirst().get();
        notificationManager.sendNotification(e, request.getRequestURI(), getParams(request));
        return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, objectError.getDefaultMessage(), request.getRequestURI());
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseErrorDto<?> handle(Exception e, HttpServletRequest request) {
        e.printStackTrace();
        notificationManager.sendNotification(e, request.getRequestURI(), getParams(request));
        return responseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), request.getRequestURI());
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key)).append('\n');
        }
        return params.toString();
    }
}
