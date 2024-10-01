package com.example.demo.Controller;

import com.example.demo.Entity.EspData;
import com.example.demo.Entity.EspDataAverageDto;
import com.example.demo.Entity.EspZoneData;
import com.example.demo.Entity.EspZoneDataAverageDto;
import com.example.demo.Services.FirestoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.ExecutionException;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/espdata")
@RequiredArgsConstructor
public class CurveController {

    private final FirestoreService firestoreService;

    @GetMapping("/all")
    public List<EspDataAverageDto> getEspDataAverages() throws ExecutionException, InterruptedException {
        List<EspData> espDataList = firestoreService.getEspData();
        return firestoreService.getEspDataWithAverages(espDataList);
    }
    @GetMapping("/allZone/{zone}")
    public List<EspZoneDataAverageDto> getEspDataAverages(@PathVariable String zone) throws ExecutionException, InterruptedException {
        List<EspZoneData> espDataList = firestoreService.getEspZoneData(zone);
        return firestoreService.getEspZoneDataWithAverages(espDataList);
    }
}
