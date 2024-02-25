package com.github.moinmarcell.backend.pnpsession;

import java.time.LocalTime;

public record PnpSessionDto(
        String title,
        String description,
        Integer maxParticipants,
        LocalTime startTime
) {
}
