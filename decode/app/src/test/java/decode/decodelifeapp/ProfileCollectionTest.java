package decode.decodelifeapp;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class ProfileCollectionTest {
    @Test
    void testPrintProfile(){
        ProfileCollection profileCollection = new ProfileCollection();
        profileCollection.createProfileList();
       profileCollection.addProfile("John Smith", "student", 5551234567L, "johnsmith@gmail.com");
        profileCollection.printProfiles();
        assertEquals("John Smith", profileCollection.profileNames.get(0));
        assertEquals("student", profileCollection.profileRoles.get(0));
        assertEquals(5551234567L, profileCollection.profilePhoneNumbers.get(0).longValue());
        
    }
    
    @Test
    void testAddProfile(){
        ProfileCollection profileCollection = new ProfileCollection();
        profileCollection.createProfileList();
        profileCollection.addProfile("John Smith", "student", 5551234567L, "johnsmith@gmail.com");
        assertEquals("John Smith", profileCollection.profileNames.get(0));
        assertEquals("student", profileCollection.profileRoles.get(0));
        assertEquals(5551234567L, profileCollection.profilePhoneNumbers.get(0).longValue());
    }
}



