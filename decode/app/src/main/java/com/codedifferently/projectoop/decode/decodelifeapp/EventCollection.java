package com.codedifferently.projectoop.decode.decodelifeapp;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class EventCollection extends Object {
   public ArrayList<String> eventNames = new ArrayList<>();
   public ArrayList<String> eventDates = new ArrayList<>();
   public ArrayList<String> eventLocations = new ArrayList<>();
   public ArrayList<String> eventDescriptions = new ArrayList<>();


   private Map<String, String> eventDescriptionMap;

    // Contrustor 
   public EventCollection() {
       eventDescriptionMap = new HashMap<>();
       initializeEventDescriptions();
   }


   // Initialize event names and their corresponding descriptions
   private void initializeEventDescriptions() {
       eventDescriptionMap.put("Conference", "Network with industry leaders and fellow tech enthusiasts.");
       eventDescriptionMap.put("Job fair", "Bring your resume and meet potential employers.");
       eventDescriptionMap.put("Hackathon", "Collaborate in real-time to build awesome projects.");
       eventDescriptionMap.put("Networking Social", "Get insights from tech veterans and grow your skills.");
       eventDescriptionMap.put("Bootcamp Program Applications", "Learn how to pitch your ideas to real investors.");
       eventDescriptionMap.put("Pitch Competitions", "Hands-on experience with the latest technologies.");
       eventDescriptionMap.put("Internship Applications", "Live Q&A with developers from top tech companies.");
       eventDescriptionMap.put("Mentorship Programs", "Apply your skills in real-world scenarios.");
       eventDescriptionMap.put("Webinars", "Build connections that will last beyond the event.");
       eventDescriptionMap.put("Study Hall Session", "Discover new tools and frameworks from experts.");
       eventDescriptionMap.put("Tech Talks", "Explore industry trends and deepen your technical expertise.");
   }


   public void addDefaultEvents(String name, String date, String location) {
       addEvent("Conference", "2025-07-15", "Tech Center");
       addEvent("Job fair", "2025-08-01", "Downtown Hub");
       addEvent("Hackathon", "2025-06-20", "Innovation Lab");
       addEvent("Networking Social", "2025-09-05", "Skyline Lounge");
       addEvent("Bootcamp Program Applications", "2025-05-10", "Online");
       addEvent("Pitch Competitions", "2025-07-22", "Venture Hall");
       addEvent("Internship Applications", "2025-04-30", "Online Portal");
       addEvent("Mentorship Programs", "2025-06-01", "Community Center");
       addEvent("Webinars", "2025-05-20", "Virtual");
       addEvent("Study Hall Session", "2025-04-25", "Library Room B");
       addEvent("Tech Talks", "2025-07-12", "Tech Auditorium");
   }


   public void addEvent(String name, String date, String location) {
       eventNames.add(name);
       eventDates.add(date);
       eventLocations.add(location);
       eventDescriptions.add(generateDescriptionForEvent(name));
   }


   public void removeEvent(String name) {
       int index = eventNames.indexOf(name);
       if (index != -1) {
           eventNames.remove(index);
           eventDates.remove(index);
           eventLocations.remove(index);
           eventDescriptions.remove(index);
       }


   }


   public void displayEvents() {
       System.out.println("📅 Upcoming Tech Events:");
       for (int i = 0; i < eventNames.size(); i++) {
           System.out.println((i + 1) + ". " + eventNames.get(i));
           System.out.println("   Date: " + eventDates.get(i));
           System.out.println("   Location: " + eventLocations.get(i));
           System.out.println("   Description: " + eventDescriptions.get(i));
           System.out.println();
       }
   }
   private String generateDescriptionForEvent(String name) {
       return eventDescriptionMap.getOrDefault(name, "No description available.");
   }


   // Getters for testing
   public ArrayList<String> getEventNames() { return eventNames; }
   public ArrayList<String> getEventDates() { return eventDates; }
   public ArrayList<String> getEventLocations() { return eventLocations; }
   public ArrayList<String> getEventDescriptions() { return eventDescriptions; }
}

import java.util.Scanner;

import com.codedifferently.projectoop.decode.decodelifeapp.exceptions.EmptyEventListException;

public class EventCollection {
    Scanner input = new Scanner(System.in);
    ArrayList<String> events = new ArrayList<>();

    public void addEvent(String event) {
        events.add("Conference");
        events.add("Job fair");
        events.add("Hackathon");
        events.add("Networking Social");
        events.add("Bootcamp Program Applications");
        events.add("Pitch Competitions");
        events.add("Internship Applications");
        events.add("Mentorship Programs");
        events.add("Webinars");
        events.add("Study Hall Session");
        events.add("Tech Talks");
    }

    public void removeEvent(String event) throws Exception {
        if (events.size() == 0) {
            throw new EmptyEventListException("No events to remove.");
        } else
        events.remove(event);
    }

    public void displayEvents() {
        System.out.println("Upcoming Tech Events:");
        for (int i = 0; i < events.size(); ++i) {
            System.out.println((i + 1) + ". " + events.get(i));
        }
    }

    //Method that will allow users that login with the role of mentor to add events
    //This should go inside of the events folder.


}
