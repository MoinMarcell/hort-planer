package com.github.moinmarcell.backend.hortevent;

import java.time.LocalDateTime;

record HortEventDto(
        String title,
        String description,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime
) {
}
