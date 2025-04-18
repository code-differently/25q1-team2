package decode.decodelifeapp;


    import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class UserRegistration {

    // Example User roles
    public enum Role {
        STUDENT,
        BOOTCAMPER,
        MENTOR
    }

    // Simple User profile class
    public static class User {
        private String name;
        private String email;
        private Role role;
        private Map<String, String> attributes; // flexible user-defined attributes

        public User(String name, String email, Role role) {
            this.name = name;
            this.email = email;
            this.role = role;
            this.attributes = new HashMap<>();
        }

        // Getters and setters
        public String getName() { return name; }
        public String getEmail() { return email; }
        public Role getRole() { return role; }
        public Map<String, String> getAttributes() { return attributes; }

        public void updateAttribute(String key, String value) {
            attributes.put(key, value);
        }

        @Override
        public String toString() {
            return name + " (" + role + ")";
        }
    }

    private ArrayList<User> users;

    public UserRegistration() {
        this.users = new ArrayList<>();
    }

    // 1. Create user profile
    public void registerUser(String name, String email, Role role) {
        User newUser = new User(name, email, role);
        users.add(newUser);
        // Could add validation, duplicate check, etc.
    }

    // 2. Update user profile by email
    public boolean updateUser(String email, String key, String value) {
        for (User user : users) {
            if (user.getEmail().equalsIgnoreCase(email)) {
                user.updateAttribute(key, value);
                return true;
            }
        }
        return false;
    }

    // 3. Filter users by role
    public ArrayList<User> getUsersByRole(Role role) {
        ArrayList<User> result = new ArrayList<>();
        for (User user : users) {
            if (user.getRole() == role) {
                result.add(user);
            }
        }
        return result;
    }

    // 4. Filter users by custom attribute
    public ArrayList<User> getUsersByAttribute(String key, String value) {
        ArrayList<User> result = new ArrayList<>();
        for (User user : users) {
            if (value.equals(user.getAttributes().get(key))) {
                result.add(user);
            }
        }
        return result;
    }
}

