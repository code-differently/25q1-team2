package com.codedifferently.projectoop.decode.decodelifeapp;

import java.util.ArrayList;
import java.util.Scanner;

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

    public void removeEvent(String event) {
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