package com.github.moinmarcell.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class BackendApplicationTests {

    BackendApplication backendApplication = new BackendApplication();

    @Test
    void contextLoads() {
        assertNotNull(backendApplication);
    }

}
