package com.github.moinmarcell.backend.pnpsession;

import com.github.moinmarcell.backend.hortevent.HortEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PnpSessionService {
    private final PnpSessionRepository pnpSessionRepository;
    private final HortEventService hortEventService;

    List<PnpSession> findAll() {
        return pnpSessionRepository.findAll();
    }

    PnpSession findById(String id) {
        return pnpSessionRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("No PnpSession found with id: " + id));
    }

    PnpSession create(String hortEventId, PnpSessionDto pnpSessionDto) {
        PnpSession savedPnpSession = pnpSessionRepository.save(PnpSession.fromDto(pnpSessionDto));
        hortEventService.addPnpSessionToHortEvent(hortEventId, savedPnpSession.getId());
        return savedPnpSession;
    }

    PnpSession update(String id, PnpSessionDto pnpSessionDto) {
        PnpSession pnpSession = findById(id);
        return pnpSessionRepository.save(pnpSession.withExistingId(pnpSessionDto));
    }

    String delete(String id) {
        PnpSession pnpSession = findById(id);
        pnpSessionRepository.delete(pnpSession);
        return "Deleted Successfully";
    }
}
