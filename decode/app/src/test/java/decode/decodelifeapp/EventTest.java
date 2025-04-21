package decode.decodelifeapp; //Shows the package name of the class

import static org.junit.jupiter.api.Assertions.assertEquals; // importing the static methods from the JUnit library
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;


public class EventTest { //Starts the class definition defines a test class named event class

    @Test
    public void testEventConstructorAndGetters() { 
        Event event = new Event("Code Jam", "A fun coding challenge.", true);

        assertEquals("Code Jam", event.getTitle());
        assertEquals("A fun coding challenge.", event.getDescription());
        assertTrue(event.isRsvpRequired());
    }
// creates a new event when rsvp is set to flase
//verifies that rsvp is set to false
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
