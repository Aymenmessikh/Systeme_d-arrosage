package com.example.demo.Controller;

import com.example.demo.Auth.RegistreRequest;
import com.example.demo.Entity.ChangePassword;
import com.example.demo.Entity.JardinierDto;
import com.example.demo.Services.ChangePasswordService;
import com.example.demo.Services.JardenierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/jardenier")
public class JardenierController {
    private final JardenierService jardenierService;
    private final ChangePasswordService changePasswordService;
    @GetMapping("/list")
    public ResponseEntity<List<JardinierDto>> getAllJardiniers() throws ExecutionException, InterruptedException {
        CompletableFuture<List<JardinierDto>> future = jardenierService.getAllJardiniers();
        List<JardinierDto> jardinierDtoList = future.get();
        return ResponseEntity.ok(jardinierDtoList);
    }
    @GetMapping("/{id}")
    public ResponseEntity<JardinierDto> getJardinierById(@PathVariable String id) throws ExecutionException, InterruptedException {
        JardinierDto jardinier = jardenierService.getJardinierById(id).get();
        return ResponseEntity.ok(jardinier);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUserById(@PathVariable String id, @RequestBody RegistreRequest jardinier) throws ExecutionException, InterruptedException {
            jardenierService.updateJardinier(id, jardinier).get();
            return ResponseEntity.ok().build();
    }
    @PutMapping("/password/{id}")
    public ResponseEntity<Void> changePassword(@PathVariable String id, @RequestBody ChangePassword changePassword) throws ExecutionException, InterruptedException {
        changePasswordService.changeUserPassword(id, changePassword).get();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable String id) throws ExecutionException, InterruptedException {
            jardenierService.deleteJardinierById(id).get();
            return ResponseEntity.ok().build();
    }
}
