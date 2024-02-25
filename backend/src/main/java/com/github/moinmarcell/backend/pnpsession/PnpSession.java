package com.github.moinmarcell.backend.pnpsession;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document
public class PnpSession {
    private String id;
    private String title;
    private String description;
    private Integer maxParticipants;
    private LocalTime startTime;

    static PnpSession fromDto(PnpSessionDto pnpSessionDto) {
        return PnpSession.builder()
                .title(pnpSessionDto.title())
                .description(pnpSessionDto.description())
                .maxParticipants(pnpSessionDto.maxParticipants())
                .startTime(pnpSessionDto.startTime())
                .build();
    }

    PnpSession withExistingId(PnpSessionDto pnpSessionDto) {
        return PnpSession.builder()
                .id(this.id)
                .title(pnpSessionDto.title())
                .description(pnpSessionDto.description())
                .maxParticipants(pnpSessionDto.maxParticipants())
                .startTime(pnpSessionDto.startTime())
                .build();
    }
}
