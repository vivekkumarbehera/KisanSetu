package com.kisansetu.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class DashboardStats {
    private long totalFarmers;
    private long totalFpos;
    private long totalBuyers;
    private long totalConsumers;
    private long activeListings;
    private long totalOrders;
    private long completedOrders;
    private long pendingOrders;
    private BigDecimal totalTransactionValue;
    private long activeLogistics;
    private long verifiedUsers;
    private double estimatedWastageReduction;
}
