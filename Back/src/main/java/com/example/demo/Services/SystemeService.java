package com.example.demo.Services;

import com.example.demo.Entity.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.database.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class SystemeService {
    private final FirebaseDatabase database;
    @Autowired
    private JardenierService jardenierService;

    public SystemeService(FirebaseApp firebaseApp) {
        this.database = FirebaseDatabase.getInstance(firebaseApp);
    }

    public CompletableFuture<Void> addSysteme(Systeme systeme, String jardinierId) {
        DatabaseReference systemsRef = database.getReference().child("systemes");
        String systemeId = systemsRef.push().getKey();
        systeme.setId(systemeId);
        systeme.setJardinierId(jardinierId);

        CompletableFuture<Void> systemeFuture = new CompletableFuture<>();
        systemsRef.child(systemeId).setValue(systeme, (databaseError, databaseReference) -> {
            if (databaseError != null) {
                systemeFuture.completeExceptionally(databaseError.toException());
            } else {
                DatabaseReference zonesRef = systemsRef.child(systemeId).child("zones");
                Map<String, Object> zonesMap = new HashMap<>();
                for (int i = 1; i <= 4; i++) {
                    Zone zone = new Zone("Zone " + i, 0, "", true, false, "");
                    zonesMap.put(zone.getNom(), zone);
                }
                zonesRef.updateChildren(zonesMap, (zonesError, zonesReference) -> {
                    if (zonesError != null) {
                        systemeFuture.completeExceptionally(zonesError.toException());
                    } else {
                        systemeFuture.complete(null);
                    }
                });
            }
        });

        return systemeFuture;
    }

    public CompletableFuture<SystemeDto> getSystemeById(String systemeId) {
        DatabaseReference systemRef = database.getReference().child("systemes").child(systemeId);

        CompletableFuture<Systeme> systemeFuture = new CompletableFuture<>();

        systemRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    Systeme systeme = dataSnapshot.getValue(Systeme.class);
                    systemeFuture.complete(systeme);
                } else {
                    systemeFuture.complete(null);
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                systemeFuture.completeExceptionally(databaseError.toException());
            }
        });
        return systemeFuture.thenCompose(systeme -> {
            if (systeme == null) {
                return CompletableFuture.completedFuture(null);
            }

            CompletableFuture<JardinierDto> jardinierFuture = jardenierService.getJardinierById(systeme.getJardinierId());

            return jardinierFuture.thenApply(jardinier -> {
                if (jardinier == null) {
                    return null;
                }

                return SystemeDto.builder()
                        .id(systeme.getId())
                        .nom(systeme.getNom())
                        .adresse(systeme.getAdresse())
                        .temperature(systeme.getTemperature())
                        .humidity(systeme.getHumidity())
                        .nomJardinier(jardinier.getNom())
                        .jardinierId(jardinier.getId())
                        .prenomJardinier(jardinier.getPrenom())
                        .currentTime(systeme.getCurrentTime())
                        .build();
            });
        });
    }

    public CompletableFuture<List<Zone>> getZonesForSystem(String systemeId) {
        DatabaseReference zonesRef = database.getReference().child("systemes").child(systemeId).child("zones");

        CompletableFuture<List<Zone>> future = new CompletableFuture<>();

        zonesRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot zonesSnapshot) {
                List<Zone> zones = new ArrayList<>();
                for (DataSnapshot zoneSnapshot : zonesSnapshot.getChildren()) {
                    Zone zone = zoneSnapshot.getValue(Zone.class);
                    zones.add(zone);
                }
                future.complete(zones);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }
    public CompletableFuture<List<Systeme>> getAllSystemesAjoutes() {
        DatabaseReference systemsRef = database.getReference().child("systemes");

        CompletableFuture<List<Systeme>> future = new CompletableFuture<>();

        systemsRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                List<Systeme> systemsList = new ArrayList<>();

                for (DataSnapshot systemSnapshot : dataSnapshot.getChildren()) {
                    Systeme systeme = systemSnapshot.getValue(Systeme.class);
                    systemsList.add(systeme);
                }
                future.complete(systemsList);
            }
            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }
    public CompletableFuture<List<Systeme>> getAllSystemesByUser(String jardinierId) {
        DatabaseReference systemsRef = database.getReference().child("systemes");

        CompletableFuture<List<Systeme>> future = new CompletableFuture<>();

        systemsRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                List<Systeme> systemeList = new ArrayList<>();
                for (DataSnapshot systemSnapshot : dataSnapshot.getChildren()) {
                    Systeme systeme = systemSnapshot.getValue(Systeme.class);
                    if (systeme != null && jardinierId.equals(systeme.getJardinierId())) {
                        systemeList.add(systeme);
                    }
                }
                future.complete(systemeList);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }


    public CompletableFuture<Void> deleteSysteme(String systemeId) {
        DatabaseReference systemRef = database.getReference().child("systemes").child(systemeId);

        CompletableFuture<Void> future = new CompletableFuture<>();

        systemRef.removeValue(new DatabaseReference.CompletionListener() {
            @Override
            public void onComplete(DatabaseError databaseError, DatabaseReference databaseReference) {
                if (databaseError != null) {
                    future.completeExceptionally(databaseError.toException());
                } else {
                    future.complete(null);
                }
            }
        });

        return future;
    }
    public CompletableFuture<Void> toggleZoneEnable(String systemeId, String zoneName) {
        DatabaseReference zoneRef = database.getReference().child("systemes").child(systemeId).child("zones").child(zoneName).child("etat");

        CompletableFuture<Void> future = new CompletableFuture<>();

        zoneRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot
                                             dataSnapshot) {
                if (dataSnapshot.exists()) {
                    Boolean currentEnable = dataSnapshot.getValue(Boolean.class);
                    zoneRef.setValue(!currentEnable, (databaseError, databaseReference) -> {
                        if (databaseError != null) {
                            future.completeExceptionally(databaseError.toException());
                        } else {
                            future.complete(null);
                        }
                    });
                } else {
                    future.completeExceptionally(new Exception("Zone not found"));
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }

    public CompletableFuture<Systeme> updateSysteme(String systemeId, Systeme updatedSysteme) {
        DatabaseReference systemRef = database.getReference().child("systemes").child(systemeId);
        DatabaseReference zonesRef = systemRef.child("zones");

        CompletableFuture<Systeme> future = new CompletableFuture<>();

        systemRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    Map<String, Zone> currentZones = new HashMap<>();
                    for (DataSnapshot zoneSnapshot : dataSnapshot.child("zones").getChildren()) {
                        Zone zone = zoneSnapshot.getValue(Zone.class);
                        currentZones.put(zoneSnapshot.getKey(), zone);
                    }

                    updatedSysteme.setId(systemeId);
                    DatabaseReference newSystemRef = systemRef;
                    newSystemRef.setValue(updatedSysteme, (databaseError, databaseReference) -> {
                        if (databaseError != null) {
                            future.completeExceptionally(databaseError.toException());
                        } else {
                            zonesRef.updateChildren(Collections.unmodifiableMap(currentZones), (zonesError, zonesReference) -> {
                                if (zonesError != null) {
                                    future.completeExceptionally(zonesError.toException());
                                } else {
                                    future.complete(updatedSysteme);
                                }
                            });
                        }
                    });
                } else {
                    future.completeExceptionally(new Exception("Systeme not found"));
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }

    public CompletableFuture<Void> toggleZoneAction(String systemeId, String zoneName) {
        DatabaseReference zoneRef = database.getReference().child("systemes").child(systemeId).child("zones").child(zoneName).child("action");

        CompletableFuture<Void> future = new CompletableFuture<>();

        zoneRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    Boolean currentAction = dataSnapshot.getValue(Boolean.class);
                    zoneRef.setValue(!currentAction, (databaseError, databaseReference) -> {
                        if (databaseError != null) {
                            future.completeExceptionally(databaseError.toException());
                        } else {
                            future.complete(null);
                        }
                    });
                } else {
                    future.completeExceptionally(new Exception("Zone not found"));
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }

}
