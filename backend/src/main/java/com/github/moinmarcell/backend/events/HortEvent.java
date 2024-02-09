package com.github.moinmarcell.backend.events;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
public record HortEvent(
        String id,
        String title,
        String description,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime,
        LocalDateTime createdAt
) {
    static HortEvent fromDto(HortEventDto eventDto) {
        return new HortEvent(
                null,
                eventDto.title(),
                eventDto.description(),
                eventDto.startDateTime(),
                eventDto.endDateTime(),
                LocalDateTime.now()
        );
    }

    HortEvent modifyHortEvent(String id, HortEventDto hortEventDto) {
        return new HortEvent(
                id,
                hortEventDto.title(),
                hortEventDto.description(),
                hortEventDto.startDateTime(),
                hortEventDto.endDateTime(),
                this.createdAt()
        );
    }
}
