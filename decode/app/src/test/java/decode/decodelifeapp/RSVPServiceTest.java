package com.codedifferently.projectoop.decode.decodelifeapp;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RSVPServiceTest {

    private RSVPService service;

    @BeforeEach
    public void setup() {
        service = new RSVPService();
    }

    @Test
    public void testSuccessfulRSVP() {
        // Arrange
        String role = "student";
        String gender = "female";
        String phoneNumber = "+1234567890";

        // Act
        boolean success = service.rsvp(role, gender, phoneNumber);

        // Assert
        assertTrue(success, "RSVP should succeed for new participant");
        assertTrue(service.getGroupMembers(role, phoneNumber).contains(phoneNumber));
    }

    @Test
    public void testPreventDuplicateRSVP() {
        // Arrange
        String role = "student";
        String gender = "female";
        String phoneNumber = "+1234567890";

        service.rsvp(role, gender, phoneNumber);

        // Act
        boolean duplicate = service.rsvp(role, gender, phoneNumber);

        // Assert
        assertFalse(duplicate, "Duplicate RSVP should be prevented");
    }

    @Test
    public void testCancelRSVP() {
        // Arrange
        String role = "student";
        String gender = "female";
        String phoneNumber = "+1234567890";

        service.rsvp(role, gender, phoneNumber);

        // Act
        boolean cancelled = service.cancelRSVP(role, phoneNumber);

        // Assert
        assertTrue(cancelled, "RSVP should be cancelled");
        assertFalse(service.getGroupMembers(role, phoneNumber).contains(phoneNumber));
    }

    @Test
    public void testCancelWithoutRSVP() {
        // Arrange
        String role = "student";
        String phoneNumber = "+0000000000";

        // Act
        boolean cancelled = service.cancelRSVP(role, phoneNumber);

        // Assert
        assertFalse(cancelled, "Should not cancel if RSVP does not exist");
    }
}
