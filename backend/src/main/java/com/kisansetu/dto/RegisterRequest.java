package com.kisansetu.dto;

import com.kisansetu.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String phone;

    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Role is required")
    private Role role;

    // Farmer-specific fields
    private Long districtId;
    private Long blockId;
    private String village;
    private Double farmSize;
    private String farmType;
    private String primaryCrops;

    // FPO-specific fields
    private String fpoName;
    private String registrationNumber;
    private Integer memberCount;
    private String contactPerson;

    // Buyer-specific fields
    private String businessName;
    private String buyerType;
}
