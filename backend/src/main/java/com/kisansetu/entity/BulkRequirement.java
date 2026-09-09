package com.kisansetu.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bulk_requirements")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BulkRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(nullable = false)
    private Double quantity;

    private String quality; // GRADE_A, GRADE_B, GRADE_C

    @Column(name = "max_price")
    private BigDecimal maxPrice;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "delivery_location")
    private String deliveryLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_district_id")
    private District deliveryDistrict;

    @Enumerated(EnumType.STRING)
    private RequirementStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = RequirementStatus.OPEN;
    }

    public enum RequirementStatus {
        OPEN, MATCHED, FULFILLED, CANCELLED
    }
}
