package com.example.demo.Auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistreRequest {
    private String id;
    private String nom;
    private String prenom;
    private String adresseMail;
    private String adresse;
    private String motePasse;
    private String role;
}
