package com.github.moinmarcell.backend.pnpsession;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PnpSessionRepository extends MongoRepository<PnpSession, String> {
}
