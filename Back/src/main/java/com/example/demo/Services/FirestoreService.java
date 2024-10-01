package com.example.demo.Services;

import com.example.demo.Entity.EspData;
import com.example.demo.Entity.EspDataAverageDto;
import com.example.demo.Entity.EspZoneData;
import com.example.demo.Entity.EspZoneDataAverageDto;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class FirestoreService {

    private final Firestore firestore;

    public FirestoreService() {
        this.firestore = FirestoreClient.getFirestore();
    }

    private static final List<DateTimeFormatter> FORMATTERS = Arrays.asList(
            DateTimeFormatter.ofPattern("d/M/yyyy")
    );

    // Method to retrieve EspData
    public List<EspData> getEspData() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = firestore.collection("EspData").document("DHT11").collection("Day1").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<EspData> espDataList = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            EspData espData = document.toObject(EspData.class);
            espDataList.add(espData);
        }
        return espDataList;
    }

    public List<EspDataAverageDto> getEspDataWithAverages(List<EspData> espDataList) {
        LocalDate fifteenDaysAgo = LocalDate.now().minusDays(15);

        List<EspData> last15DaysData = espDataList.stream()
                .filter(data -> {
                    LocalDate date = parseDate(data.getDate());
                    return date != null && date.isAfter(fifteenDaysAgo);
                })
                .collect(Collectors.toList());

        // Regrouper par date
        Map<LocalDate, List<EspData>> groupedByDate = last15DaysData.stream()
                .collect(Collectors.groupingBy(data -> parseDate(data.getDate())));

        List<EspDataAverageDto> dailyAverages = new ArrayList<>();

        // Calculer les moyennes et remplir les objets EspDataAverageDto
        for (Map.Entry<LocalDate, List<EspData>> entry : groupedByDate.entrySet()) {
            LocalDate date = entry.getKey();
            List<EspData> dailyData = entry.getValue();

            double avgTemperature = dailyData.stream()
                    .mapToDouble(data -> {
                        try {
                            return Double.parseDouble(data.getTemperature());
                        } catch (NumberFormatException e) {
                            return 0.0;
                        }
                    })
                    .average()
                    .orElse(0.0);

            double avgHumidity = dailyData.stream()
                    .mapToDouble(data -> {
                        try {
                            return Double.parseDouble(data.getHumidity());
                        } catch (NumberFormatException e) {
                            return 0.0;
                        }
                    })
                    .average()
                    .orElse(0.0);
            BigDecimal roundedTemp = new BigDecimal(avgTemperature).setScale(2, RoundingMode.HALF_UP);
            BigDecimal roundedHumidity = new BigDecimal(avgHumidity).setScale(2, RoundingMode.HALF_UP);

            // Créer un nouvel objet EspDataAverageDto avec la date, la température moyenne et l'humidité moyenne
            EspDataAverageDto dto = new EspDataAverageDto(date, roundedTemp.doubleValue(), roundedHumidity.doubleValue());
            dailyAverages.add(dto);

            dailyAverages.sort(Comparator.comparing(EspDataAverageDto::getDate));
        }

        return dailyAverages;
    }

    private LocalDate parseDate(String dateStr) {
        for (DateTimeFormatter formatter : FORMATTERS) {
            try {
                return LocalDate.parse(dateStr, formatter);
            } catch (DateTimeParseException e) {
                // Continuer avec le format suivant
            }
        }
        return null;
    }




    public List<EspZoneData> getEspZoneData(String zone) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = firestore.collection("EspData").document(zone).collection("Day1").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<EspZoneData> espDataList = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            EspZoneData espData = document.toObject(EspZoneData.class);
            espDataList.add(espData);
        }
        return espDataList;
    }

    public List<EspZoneDataAverageDto> getEspZoneDataWithAverages(List<EspZoneData> espDataList) {
        LocalDate fifteenDaysAgo = LocalDate.now().minusDays(15);

        List<EspZoneData> last15DaysData = espDataList.stream()
                .filter(data -> {
                    LocalDate date = parseDate(data.getDate());
                    return date != null && date.isAfter(fifteenDaysAgo);
                })
                .collect(Collectors.toList());

        // Regrouper par date
        Map<LocalDate, List<EspZoneData>> groupedByDate = last15DaysData.stream()
                .collect(Collectors.groupingBy(data -> parseDate(data.getDate())));

        List<EspZoneDataAverageDto> dailyAverages = new ArrayList<>();

        // Calculer les moyennes et remplir les objets EspZoneDataAverageDto
        for (Map.Entry<LocalDate, List<EspZoneData>> entry : groupedByDate.entrySet()) {
            LocalDate date = entry.getKey();
            List<EspZoneData> dailyData = entry.getValue();

            // Calculer la moyenne de la valeur du capteur
            double avgSensorValue = dailyData.stream()
                    .mapToDouble(EspZoneData::getSensorValue)  // Remplacez getSensorValue() par votre méthode
                    .average()
                    .orElse(0.0);

            // Calculer la moyenne de la valeur de Pot1
            double avgPot1_Value = dailyData.stream()
                    .mapToDouble(EspZoneData::getPot1_Value)  // Remplacez getPot1Value() par votre méthode
                    .average()
                    .orElse(0.0);

            // Arrondir les valeurs
            BigDecimal roundedSensorValue = new BigDecimal(avgSensorValue).setScale(2, RoundingMode.HALF_UP);
            BigDecimal roundedPot1_Value = new BigDecimal(avgPot1_Value).setScale(2, RoundingMode.HALF_UP);

            // Créer un nouvel objet EspZoneDataAverageDto avec la date, la moyenne de sensorValue et la moyenne de Pot1Value
            EspZoneDataAverageDto dto = new EspZoneDataAverageDto(roundedSensorValue.doubleValue(),
                    roundedPot1_Value.doubleValue(), date);
            dailyAverages.add(dto);
        }

        // Trier la liste par date ascendante
        dailyAverages.sort(Comparator.comparing(EspZoneDataAverageDto::getDate));

        return dailyAverages;
    }

}
