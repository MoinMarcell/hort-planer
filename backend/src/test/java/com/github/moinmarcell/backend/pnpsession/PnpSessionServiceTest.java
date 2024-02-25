package com.github.moinmarcell.backend.pnpsession;

import com.github.moinmarcell.backend.hortevent.HortEvent;
import com.github.moinmarcell.backend.hortevent.HortEventService;
import com.github.moinmarcell.backend.hortevent.HortEventsRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class PnpSessionServiceTest {

    PnpSessionRepository pnpSessionRepository = mock(PnpSessionRepository.class);
    HortEventsRepository hortEventRepository = mock(HortEventsRepository.class);
    HortEventService hortEventService = new HortEventService(hortEventRepository);
    PnpSessionService pnpSessionService = new PnpSessionService(pnpSessionRepository, hortEventService);

    @Test
    void findAll_returnEmptyList_whenMethodCalledAndDbEmpty() {
        // GIVEN
        List<PnpSession> expected = List.of();
        // WHEN
        when(pnpSessionRepository.findAll()).thenReturn(expected);
        List<PnpSession> actual = pnpSessionService.findAll();
        // THEN
        verify(pnpSessionRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void findById_returnPnpSession_whenPnpSessionExist() {
        // GIVEN
        String id = "1";
        PnpSession expected = new PnpSession("1", "title", "description", 12, LocalTime.of(12, 0));
        // WHEN
        when(pnpSessionRepository.findById(id)).thenReturn(Optional.of(expected));
        PnpSession actual = pnpSessionService.findById(id);
        // THEN
        verify(pnpSessionRepository).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void findById_throwNoSuchElementException_whenPnpSessionNotExist() {
        // GIVEN
        String id = "1";
        // WHEN
        when(pnpSessionRepository.findById(id)).thenReturn(Optional.empty());
        // THEN
        assertThrows(NoSuchElementException.class, () -> pnpSessionService.findById(id));
    }

    @Test
    void create_returnSavedPnpSession_whenMethodCalled() {
        // GIVEN
        String id = "1";
        HortEvent existingHortEvent = new HortEvent("1", "title", "description", null, null, null, new ArrayList<>());
        PnpSessionDto pnpSessionDto = new PnpSessionDto("title", "description", 12, LocalTime.of(12, 0));
        PnpSession expected = new PnpSession("1", "title", "description", 12, LocalTime.of(12, 0));
        HortEvent updatedHortEvent = new HortEvent("1", "title", "description", null, null, null, List.of("1"));
        // WHEN
        when(hortEventRepository.findById(id)).thenReturn(Optional.of(existingHortEvent));
        when(hortEventRepository.save(any(HortEvent.class))).thenReturn(updatedHortEvent);
        when(pnpSessionRepository.save(any(PnpSession.class))).thenReturn(expected);
        PnpSession actual = pnpSessionService.create(id, pnpSessionDto);
        HortEvent actualHortEvent = hortEventService.getHortEventById(id);
        // THEN
        verify(hortEventRepository, times(2)).findById(id);
        verify(hortEventRepository).save(any(HortEvent.class));
        verify(pnpSessionRepository).save(any(PnpSession.class));
        assertEquals(expected, actual);
        assertEquals(updatedHortEvent, actualHortEvent);
    }

    @Test
    void update_returnUpdatedPnpSession_whenPnpSessionExist() {
        // GIVEN
        String id = "1";
        PnpSession existingPnpSession = new PnpSession("1", "title", "description", 12, LocalTime.of(12, 0));
        PnpSessionDto pnpSessionDto = new PnpSessionDto("title2", "description2", 12, LocalTime.of(12, 0));
        PnpSession expected = new PnpSession("1", "title2", "description2", 12, LocalTime.of(12, 0));
        // WHEN
        when(pnpSessionRepository.findById(id)).thenReturn(Optional.of(existingPnpSession));
        when(pnpSessionRepository.save(any(PnpSession.class))).thenReturn(expected);
        PnpSession actual = pnpSessionService.update(id, pnpSessionDto);
        // THEN
        verify(pnpSessionRepository).findById(id);
        verify(pnpSessionRepository).save(any(PnpSession.class));
        assertEquals(expected, actual);
    }

    @Test
    void update_throwNoSuchElementException_whenPnpSessionNotExist() {
        // GIVEN
        String id = "1";
        PnpSessionDto pnpSessionDto = new PnpSessionDto("title2", "description2", 12, LocalTime.of(12, 0));
        // WHEN
        when(pnpSessionRepository.findById(id)).thenReturn(Optional.empty());
        // THEN
        assertThrows(NoSuchElementException.class, () -> pnpSessionService.update(id, pnpSessionDto));
    }

    @Test
    void delete_returnSuccessMessage_whenPnpSessionExist() {
        // GIVEN
        String id = "1";
        PnpSession existingPnpSession = new PnpSession("1", "title", "description", 12, LocalTime.of(12, 0));
        String expected = "Deleted Successfully";
        // WHEN
        when(pnpSessionRepository.findById(id)).thenReturn(Optional.of(existingPnpSession));
        String actual = pnpSessionService.delete(id);
        // THEN
        verify(pnpSessionRepository).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void delete_throwNoSuchElementException_whenPnpSessionNotExist() {
        // GIVEN
        String id = "1";
        // WHEN
        when(pnpSessionRepository.findById(id)).thenReturn(Optional.empty());
        // THEN
        assertThrows(NoSuchElementException.class, () -> pnpSessionService.delete(id));
    }
}