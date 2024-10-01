package com.example.demo.Services;

import com.example.demo.Auth.AuthenticationRequest;
import com.example.demo.Auth.AuthenticationResponse;
import com.example.demo.Auth.RegistreRequest;
import com.example.demo.Entity.Jardinier;
import com.example.demo.Exeptions.UserNotFoundException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthentificationService {
    private final JardenierService jardenierService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegistreRequest request) throws ExecutionException, InterruptedException {
        CompletableFuture<Jardinier> existingJardinierFuture = jardenierService.getJardinierByEmail(request.getAdresseMail());
        Jardinier existingJardinier = existingJardinierFuture.get();
        if (existingJardinier != null) {
            throw new UserNotFoundException("User already exists with email: " + request.getAdresseMail());
        }
        var jardinier = RegistreRequest.builder()
                .motePasse(passwordEncoder.encode(request.getMotePasse()))
                .adresseMail(request.getAdresseMail())
                .nom(request.getNom())
                .adresse(request.getAdresse())
                .prenom(request.getPrenom())
                .role(request.getRole())
                .build();
        jardenierService.createJardinier(jardinier);

        var jardinier1 = Jardinier.builder()
                .motePasse(passwordEncoder.encode(request.getMotePasse()))
                .adresseMail(request.getAdresseMail())
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .adresse(request.getAdresse())
                .role(request.getRole())
                .build();

        var jwtToken = jwtService.generateToken(jardinier1);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    public  AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getAdresseMail(), request.getMotePasse())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            CompletableFuture<Jardinier> jardinierFuture = jardenierService.getJardinierByEmail(request.getAdresseMail());
            Jardinier jardinier = jardinierFuture.get();
            String jardinierId=jardinier.getId();
            String role=jardinier.getRole();

            String jwtToken = jwtService.generateToken(jardinier);
            return new AuthenticationResponse(jwtToken,jardinierId,role);
        } catch (Exception e) {
            throw new RuntimeException("Authentication failed", e);
        }
    }

    @PostConstruct
    public void createAdminIfNotExists(){
        log.info("Checking if admin exists...");
        try {
            CompletableFuture<Jardinier> jardinierFuture = jardenierService.getJardinierByEmail("admin@gmail.com");
            Jardinier jardinier = jardinierFuture.get();
            if (jardinier == null) {
                log.info("Admin not found, creating admin...");
                RegistreRequest admin = RegistreRequest.builder()
                        .motePasse("admin123")
                        .adresseMail("admin@gmail.com")
                        .nom("Admin")
                        .adresse("adresse")
                        .prenom("Admin")
                        .role("admin")
                        .build();
                register(admin);
                log.info("Admin created.");
            } else {
                log.info("Admin already exists.");
            }
        } catch (ExecutionException | InterruptedException e) {
            log.error("Error while checking or creating admin", e);
        }
}
}

