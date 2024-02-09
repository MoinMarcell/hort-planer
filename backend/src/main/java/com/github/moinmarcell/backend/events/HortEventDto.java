package com.github.moinmarcell.backend.events;

import java.time.LocalDateTime;

record HortEventDto(
        String title,
        String description,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime
) {
}
