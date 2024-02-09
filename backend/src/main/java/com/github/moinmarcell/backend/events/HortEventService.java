package com.github.moinmarcell.backend.events;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
class HortEventService {

    private final HortEventsRepository hortEventsRepository;

    List<HortEvent> getAllHortEvents() {
        return hortEventsRepository.findAll();
    }

    HortEvent getHortEventById(String id) {
        return hortEventsRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException(String.format("No Hort Event found with id %s", id)));
    }

    HortEvent createHortEvent(HortEventDto hortEventDto) {
        HortEvent savedHortEvent = hortEventsRepository.save(HortEvent.fromDto(hortEventDto));
        return getHortEventById(savedHortEvent.id());
    }

    HortEvent updateHortEvent(String id, HortEventDto hortEventDto) {
        HortEvent event = getHortEventById(id);
        HortEvent updatedEvent = event.modifyHortEvent(id, hortEventDto);
        return hortEventsRepository.save(updatedEvent);
    }

    String deleteHortEventById(String id) {
        HortEvent event = getHortEventById(id);
        hortEventsRepository.delete(event);
        return "Hort Event with id " + id + " has been deleted.";
    }

}
