package com.example.demo.Controller;

import com.example.demo.Entity.Systeme;
import com.example.demo.Entity.SystemeDto;
import com.example.demo.Entity.Zone;
import com.example.demo.Services.SystemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/systeme")
public class SystemeController {
    private final SystemeService systemeService;

    @PostMapping("{jardinierId}")
    public ResponseEntity<String> addSysteme(@RequestBody Systeme systeme, @PathVariable String jardinierId) throws ExecutionException, InterruptedException {
        CompletableFuture<Void> future = systemeService.addSysteme(systeme, jardinierId);
        future.get();

        return ResponseEntity.status(HttpStatus.CREATED).body("Système ajouté avec succès !");
    }

    @GetMapping("/{systemeId}")
    public SystemeDto getSystemeById(@PathVariable String systemeId) throws ExecutionException, InterruptedException {
        return systemeService.getSystemeById(systemeId).get();
    }
    @GetMapping("/all")
    public ResponseEntity<List<Systeme>> getAllSystemesAjoutes() throws ExecutionException, InterruptedException {
        CompletableFuture<List<Systeme>> future = systemeService.getAllSystemesAjoutes();
        List<Systeme> systemsList = future.get();

        return ResponseEntity.ok(systemsList);
    }
    @GetMapping("/jardinier/{jardinierId}")
    public ResponseEntity<List<Systeme>> getAllSystemesByUser(@PathVariable String jardinierId) throws ExecutionException, InterruptedException {
        CompletableFuture<List<Systeme>> future =systemeService.getAllSystemesByUser(jardinierId);
        List<Systeme> systemsList = future.get();

        return ResponseEntity.ok(systemsList);
    }
    @GetMapping("zones/{id}")
    public ResponseEntity<List<Zone>> getZonesForSystem(@PathVariable String id) throws ExecutionException, InterruptedException {
        CompletableFuture<List<Zone>> future = systemeService.getZonesForSystem(id);
        List<Zone> zones = future.get();

        if (zones == null || zones.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(zones);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSysteme(@PathVariable String id) throws ExecutionException, InterruptedException {
        CompletableFuture<Void> future = systemeService.deleteSysteme(id);
        future.get();

        return ResponseEntity.noContent().build();

    }
    @PutMapping("/{systemeId}")
    public ResponseEntity<CompletableFuture<Systeme>> updateSysteme(@PathVariable String systemeId, @RequestBody Systeme updatedSysteme) {
        CompletableFuture<Systeme> systeme= systemeService.updateSysteme(systemeId, updatedSysteme);
        return ResponseEntity.ok(systeme);
    }
    @PostMapping("/zones/action/{systemeId}/{zoneName}")
    public ResponseEntity<Void> toggleZoneAction(@PathVariable String systemeId, @PathVariable String zoneName) throws ExecutionException, InterruptedException {
        CompletableFuture<Void> future = systemeService.toggleZoneAction(systemeId, zoneName);
        future.get();

        return ResponseEntity.ok().build();
    }
    @PostMapping("/zones/etat/{systemeId}/{zoneName}")
    public ResponseEntity<Void> toggleZoneEnable(@PathVariable String systemeId, @PathVariable String zoneName) throws ExecutionException, InterruptedException {
        CompletableFuture<Void> future = systemeService.toggleZoneEnable(systemeId, zoneName);
        future.get();
        return ResponseEntity.ok().build();
    }
}
