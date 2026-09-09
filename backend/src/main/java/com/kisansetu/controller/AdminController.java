package com.kisansetu.controller;

import com.kisansetu.dto.DashboardStats;
import com.kisansetu.entity.District;
import com.kisansetu.entity.DemandForecast;
import com.kisansetu.repository.DistrictRepository;
import com.kisansetu.repository.DemandForecastRepository;
import com.kisansetu.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final DistrictRepository districtRepository;
    private final DemandForecastRepository forecastRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/districts")
    public ResponseEntity<List<District>> getAllDistricts() {
        return ResponseEntity.ok(districtRepository.findAll());
    }

    @GetMapping("/forecast")
    public ResponseEntity<List<DemandForecast>> getAllForecasts() {
        return ResponseEntity.ok(forecastRepository.findAll());
    }

    @GetMapping("/forecast/district/{districtId}")
    public ResponseEntity<List<DemandForecast>> getForecastByDistrict(@PathVariable Long districtId) {
        return ResponseEntity.ok(forecastRepository.findByDistrictId(districtId));
    }
}
