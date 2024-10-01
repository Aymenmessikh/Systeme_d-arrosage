package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Zone {
    private String nom;
    private double sensorValue;
    private String soilMoinsture;
    private boolean etat;
    private boolean action;
    private String timesTamp;
}
