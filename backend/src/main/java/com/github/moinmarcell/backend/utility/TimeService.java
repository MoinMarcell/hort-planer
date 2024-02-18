package com.github.moinmarcell.backend.utility;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TimeService {
    public LocalDateTime getCurrentTime() {
        return LocalDateTime.now();
    }
}
