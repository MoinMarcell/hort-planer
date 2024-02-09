package com.github.moinmarcell.backend.events;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class HortEventControllerTest {
    private static final String BASE_URI = "/api/events";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/events - Success")
    void getAllHortEvents_expectStatus200AndEmptyArrayAsJson_whenEndpointCalled() throws Exception {
        mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DisplayName("GET /api/events/{id} - Success")
    void getHortEventById_expectStatus200AndHortEventAsJson_whenIdExist() throws Exception {
        HortEventDto hortEventDto = new HortEventDto("Test Event", "Test Description", null, null);
        String hortEventDtoJson = objectMapper.writeValueAsString(hortEventDto);

        MvcResult mvcResult = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(hortEventDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        HortEvent savedHortEvent = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), HortEvent.class);

        MvcResult result = mockMvc.perform(get(BASE_URI + "/" + savedHortEvent.id()))
                .andExpect(status().isOk())
                .andReturn();
        HortEvent returnedHortEvent = objectMapper.readValue(result.getResponse().getContentAsString(), HortEvent.class);

        assertNotNull(returnedHortEvent.id());
        assertEquals(hortEventDto.title(), returnedHortEvent.title());
        assertEquals(hortEventDto.description(), returnedHortEvent.description());
        assertEquals(hortEventDto.startDateTime(), returnedHortEvent.startDateTime());
        assertEquals(hortEventDto.endDateTime(), returnedHortEvent.endDateTime());
        assertNotNull(returnedHortEvent.createdAt());
    }

    @Test
    @DisplayName("GET /api/events/{id} - Failure")
    void getHortEventById_expectStatus404_whenIdNotExist() throws Exception {
        String id = "non-existent-id";

        mockMvc.perform(get(BASE_URI + "/" + id))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/events - Success")
    void createHortEvent_expectStatus202AndSavedHortEvent_whenEndpointCalled() throws Exception {
        HortEventDto hortEventDto = new HortEventDto("Test Event", "Test Description", null, null);
        String hortEventDtoJson = objectMapper.writeValueAsString(hortEventDto);

        MvcResult mvcResult = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(hortEventDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        HortEvent savedHortEvent = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), HortEvent.class);

        assertNotNull(savedHortEvent.id());
        assertEquals(hortEventDto.title(), savedHortEvent.title());
        assertEquals(hortEventDto.description(), savedHortEvent.description());
        assertEquals(hortEventDto.startDateTime(), savedHortEvent.startDateTime());
        assertEquals(hortEventDto.endDateTime(), savedHortEvent.endDateTime());
        assertNotNull(savedHortEvent.createdAt());
    }

    @Test
    @DisplayName("POST /api/events - Failure 415 Unsupported Media Type")
    void createHortEvent_expectStatus415_whenUnsupportedMediaType() throws Exception {
        mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_XML)
                        .content("<xml/>"))
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    @DisplayName("PUT /api/events/{id} - Success")
    void updateHortEvent_expectStatus200AndUpdatedHortEvent_whenHortEventByIdExist() throws Exception {
        HortEventDto hortEventDto = new HortEventDto("Test Event", "Test Description", null, null);
        String hortEventDtoJson = objectMapper.writeValueAsString(hortEventDto);

        MvcResult mvcResult = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(hortEventDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        HortEvent savedHortEvent = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), HortEvent.class);

        HortEventDto updatedHortEventDto = new HortEventDto("Updated Test Event", "Updated Test Description", null, null);
        String updatedHortEventDtoJson = objectMapper.writeValueAsString(updatedHortEventDto);

        MvcResult result = mockMvc.perform(put(BASE_URI + "/" + savedHortEvent.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedHortEventDtoJson))
                .andExpect(status().isOk())
                .andReturn();
        HortEvent updatedHortEvent = objectMapper.readValue(result.getResponse().getContentAsString(), HortEvent.class);

        assertEquals(savedHortEvent.id(), updatedHortEvent.id());
        assertEquals(updatedHortEventDto.title(), updatedHortEvent.title());
        assertEquals(updatedHortEventDto.description(), updatedHortEvent.description());
        assertEquals(updatedHortEventDto.startDateTime(), updatedHortEvent.startDateTime());
        assertEquals(updatedHortEventDto.endDateTime(), updatedHortEvent.endDateTime());
        assertEquals(savedHortEvent.createdAt(), updatedHortEvent.createdAt());
    }

    @Test
    @DisplayName("PUT /api/events/{id} - Failure 404 Not Found")
    void updateHortEvent_expectStatus404_whenHortEventByIdNotExist() throws Exception {
        String id = "non-existent-id";
        HortEventDto updatedHortEventDto = new HortEventDto("Updated Test Event", "Updated Test Description", null, null);
        String updatedHortEventDtoJson = objectMapper.writeValueAsString(updatedHortEventDto);

        mockMvc.perform(put(BASE_URI + "/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedHortEventDtoJson))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PUT /api/events/{id} - Failure 415 Unsupported Media Type")
    void updateHortEvent_expectStatus415_whenUnsupportedMediaType() throws Exception {
        mockMvc.perform(put(BASE_URI + "/non-existent-id")
                        .contentType(MediaType.APPLICATION_XML)
                        .content("<xml/>"))
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    @DisplayName("DELETE /api/events/{id} - Success")
    void deleteHortEventById_expectStatus200AndSuccessText_whenIdExist() throws Exception {
        HortEventDto hortEventDto = new HortEventDto("Test Event", "Test Description", null, null);
        String hortEventDtoJson = objectMapper.writeValueAsString(hortEventDto);

        MvcResult mvcResult = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(hortEventDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        HortEvent savedHortEvent = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), HortEvent.class);

        mockMvc.perform(delete(BASE_URI + "/" + savedHortEvent.id()))
                .andExpect(status().isOk())
                .andExpect(content().string("Hort Event with id " + savedHortEvent.id() + " has been deleted."));
    }

    @Test
    @DisplayName("DELETE /api/events/{id} - Failure 404 Not Found")
    void deleteHortEventById_expectStatus404_whenIdNotExist() throws Exception {
        String id = "non-existent-id";

        mockMvc.perform(delete(BASE_URI + "/" + id))
                .andExpect(status().isNotFound());
    }
}