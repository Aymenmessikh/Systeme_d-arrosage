package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Systeme {
    private String id;
    private String nom;
    private String adresse;
    private double temperature;
    private double humidity;
    private String currentTime;
    private String jardinierId;
}
