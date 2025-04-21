package decode;
import java.util.Scanner;

import decode.decodelifeapp.ProfileCollection;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        ProfileCollection profileCollection = new ProfileCollection();

        System.out.print("How many profiles do you want to create? ");
        int count = Integer.parseInt(input.nextLine());

        for (int i = 0; i < count; i++) {
            System.out.println("\n--- Creating Profile " + (i + 1) + " ---");
            // User user = UserRegistration.createUserFromInput(input);
            // profileCollection.addProfile(user);
        }

        System.out.println("\nAll Profiles:");
        profileCollection.printProfiles();
        input.close();
    }
}
