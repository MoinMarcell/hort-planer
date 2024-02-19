package com.github.moinmarcell.backend.security;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class AppUserDetailsServiceTest {
    private final AppUserRepository appUserRepository = mock(AppUserRepository.class);
    private final AppUserDetailsService appUserDetailsService = new AppUserDetailsService(appUserRepository);

    @Test
    @DisplayName("loadUserByUsername - Success")
    void loadUserByUsername_returnAppUser_whenAppUserExist() {
        // GIVEN
        AppUser expected = AppUser.builder()
                .id("1")
                .username("test")
                .password("test")
                .build();
        appUserRepository.save(expected);

        // WHEN
        when(appUserRepository.findAppUserByUsername(expected.getUsername())).thenReturn(java.util.Optional.of(expected));
        var actual = appUserDetailsService.loadUserByUsername(expected.getUsername());

        // THEN
        verify(appUserRepository, times(1)).findAppUserByUsername(expected.getUsername());
        assertEquals(expected, actual);
    }

    @Test
    @DisplayName("loadUserByUsername - UsernameNotFoundException")
    void loadUserByUsername_throwUsernameNotFoundException_whenAppUserDoesNotExist() {
        // GIVEN
        String username = "test";

        // THEN
        assertThrows(UsernameNotFoundException.class, () -> appUserDetailsService.loadUserByUsername(username));
    }
}