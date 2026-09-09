package com.kisansetu.repository;

import com.kisansetu.entity.ProductListing;
import com.kisansetu.entity.ProductListing.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductListingRepository extends JpaRepository<ProductListing, Long> {
    List<ProductListing> findByStatus(ListingStatus status);
    List<ProductListing> findBySellerId(Long sellerId);
    List<ProductListing> findByDistrictId(Long districtId);
    List<ProductListing> findByCropIdAndStatus(Long cropId, ListingStatus status);
    long countByStatus(ListingStatus status);
}
