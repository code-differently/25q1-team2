package com.codedifferently.projectoop.decode.decodelifeapp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class RSVPService {

    // Map<groupKey, Set<phoneNumber>> — groups users by role + location
    private Map<String, Set<String>> groupMap = new HashMap<>();

    public boolean rsvp(String role, String gender, String phoneNumber) {
        String groupKey = buildGroupKey(role, phoneNumber);

        groupMap.putIfAbsent(groupKey, new HashSet<>());
        Set<String> attendees = groupMap.get(groupKey);

        if (attendees.contains(phoneNumber)) {
            return false; // duplicate RSVP
        }

        attendees.add(phoneNumber);
        return true;
    }

    public boolean cancelRSVP(String role, String phoneNumber) {
        String groupKey = buildGroupKey(role, phoneNumber);

        if (!groupMap.containsKey(groupKey)) return false;

        return groupMap.get(groupKey).remove(phoneNumber);
    }

    public List<String> getGroupMembers(String role, String phoneNumber) {
        String groupKey = buildGroupKey(role, phoneNumber);
        return new ArrayList<>(groupMap.getOrDefault(groupKey, new HashSet<>()));
    }

    private String buildGroupKey(String role, String phoneNumber) {
        return role.toLowerCase() + "_" + extractLocation(phoneNumber);
    }

    private String extractLocation(String phoneNumber) {
        // In real usage, you'd map phone number to a location. For now, just use it directly.
        return phoneNumber;
    }
}
