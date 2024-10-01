package com.example.demo.Config;

import com.example.demo.Entity.Jardinier;
import com.example.demo.Services.JardenierService;
import com.google.firebase.FirebaseApp;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Configuration
public class ApplicationConfig {

    private final FirebaseDatabase database;

    @Autowired
    private JardenierService jardenierService;

    public ApplicationConfig(FirebaseApp firebaseApp) {
        this.database = FirebaseDatabase.getInstance(firebaseApp);
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            CompletableFuture<Jardinier> jardinierFuture = jardenierService.getJardinierByEmail(username);
            Jardinier jardinier;
            try {
                jardinier = jardinierFuture.get();
            } catch (InterruptedException | ExecutionException e) {
                throw new RuntimeException("Erreur lors de la récupération du jardinier", e);
            }
            return new org.springframework.security.core.userdetails.User(
                    jardinier.getAdresseMail(),
                    jardinier.getPassword(),
                    new ArrayList<>()
            );
        };
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
