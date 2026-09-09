package com.kisansetu.dto;

import com.kisansetu.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String type;
    private Long userId;
    private String name;
    private String email;
    private Role role;
    private boolean verified;
}
