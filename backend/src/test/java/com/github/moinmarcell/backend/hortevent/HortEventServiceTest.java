package com.github.moinmarcell.backend.hortevent;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class HortEventServiceTest {

    private final HortEventsRepository hortEventsRepository = mock(HortEventsRepository.class);
    private final HortEventService hortEventService = new HortEventService(hortEventsRepository);

    @Test
    @DisplayName("Get all hort events")
    void getAllHortEvents_returnEmptyList_whenNoEventsInDatabase() {
        // GIVEN
        List<HortEvent> expected = List.of();
        // WHEN
        when(hortEventsRepository.findAll()).thenReturn(expected);
        List<HortEvent> actual = hortEventService.getAllHortEvents();
        // THEN
        verify(hortEventsRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Get hort event by id")
    void getHortEventById_returnHortEvent_whenHortEventExistById() {
        // GIVEN
        String id = "1";
        HortEvent expected = new HortEvent(id, "title", "description", null, null, null, List.of());
        // WHEN
        when(hortEventsRepository.findById(id)).thenReturn(Optional.of(expected));
        HortEvent actual = hortEventService.getHortEventById(id);
        // THEN
        verify(hortEventsRepository).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Throw NoSuchElementException when hort event does not exist by id")
    void getHortEventById_throwNoSuchElementException_whenHortEventDoesNotExistById() {
        // GIVEN
        String id = "1";
        // THEN
        assertThrows(NoSuchElementException.class, () -> hortEventService.getHortEventById(id));
    }

    @Test
    @DisplayName("Create hort event")
    void createHortEvent_returnCreatedHortEvent_whenMethodCalled() {
        // GIVEN
        HortEventDto hortEventDto = new HortEventDto("title", "description", null, null);
        HortEvent expected = new HortEvent("1", "title", "description", null, null, null, List.of());
        // WHEN
        when(hortEventsRepository.save(any(HortEvent.class))).thenReturn(expected);
        HortEvent actual = hortEventService.createHortEvent(hortEventDto);
        // THEN
        verify(hortEventsRepository).save(any(HortEvent.class));
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Update hort event")
    void updateHortEvent_returnUpdatedHortEvent_whenHortEventExistById() {
        // GIVEN
        String id = "1";
        HortEventDto hortEventDto = new HortEventDto("title", "description", null, null);
        HortEvent hortEvent = new HortEvent(id, "title", "description", null, null, null, List.of());
        HortEvent expected = new HortEvent(id, "title", "description", null, null, null, List.of());
        // WHEN
        when(hortEventsRepository.findById(id)).thenReturn(Optional.of(hortEvent));
        when(hortEventsRepository.save(any(HortEvent.class))).thenReturn(expected);
        HortEvent actual = hortEventService.updateHortEvent(id, hortEventDto);
        // THEN
        verify(hortEventsRepository).findById(id);
        verify(hortEventsRepository).save(any(HortEvent.class));
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Throw NoSuchElementException when hort event does not exist by id")
    void updateHortEvent_throwNoSuchElementException_whenHortEventDoesNotExistById() {
        // GIVEN
        String id = "1";
        HortEventDto hortEventDto = new HortEventDto("title", "description", null, null);
        // THEN
        assertThrows(NoSuchElementException.class, () -> hortEventService.updateHortEvent(id, hortEventDto));
    }

    @Test
    @DisplayName("Delete hort event by id")
    void deleteHortEventById_returnSuccessString_whenHortEventExistById() {
        // GIVEN
        String id = "1";
        HortEvent hortEvent = new HortEvent(id, "title", "description", null, null, null, List.of());
        String expected = "Hort Event with id " + id + " has been deleted.";
        // WHEN
        when(hortEventsRepository.findById(id)).thenReturn(Optional.of(hortEvent));
        String actual = hortEventService.deleteHortEventById(id);
        // THEN
        verify(hortEventsRepository).findById(id);
        verify(hortEventsRepository).delete(hortEvent);
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("Throw NoSuchElementException when hort event does not exist by id")
    void deleteHortEventById_throwNoSuchElementException_whenHortEventDoesNotExistById() {
        // GIVEN
        String id = "1";
        // THEN
        assertThrows(NoSuchElementException.class, () -> hortEventService.deleteHortEventById(id));
    }
}