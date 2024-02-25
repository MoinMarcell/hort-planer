package com.github.moinmarcell.backend.pnpsession;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pnp-sessions")
@RequiredArgsConstructor
public class PnpSessionController {
    private final PnpSessionService pnpSessionService;

    @GetMapping
    public List<PnpSession> getAllPnpSessions() {
        return pnpSessionService.findAll();
    }

    @GetMapping("/{id}")
    public PnpSession getPnpSessionById(@PathVariable String id) {
        return pnpSessionService.findById(id);
    }

    @PostMapping("/{hortEventId}")
    public PnpSession createPnpSession(@PathVariable String hortEventId, @RequestBody PnpSessionDto pnpSessionDto) {
        return pnpSessionService.create(hortEventId, pnpSessionDto);
    }

    @PutMapping("/{id}")
    public PnpSession updatePnpSession(@PathVariable String id, @RequestBody PnpSessionDto pnpSessionDto) {
        return pnpSessionService.update(id, pnpSessionDto);
    }

    @DeleteMapping("/{id}")
    public String deletePnpSession(@PathVariable String id) {
        return pnpSessionService.delete(id);
    }
}
