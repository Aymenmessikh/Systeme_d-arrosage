package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspZoneDataAverageDto {
    private Double sensorValue;
    private Double pot1_Value;
    private LocalDate date;
}
