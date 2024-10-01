package com.example.demo.Services;

import com.example.demo.Auth.RegistreRequest;
import com.example.demo.Entity.Jardinier;
import com.example.demo.Entity.JardinierDto;
import com.example.demo.Exeptions.UserNotFoundException;
import com.google.firebase.FirebaseApp;
import com.google.firebase.database.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class JardenierService {
    private final FirebaseDatabase database;

    public RegistreRequest createJardinier(RegistreRequest jardinier) {
        DatabaseReference ref = database.getReference("jardiniers").push();
        jardinier.setId(ref.getKey());
        ref.setValueAsync(jardinier);
        return jardinier;
    }

    public CompletableFuture<List<JardinierDto>> getAllJardiniers() {
        DatabaseReference jardiniersRef = database.getReference().child("jardiniers");

        CompletableFuture<List<JardinierDto>> future = new CompletableFuture<>();

        jardiniersRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                List<JardinierDto> jardiniers = new ArrayList<>();
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    JardinierDto jardinier = snapshot.getValue(JardinierDto.class);
                    jardiniers.add(jardinier);
                }
                future.complete(jardiniers);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }
    public CompletableFuture<JardinierDto> getJardinierById(String id) {
        DatabaseReference jardinierRef = database.getReference().child("jardiniers").child(id);

        CompletableFuture<JardinierDto> future = new CompletableFuture<>();

        jardinierRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    JardinierDto jardinier = dataSnapshot.getValue(JardinierDto.class);
                    future.complete(jardinier);
                } else {
                    future.complete(null);
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }
    public CompletableFuture<Jardinier> getJardinierByEmail(String email) {
        DatabaseReference jardiniersRef = database.getReference().child("jardiniers");
        Query query = jardiniersRef.orderByChild("adresseMail").equalTo(email);

        CompletableFuture<Jardinier> future = new CompletableFuture<>();

        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists() && dataSnapshot.getChildrenCount() == 1) {
                    for (DataSnapshot jardinierSnapshot : dataSnapshot.getChildren()) {
                        Jardinier jardinier = jardinierSnapshot.getValue(Jardinier.class);
                        future.complete(jardinier);
                        return;
                    }
                } else {
                    future.complete(null);
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }

    public CompletableFuture<Void> deleteJardinierById(String id) {
        DatabaseReference jardinierRef = database.getReference().child("jardiniers").child(id);

        CompletableFuture<Void> future = new CompletableFuture<>();

        jardinierRef.removeValue(new DatabaseReference.CompletionListener() {
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
    public CompletableFuture<Void> updateJardinier(String id, RegistreRequest updatedJardinier) {
        DatabaseReference jardinierRef = database.getReference().child("jardiniers").child(id);

        CompletableFuture<RegistreRequest> jardinierFuture = new CompletableFuture<>();
        CompletableFuture<Void> future = new CompletableFuture<>();

        jardinierRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    RegistreRequest existingJardinier = dataSnapshot.getValue(RegistreRequest.class);
                    jardinierFuture.complete(existingJardinier);
                } else {
                    jardinierFuture.completeExceptionally(new UserNotFoundException("Jardinier not found with ID: " + id));
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                jardinierFuture.completeExceptionally(databaseError.toException());
            }
        });
        jardinierFuture.thenAccept(existingJardinier -> {
            if (existingJardinier != null) {

                if (updatedJardinier.getMotePasse() != null && !updatedJardinier.getMotePasse().isEmpty()) {
//                    existingJardinier.setMotePasse(passwordEncoder.encode(updatedJardinier.getMotePasse()));
                }
                existingJardinier.setMotePasse(existingJardinier.getMotePasse());
                existingJardinier.setNom(updatedJardinier.getNom());
                existingJardinier.setId(id);
                existingJardinier.setPrenom(updatedJardinier.getPrenom());
                existingJardinier.setAdresseMail(updatedJardinier.getAdresseMail());
                existingJardinier.setAdresse(updatedJardinier.getAdresse());
                existingJardinier.setRole(updatedJardinier.getRole());

                jardinierRef.setValue(existingJardinier, new DatabaseReference.CompletionListener() {
                    @Override
                    public void onComplete(DatabaseError databaseError, DatabaseReference databaseReference) {
                        if (databaseError != null) {
                            future.completeExceptionally(databaseError.toException());
                        } else {
                            future.complete(null);
                        }
                    }
                });
            }
        }).exceptionally(e -> {
            future.completeExceptionally(e);
            return null;
        });

        return future;
    }
}
