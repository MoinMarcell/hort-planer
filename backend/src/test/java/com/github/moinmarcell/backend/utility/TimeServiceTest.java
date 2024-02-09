package com.github.moinmarcell.backend.utility;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class TimeServiceTest {

    @Test
    @DisplayName("Return non-null LocalDateTime value when getCurrentTime called")
    void getCurrentTime_returnNonNullLocalDateTimeValue_whenGetCurrentTimeCalled() {
        TimeService timeService = new TimeService();
        assertNotNull(timeService.getCurrentTime());
    }
}