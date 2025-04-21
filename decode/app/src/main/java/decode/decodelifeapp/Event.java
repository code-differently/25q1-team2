package decode.decodelifeapp;   //Shows the package name of the class

public class Event {  //Starts the class definition
    // Class representing an event with a title, description, and RSVP requirement
    private final String title;
    private final String description; //the varibles showing the title and description of the event
    //the varible showing if the event requires an RSVP
    private final boolean rsvpRequired;

    public Event(String title, String description, boolean rsvpRequired) {
        this.title = title;
        this.description = description; //this constructor creates a new instance of the event 
        this.rsvpRequired = rsvpRequired; //this.title refers to the class’s field, while the right-hand side is the constructor parameter.
    }

    public String getTitle() { //accessor method to get the values of the fields
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isRsvpRequired() { //isRsvpRequired() follows the naming convention for boolean getters (instead of getRsvpRequired()).
        return rsvpRequired;
    }

    @Override
    public String toString() { //This overrides Java’s default toString() behavior.
        return "Event: " + //When you print an Event object, it will return a nicely formatted string instead of a weird memory address.
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", RSVP Required=" + (rsvpRequired ? "Yes" : "No"); //When you print an Event object, it will return a nicely formatted string instead of a weird memory address.
    }
}

