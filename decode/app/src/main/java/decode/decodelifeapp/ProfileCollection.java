package decode.decodelifeapp;

import java.util.ArrayList;

public class ProfileCollection extends Object{
    public ArrayList<String> profileNames = new ArrayList<>();
    public ArrayList<String> profileRoles= new ArrayList<>();
    public ArrayList<Long> profilePhoneNumbers = new ArrayList<>();
    public ArrayList<String> profileEmails = new ArrayList<>();
public ProfileCollection() {
    // Constructor
}

    // Method to add a new profile
public void addProfile(String name, String role, long phoneNumber, String email) {
        profileNames.add(name);
        profileRoles.add(role);
        profilePhoneNumbers.add(phoneNumber);
        profileEmails.add(email);
    }


public void createProfileList(){
    addProfile("John Smith", "student", 5551234567L, "johnsmith@gmail.com");
    addProfile("Alice Johnson", "student", 5552347890L, "alicej@domain.com");
    addProfile("Brian Lee", "mentor", 5556781234L, "brian.lee@school.edu");
    addProfile("Cynthia Park", "mentor", 5553456789L, "cynthia.park@email.com");
    addProfile("David Kim", "student", 5559876543L, "david.kim123@gmail.com");
    addProfile("Ella Martinez", "student", 5558765432L, "ella.martinez@library.org");
    addProfile("Frank Zhao", "mentor", 5557654321L, "frankz@eduplace.net");
    addProfile("Grace Chen", "menotr", 5556543210L, "grace.chen@studentmail.com");
    addProfile("Henry Patel", "student", 5555432109L, "henry.patel@team.org");
    addProfile("Isla Nguyen", "student", 5554321098L, "isla.nguyen@schoolmail.com");
    addProfile("Jack Rivera", "mentor", 5553210987L, "jack.rivera@eduadmin.org");

}
public void printProfiles() {
    for (int i = 0; i < profileNames.size(); i++) {
        System.out.println("Name: " + profileNames.get(i));
        System.out.println("Role: " + profileRoles.get(i));
        System.out.println("Phone Number: " + profilePhoneNumbers.get(i));
        System.out.println("Email: " + profileEmails.get(i));
        System.out.println();
    }
}
}

