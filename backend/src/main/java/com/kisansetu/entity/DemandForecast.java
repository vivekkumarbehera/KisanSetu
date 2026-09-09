package com.kisansetu.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "demand_forecasts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DemandForecast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "district_id", nullable = false)
    private District district;

    @Column(name = "current_demand")
    private Double currentDemand; // in kg

    @Column(name = "predicted_demand")
    private Double predictedDemand;

    @Column(name = "predicted_demand_next_month")
    private Double predictedDemandNextMonth;

    @Column(nullable = false)
    private String trend; // INCREASING, DECREASING, STABLE

    @Column(name = "confidence_score")
    private Double confidenceScore; // 0.0 to 1.0

    private String recommendation;

    @Column(name = "forecast_week")
    private Integer forecastWeek;

    @Column(name = "forecast_year")
    private Integer forecastYear;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
