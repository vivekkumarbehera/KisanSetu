package com.kisansetu.controller;

import com.kisansetu.entity.ProductListing;
import com.kisansetu.repository.ProductListingRepository;
import com.kisansetu.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductListingRepository listingRepository;

    @GetMapping
    public ResponseEntity<List<ProductListing>> getAllProducts() {
        return ResponseEntity.ok(listingRepository.findByStatus(ProductListing.ListingStatus.ACTIVE));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductListing> getProduct(@PathVariable Long id) {
        ProductListing listing = listingRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return ResponseEntity.ok(listing);
    }

    @GetMapping("/district/{districtId}")
    public ResponseEntity<List<ProductListing>> getByDistrict(@PathVariable Long districtId) {
        return ResponseEntity.ok(listingRepository.findByDistrictId(districtId));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ProductListing>> getBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(listingRepository.findBySellerId(sellerId));
    }
}
