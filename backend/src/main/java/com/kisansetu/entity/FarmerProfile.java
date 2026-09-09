package com.kisansetu.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "farmer_profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FarmerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id")
    private District district;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "block_id")
    private Block block;

    private String village;

    @Column(name = "farm_size")
    private Double farmSize; // in acres

    @Column(name = "farm_type")
    private String farmType; // ORGANIC, CONVENTIONAL, MIXED

    @Column(name = "primary_crops")
    private String primaryCrops; // comma-separated crop names

    @Column(name = "aadhar_number")
    private String aadharNumber;

    @Column(name = "bank_account")
    private String bankAccount;

    private Double latitude;
    private Double longitude;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
