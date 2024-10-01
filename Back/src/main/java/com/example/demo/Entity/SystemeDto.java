package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SystemeDto {
    private String id;
    private String nom;
    private String adresse;
    private double temperature;
    private double humidity;
    private String currentTime;
    private String nomJardinier;
    private String jardinierId;
    private String prenomJardinier;
}
