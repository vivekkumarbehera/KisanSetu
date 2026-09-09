package com.kisansetu.controller;

import com.kisansetu.entity.District;
import com.kisansetu.entity.Crop;
import com.kisansetu.repository.DistrictRepository;
import com.kisansetu.repository.CropRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReferenceDataController {

    private final DistrictRepository districtRepository;
    private final CropRepository cropRepository;

    @GetMapping("/districts")
    public ResponseEntity<List<District>> getAllDistricts() {
        return ResponseEntity.ok(districtRepository.findAll());
    }

    @GetMapping("/districts/state/{stateId}")
    public ResponseEntity<List<District>> getDistrictsByState(@PathVariable Long stateId) {
        return ResponseEntity.ok(districtRepository.findByStateId(stateId));
    }

    @GetMapping("/crops")
    public ResponseEntity<List<Crop>> getAllCrops() {
        return ResponseEntity.ok(cropRepository.findAll());
    }

    @GetMapping("/crops/category/{category}")
    public ResponseEntity<List<Crop>> getCropsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(cropRepository.findByCategory(category));
    }
}
