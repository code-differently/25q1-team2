package decode.decodelifeapp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;


public class EventTest {

    @Test
    public void testEventConstructorAndGetters() {
        Event event = new Event("Code Jam", "A fun coding challenge.", true);

        assertEquals("Code Jam", event.getTitle());
        assertEquals("A fun coding challenge.", event.getDescription());
        assertTrue(event.isRsvpRequired());
    }

    @Test
    public void testEventWithNoRSVP() {
        Event event = new Event("Open Mic Night", "Share your music or poetry!", false);
        assertFalse(event.isRsvpRequired());
    }

    @Test
    public void testToStringFormat() {
        Event event = new Event("Dev Meetup", "Networking and talks.", true);
        String result = event.toString();
        assertTrue(result.contains("Dev Meetup"));
        assertTrue(result.contains("Networking and talks."));
        assertTrue(result.contains("Yes"));
    }
}
