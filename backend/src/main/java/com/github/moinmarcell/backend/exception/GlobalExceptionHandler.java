package com.github.moinmarcell.backend.exception;

import com.github.moinmarcell.backend.utility.TimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final TimeService timeService;

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public CustomErrorMessage handleNoSuchElementException(NoSuchElementException e) {
        return new CustomErrorMessage(
                e.getMessage(),
                timeService.getCurrentTime()
        );
    }
}
