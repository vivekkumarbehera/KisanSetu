package com.kisansetu.service;

import com.kisansetu.dto.DashboardStats;
import com.kisansetu.entity.Order;
import com.kisansetu.entity.ProductListing;
import com.kisansetu.entity.Role;
import com.kisansetu.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ProductListingRepository listingRepository;
    private final OrderRepository orderRepository;

    public DashboardStats getDashboardStats() {
        return DashboardStats.builder()
                .totalFarmers(userRepository.countByRole(Role.FARMER))
                .totalFpos(userRepository.countByRole(Role.FPO))
                .totalBuyers(userRepository.countByRole(Role.BULK_BUYER))
                .totalConsumers(userRepository.countByRole(Role.CONSUMER))
                .activeListings(listingRepository.countByStatus(ProductListing.ListingStatus.ACTIVE))
                .totalOrders(orderRepository.count())
                .completedOrders(orderRepository.countByStatus(Order.OrderStatus.COMPLETED))
                .pendingOrders(orderRepository.countByStatus(Order.OrderStatus.CREATED))
                .totalTransactionValue(orderRepository.getTotalTransactionValue())
                .activeLogistics(userRepository.countByRole(Role.LOGISTICS))
                .verifiedUsers(userRepository.countByVerified(true))
                .estimatedWastageReduction(18.5) // Simulated metric
                .build();
    }
}
