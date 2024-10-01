package com.example.demo.Services;

import com.example.demo.Auth.RegistreRequest;
import com.example.demo.Entity.ChangePassword;
import com.example.demo.Exeptions.UserNotFoundException;
import com.google.firebase.database.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class ChangePasswordService {
    private final FirebaseDatabase database;
    private final PasswordEncoder passwordEncoder;
    public CompletableFuture<Void> changeUserPassword(String userId, ChangePassword changePassword) {
        DatabaseReference jardinierRef = database.getReference().child("jardiniers").child(userId);

        CompletableFuture<RegistreRequest> jardinierFuture = new CompletableFuture<>();
        CompletableFuture<Void> future = new CompletableFuture<>();

        jardinierRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    RegistreRequest existingJardinier = dataSnapshot.getValue(RegistreRequest.class);
                    jardinierFuture.complete(existingJardinier);
                } else {
                    jardinierFuture.completeExceptionally(new UserNotFoundException("Jardinier not found with ID: " + userId));
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                jardinierFuture.completeExceptionally(databaseError.toException());
            }
        });
        jardinierFuture.thenAccept(existingJardinier -> {
            if (existingJardinier != null) {

                if (changePassword.getNewPassword() != null &&
                        passwordEncoder.matches(changePassword.getPassword(), existingJardinier.getMotePasse())) {
                    existingJardinier.setMotePasse(passwordEncoder.encode(changePassword.getNewPassword()));
                    existingJardinier.setNom(existingJardinier.getNom());
                    existingJardinier.setId(userId);
                    existingJardinier.setPrenom(existingJardinier.getPrenom());
                    existingJardinier.setAdresseMail(existingJardinier.getAdresseMail());
                    existingJardinier.setAdresse(existingJardinier.getAdresse());
                    existingJardinier.setRole(existingJardinier.getRole());
                } else {
                    throw new RuntimeException();
                }
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
            }else throw new RuntimeException();
        }).exceptionally(e -> {
            future.completeExceptionally(e);
            return null;
        });

        return future;
    }
}
