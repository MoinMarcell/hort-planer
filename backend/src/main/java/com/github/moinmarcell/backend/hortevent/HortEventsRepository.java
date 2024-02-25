package com.github.moinmarcell.backend.hortevent;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HortEventsRepository extends MongoRepository<HortEvent, String> {
}
