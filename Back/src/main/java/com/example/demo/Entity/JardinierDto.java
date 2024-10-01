package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JardinierDto {
    private String id;
    private String nom;
    private String prenom;
    private String adresseMail;
    private String adresse;
    private String role;
}
