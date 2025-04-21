package com.codedifferently.projectoop.decode.decodelifeapp;

public class Event {
    private final String title;
    private final String description;
    private final boolean rsvpRequired;

    public Event(String title, String description, boolean rsvpRequired) {
        this.title = title;
        this.description = description;
        this.rsvpRequired = rsvpRequired;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isRsvpRequired() {
        return rsvpRequired;
    }

    @Override
    public String toString() {
        return "Event: " +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", RSVP Required=" + (rsvpRequired ? "Yes" : "No");
    }
}

