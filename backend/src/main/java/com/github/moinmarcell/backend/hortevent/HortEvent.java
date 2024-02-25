package com.github.moinmarcell.backend.hortevent;

import com.github.moinmarcell.backend.utility.TimeService;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document
public record HortEvent(
        String id,
        String title,
        String description,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime,
        LocalDateTime createdAt,
        List<String> pnpSessionIds
) {
    static HortEvent fromDto(HortEventDto eventDto) {
        final TimeService timeService = new TimeService();
        return new HortEvent(
                null,
                eventDto.title(),
                eventDto.description(),
                eventDto.startDateTime(),
                eventDto.endDateTime(),
                timeService.getCurrentTime(),
                new ArrayList<>()
        );
    }

    HortEvent modifyHortEvent(String id, HortEventDto hortEventDto) {
        return new HortEvent(
                id,
                hortEventDto.title(),
                hortEventDto.description(),
                hortEventDto.startDateTime(),
                hortEventDto.endDateTime(),
                this.createdAt(),
                this.pnpSessionIds()
        );
    }

    public void addPnpSessionId(String pnpSessionId) {
        this.pnpSessionIds().add(pnpSessionId);
    }
}
