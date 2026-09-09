package com.kisansetu.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "crops")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String category; // VEGETABLE, GRAIN, PULSE, SPICE, OILSEED, CASH_CROP

    private String season; // KHARIF, RABI, ZAID

    @Column(nullable = false)
    private String unit; // kg, quintal, ton

    private String imageUrl;
}
