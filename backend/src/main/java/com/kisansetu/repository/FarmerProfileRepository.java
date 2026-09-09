package com.kisansetu.repository;

import com.kisansetu.entity.FarmerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface FarmerProfileRepository extends JpaRepository<FarmerProfile, Long> {
    Optional<FarmerProfile> findByUserId(Long userId);
    List<FarmerProfile> findByDistrictId(Long districtId);
    long countByDistrictId(Long districtId);
}
