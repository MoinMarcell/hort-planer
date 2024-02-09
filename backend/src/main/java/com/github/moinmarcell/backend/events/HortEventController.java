package com.github.moinmarcell.backend.events;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class HortEventController {
    private final HortEventService hortEventService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<HortEvent> getAllHortEvents() {
        return hortEventService.getAllHortEvents();
    }

    @GetMapping(
            path = "/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public HortEvent getHortEventById(@PathVariable String id) {
        return hortEventService.getHortEventById(id);
    }

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(HttpStatus.CREATED)
    public HortEvent createHortEvent(@RequestBody HortEventDto hortEventDto) {
        return hortEventService.createHortEvent(hortEventDto);
    }

    @PutMapping(
            path = "/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public HortEvent updateHortEvent(
            @PathVariable String id,
            @RequestBody HortEventDto hortEventDto
    ) {
        return hortEventService.updateHortEvent(id, hortEventDto);
    }

    @DeleteMapping(
            path = "/{id}",
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    public String deleteHortEventById(@PathVariable String id) {
        return hortEventService.deleteHortEventById(id);
    }
}
