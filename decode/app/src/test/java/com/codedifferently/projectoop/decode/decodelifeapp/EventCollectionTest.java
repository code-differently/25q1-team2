package com.codedifferently.projectoop.decode.decodelifeapp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;

class EventCollectionTest {


   @Test
   void testAddEvent(){
       EventCollection eventCollection = new EventCollection();


       eventCollection.addEvent("Conference", "2025-07-15", "Tech Center");


       assertEquals(1, eventCollection.eventNames.size());
       assertEquals("Conference", eventCollection.eventNames.get(0));
       assertEquals("2025-07-15", eventCollection.eventDates.get(0));
       assertEquals("Tech Center", eventCollection.eventLocations.get(0));
       assertNotNull(eventCollection.eventDescriptions.get(0)); // Description should be generated
   }


   @Test
   void testAddDefaultEvents() {
       EventCollection eventCollection = new EventCollection();
       eventCollection.addDefaultEvents();


       // Check that all 11 events were added
       assertEquals(11, eventCollection.eventNames.size());
       assertEquals(11, eventCollection.eventDates.size());
       assertEquals(11, eventCollection.eventLocations.size());
       assertEquals(11, eventCollection.eventDescriptions.size());


       // Spot-check one event
       assertEquals("Hackathon", eventCollection.eventNames.get(2));
       assertEquals("2025-06-20", eventCollection.eventDates.get(2));
       assertEquals("Innovation Lab", eventCollection.eventLocations.get(2));
   }
}