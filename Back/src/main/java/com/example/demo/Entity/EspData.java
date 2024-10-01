package com.example.demo.Entity;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspData {

    @DocumentId
    private String id;

    private String Date;

    private String Humidity;

    private String Temperature;

    private String Time;

}