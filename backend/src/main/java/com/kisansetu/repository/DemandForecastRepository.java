package com.kisansetu.repository;

import com.kisansetu.entity.DemandForecast;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DemandForecastRepository extends JpaRepository<DemandForecast, Long> {
    List<DemandForecast> findByDistrictId(Long districtId);
    List<DemandForecast> findByCropId(Long cropId);
    List<DemandForecast> findByCropIdAndDistrictId(Long cropId, Long districtId);
}
