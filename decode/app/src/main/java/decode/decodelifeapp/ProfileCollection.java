package decode.decodelifeapp;

import java.util.ArrayList;

public class ProfileCollection extends Object{
    public ArrayList<String> profileNames = new ArrayList<>();
    public ArrayList<String> profileRoles= new ArrayList<>();
    public ArrayList<String> profileGenders = new ArrayList<>();
    public ArrayList<Long> profilePhoneNumbers = new ArrayList<>();
    public ArrayList<String> profileEmails = new ArrayList<>();
   
public ProfileCollection() {
    // Constructor
}

    // Method to add a new profile
public void addProfile(String name, String role, String gender,long phoneNumber, String email) {
        profileNames.add(name);
        profileRoles.add(role);
        profilePhoneNumbers.add(phoneNumber);
        profileEmails.add(email);
    }

// Method to create a list of profiles
public void createProfileList(){
    addProfile("John Smith", "student","male", 5551234567L, "johnsmith@gmail.com");
    addProfile("Alice Johnson", "student","female", 5552347890L, "alicej@domain.com");
    addProfile("Brian Lee", "mentor","male", 5556781234L, "brian.lee@school.edu");
    addProfile("Cynthia Park", "mentor","female", 5553456789L, "cynthia.park@email.com");
    addProfile("David Kim", "student","male", 5559876543L, "david.kim123@gmail.com");
    addProfile("Ella Martinez", "student","female", 5558765432L, "ella.martinez@library.org");
    addProfile("Frank Zhao", "mentor","male", 5557654321L, "frankz@eduplace.net");
    addProfile("Grace Chen", "mentor","female", 5556543210L, "grace.chen@studentmail.com");
    addProfile("Henry Patel", "student","male", 5555432109L, "henry.patel@team.org");
    addProfile("Isla Nguyen", "student","female", 5554321098L, "isla.nguyen@schoolmail.com");
    addProfile("Jack Rivera", "mentor", "male", 5553210987L, "jack.rivera@eduadmin.org");

}



// Method to print all profiles
public void printProfiles() {
    for (int i = 0; i < profileNames.size(); i++) {
        System.out.println("Name: " + profileNames.get(i));
        System.out.println("Role: " + profileRoles.get(i));
        System.out.println("Gender: " + profileGenders.get(i));
        System.out.println("Phone Number: " + profilePhoneNumbers.get(i));
        System.out.println("Email: " + profileEmails.get(i));
        System.out.println();
    }
}
}

