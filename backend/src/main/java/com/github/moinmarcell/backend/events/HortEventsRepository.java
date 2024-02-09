package com.github.moinmarcell.backend.events;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HortEventsRepository extends MongoRepository<HortEvent, String> {
}
