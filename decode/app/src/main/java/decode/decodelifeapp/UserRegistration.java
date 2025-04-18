package decode.app.src.main.java.decode.decodelifeapp;

import java.util.*;


public class UserRegistration {
        // Example User roles
        public enum Position {
            STUDENT,
            MENTOR,
        }

        // Simple User profile class
        public static class User {
            Scanner input = new Scanner(System.in);
            private String name;
            private Position role;
            private String gender;
            private Integer phonenumber;
            private String email;

        public void getRoleFromUser() {
            System.out.println("Enter your role (STUDENT//MENTOR): ");

            String roleInput = input.nextLine().toUpperCase();

            if(roleInput.equals("STUDENT")) {
                System.out.println("Profile created successfully as a STUDENT.");
                
            } else if(roleInput.equals("MENTOR")) {
                System.out.println("Profile created successfully as a MENTOR.");
            } else {
                System.out.println("Invalid role. Please enter either STUDENT or MENTOR.");
                getRoleFromUser(); // Recursive call to ask again
            }
        }
    }
}
    
        