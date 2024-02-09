package com.github.moinmarcell.backend.events;

import java.time.LocalDateTime;

public record HortEventDto(
        String title,
        String description,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime
) {
}
