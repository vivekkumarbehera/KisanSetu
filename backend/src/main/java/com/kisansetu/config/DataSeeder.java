package com.kisansetu.config;

import com.kisansetu.entity.*;
import com.kisansetu.entity.ProductListing.ListingStatus;
import com.kisansetu.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
@SuppressWarnings("null")
public class DataSeeder implements CommandLineRunner {

    private final StateRepository stateRepository;
    private final DistrictRepository districtRepository;
    private final CropRepository cropRepository;
    private final UserRepository userRepository;
    private final ProductListingRepository listingRepository;
    private final DemandForecastRepository forecastRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (stateRepository.count() > 0) {
            log.info("Database already seeded. Skipping initial seeding.");
            return;
        }

        log.info("Starting KisanSetu Odisha Demo Data Seeding...");

        // 1. Seed State: Odisha
        State odisha = stateRepository.save(State.builder()
                .name("Odisha")
                .code("OD")
                .build());

        // 2. Seed All 30 Districts of Odisha
        List<District> districts = Arrays.asList(
                createDistrict("Angul", odisha, 20.84, 85.10),
                createDistrict("Balangir", odisha, 20.71, 83.48),
                createDistrict("Balasore", odisha, 21.49, 86.93),
                createDistrict("Bargarh", odisha, 21.33, 83.62),
                createDistrict("Bhadrak", odisha, 21.06, 86.50),
                createDistrict("Boudh", odisha, 20.84, 84.32),
                createDistrict("Cuttack", odisha, 20.46, 85.88),
                createDistrict("Deogarh", odisha, 21.53, 84.73),
                createDistrict("Dhenkanal", odisha, 20.66, 85.59),
                createDistrict("Gajapati", odisha, 18.81, 84.15),
                createDistrict("Ganjam", odisha, 19.38, 85.05),
                createDistrict("Jagatsinghpur", odisha, 20.26, 86.17),
                createDistrict("Jajpur", odisha, 20.85, 86.33),
                createDistrict("Jharsuguda", odisha, 21.86, 84.01),
                createDistrict("Kalahandi", odisha, 19.91, 83.16),
                createDistrict("Kandhamal", odisha, 20.14, 84.04),
                createDistrict("Kendrapara", odisha, 20.50, 86.42),
                createDistrict("Keonjhar", odisha, 21.63, 85.58),
                createDistrict("Khordha", odisha, 20.19, 85.62),
                createDistrict("Koraput", odisha, 18.81, 82.71),
                createDistrict("Malkangiri", odisha, 18.34, 81.90),
                createDistrict("Mayurbhanj", odisha, 21.93, 86.72),
                createDistrict("Nabarangpur", odisha, 19.23, 82.55),
                createDistrict("Nayagarh", odisha, 20.13, 85.10),
                createDistrict("Nuapada", odisha, 20.83, 82.53),
                createDistrict("Puri", odisha, 19.81, 85.83),
                createDistrict("Rayagada", odisha, 19.17, 83.42),
                createDistrict("Sambalpur", odisha, 21.47, 83.97),
                createDistrict("Subarnapur", odisha, 20.84, 83.92),
                createDistrict("Sundargarh", odisha, 22.12, 84.03)
        );
        districtRepository.saveAll(districts);
        Map<String, District> districtMap = new HashMap<>();
        districts.forEach(d -> districtMap.put(d.getName(), d));

        // 3. Seed Crops
        List<Crop> crops = Arrays.asList(
                Crop.builder().name("Rice (Paddy)").category("GRAIN").season("KHARIF").unit("quintal").build(),
                Crop.builder().name("Tomato").category("VEGETABLE").season("RABI").unit("kg").build(),
                Crop.builder().name("Potato").category("VEGETABLE").season("RABI").unit("kg").build(),
                Crop.builder().name("Onion").category("VEGETABLE").season("RABI").unit("kg").build(),
                Crop.builder().name("Brinjal").category("VEGETABLE").season("KHARIF").unit("kg").build(),
                Crop.builder().name("Green Chilli").category("SPICE").season("KHARIF").unit("kg").build(),
                Crop.builder().name("Cauliflower").category("VEGETABLE").season("RABI").unit("kg").build(),
                Crop.builder().name("Cabbage").category("VEGETABLE").season("RABI").unit("kg").build(),
                Crop.builder().name("Lady Finger (Okra)").category("VEGETABLE").season("KHARIF").unit("kg").build(),
                Crop.builder().name("Bottle Gourd").category("VEGETABLE").season("ZAID").unit("kg").build(),
                Crop.builder().name("Turmeric").category("SPICE").season("KHARIF").unit("kg").build(),
                Crop.builder().name("Groundnut").category("OILSEED").season("KHARIF").unit("quintal").build(),
                Crop.builder().name("Mustard").category("OILSEED").season("RABI").unit("quintal").build(),
                Crop.builder().name("Sugarcane").category("CASH_CROP").season("KHARIF").unit("ton").build()
        );
        cropRepository.saveAll(crops);
        Map<String, Crop> cropMap = new HashMap<>();
        crops.forEach(c -> cropMap.put(c.getName(), c));

        // 4. Seed Demo Users for All 6 Roles
        userRepository.save(User.builder()
                .name("Dr. Ramesh Mohapatra (Dept of Agri)")
                .email("admin@kisansetu.odisha.gov.in")
                .phone("9437000001")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.GOVERNMENT_ADMIN)
                .verified(true)
                .build());

        User farmerCuttack = userRepository.save(User.builder()
                .name("Bishnu Charan Das")
                .email("farmer.cuttack@kisansetu.in")
                .phone("9437000002")
                .password(passwordEncoder.encode("farmer123"))
                .role(Role.FARMER)
                .verified(true)
                .build());

        User farmerSambalpur = userRepository.save(User.builder()
                .name("Naveen Pradhan")
                .email("farmer.sambalpur@kisansetu.in")
                .phone("9437000003")
                .password(passwordEncoder.encode("farmer123"))
                .role(Role.FARMER)
                .verified(true)
                .build());

        User farmerKoraput = userRepository.save(User.builder()
                .name("Mangala Sabar")
                .email("farmer.koraput@kisansetu.in")
                .phone("9437000004")
                .password(passwordEncoder.encode("farmer123"))
                .role(Role.FARMER)
                .verified(true)
                .build());

        User fpoSamaleswari = userRepository.save(User.builder()
                .name("Maa Samaleswari Farmer Producer Org")
                .email("fpo.samaleswari@kisansetu.in")
                .phone("9437000005")
                .password(passwordEncoder.encode("fpo123"))
                .role(Role.FPO)
                .verified(true)
                .build());

        User buyerBhubaneswar = userRepository.save(User.builder()
                .name("Kalinga Fresh Retails Ltd")
                .email("buyer.bhubaneswar@kisansetu.in")
                .phone("9437000006")
                .password(passwordEncoder.encode("buyer123"))
                .role(Role.BULK_BUYER)
                .verified(true)
                .build());

        User consumerPriya = userRepository.save(User.builder()
                .name("Priyadarshini Rout")
                .email("consumer.priya@kisansetu.in")
                .phone("9437000007")
                .password(passwordEncoder.encode("consumer123"))
                .role(Role.CONSUMER)
                .verified(true)
                .build());

        userRepository.save(User.builder()
                .name("Utkal Agri-Logistics Express")
                .email("logistics.odisha@kisansetu.in")
                .phone("9437000008")
                .password(passwordEncoder.encode("logistics123"))
                .role(Role.LOGISTICS)
                .verified(true)
                .build());

        // 5. Seed Product Listings
        List<ProductListing> listings = Arrays.asList(
                ProductListing.builder()
                        .seller(farmerCuttack)
                        .crop(cropMap.get("Tomato"))
                        .district(districtMap.get("Cuttack"))
                        .quantity(800.0)
                        .availableQuantity(650.0)
                        .quality("GRADE_A")
                        .price(new BigDecimal("28.00"))
                        .harvestDate(LocalDate.now().minusDays(1))
                        .availabilityDate(LocalDate.now())
                        .organic(false)
                        .description("Freshly harvested juicy hybrid tomatoes from Athagarh belt, Cuttack. Uniform red color and firm texture.")
                        .status(ListingStatus.ACTIVE)
                        .build(),

                ProductListing.builder()
                        .seller(fpoSamaleswari)
                        .crop(cropMap.get("Rice (Paddy)"))
                        .district(districtMap.get("Sambalpur"))
                        .quantity(5000.0)
                        .availableQuantity(4200.0)
                        .quality("GRADE_A")
                        .price(new BigDecimal("36.50"))
                        .harvestDate(LocalDate.now().minusDays(4))
                        .availabilityDate(LocalDate.now())
                        .organic(true)
                        .description("Sambalpur Premium Swarna paddy grain, dried to 12% moisture. Certified organic FPO aggregate.")
                        .status(ListingStatus.ACTIVE)
                        .build(),

                ProductListing.builder()
                        .seller(farmerSambalpur)
                        .crop(cropMap.get("Cauliflower"))
                        .district(districtMap.get("Sambalpur"))
                        .quantity(1200.0)
                        .availableQuantity(1200.0)
                        .quality("GRADE_A")
                        .price(new BigDecimal("32.00"))
                        .harvestDate(LocalDate.now())
                        .availabilityDate(LocalDate.now().plusDays(1))
                        .organic(true)
                        .description("Crisp snow-white organic curds, minimum 1kg head size. Fresh from farm gate.")
                        .status(ListingStatus.ACTIVE)
                        .build(),

                ProductListing.builder()
                        .seller(farmerKoraput)
                        .crop(cropMap.get("Turmeric"))
                        .district(districtMap.get("Koraput"))
                        .quantity(1500.0)
                        .availableQuantity(1100.0)
                        .quality("GRADE_A")
                        .price(new BigDecimal("145.00"))
                        .harvestDate(LocalDate.now().minusDays(10))
                        .availabilityDate(LocalDate.now())
                        .organic(true)
                        .description("High curcumin (>5.2%) indigenous Koraput organic turmeric fingers. Sun-dried and graded.")
                        .status(ListingStatus.ACTIVE)
                        .build(),

                ProductListing.builder()
                        .seller(farmerCuttack)
                        .crop(cropMap.get("Brinjal"))
                        .district(districtMap.get("Cuttack"))
                        .quantity(600.0)
                        .availableQuantity(450.0)
                        .quality("GRADE_A")
                        .price(new BigDecimal("26.00"))
                        .harvestDate(LocalDate.now().minusDays(1))
                        .availabilityDate(LocalDate.now())
                        .organic(false)
                        .description("Fresh Kantabada round purple brinjal. Glossy skin, tender seeds, pesticide-monitored.")
                        .status(ListingStatus.ACTIVE)
                        .build(),

                ProductListing.builder()
                        .seller(farmerSambalpur)
                        .crop(cropMap.get("Onion"))
                        .district(districtMap.get("Balangir"))
                        .quantity(3500.0)
                        .availableQuantity(3000.0)
                        .quality("GRADE_B")
                        .price(new BigDecimal("34.00"))
                        .harvestDate(LocalDate.now().minusDays(3))
                        .availabilityDate(LocalDate.now())
                        .organic(false)
                        .description("Balangir medium red onions, cured skin, long storage shelf life.")
                        .status(ListingStatus.ACTIVE)
                        .build(),

                ProductListing.builder()
                        .seller(farmerKoraput)
                        .crop(cropMap.get("Green Chilli"))
                        .district(districtMap.get("Kalahandi"))
                        .quantity(400.0)
                        .availableQuantity(350.0)
                        .quality("GRADE_A")
                        .price(new BigDecimal("68.00"))
                        .harvestDate(LocalDate.now())
                        .availabilityDate(LocalDate.now())
                        .organic(false)
                        .description("Pungent dark green chillies, fresh harvest, ideal for wholesale and restaurant chains.")
                        .status(ListingStatus.ACTIVE)
                        .build()
        );
        listingRepository.saveAll(listings);

        // 6. Seed Demand Forecasts
        List<DemandForecast> forecasts = Arrays.asList(
                DemandForecast.builder()
                        .crop(cropMap.get("Tomato"))
                        .district(districtMap.get("Khordha"))
                        .currentDemand(14500.0)
                        .predictedDemand(18200.0)
                        .predictedDemandNextMonth(21500.0)
                        .trend("INCREASING")
                        .confidenceScore(0.92)
                        .recommendation("High urban demand in Bhubaneswar/Khordha. Redirect Cuttack surplus to Khordha to stabilize prices.")
                        .forecastWeek(37)
                        .forecastYear(2026)
                        .build(),

                DemandForecast.builder()
                        .crop(cropMap.get("Rice (Paddy)"))
                        .district(districtMap.get("Sambalpur"))
                        .currentDemand(95000.0)
                        .predictedDemand(96200.0)
                        .predictedDemandNextMonth(98000.0)
                        .trend("STABLE")
                        .confidenceScore(0.96)
                        .recommendation("Steady state institutional procurement with high MSP compliance.")
                        .forecastWeek(37)
                        .forecastYear(2026)
                        .build(),

                DemandForecast.builder()
                        .crop(cropMap.get("Turmeric"))
                        .district(districtMap.get("Koraput"))
                        .currentDemand(4200.0)
                        .predictedDemand(6800.0)
                        .predictedDemandNextMonth(8900.0)
                        .trend("INCREASING")
                        .confidenceScore(0.89)
                        .recommendation("Surge in export & nutraceutical interest. Recommend farmers retain Grade A batch for bulk auction.")
                        .forecastWeek(37)
                        .forecastYear(2026)
                        .build(),

                DemandForecast.builder()
                        .crop(cropMap.get("Potato"))
                        .district(districtMap.get("Cuttack"))
                        .currentDemand(22000.0)
                        .predictedDemand(19500.0)
                        .predictedDemandNextMonth(17000.0)
                        .trend("DECREASING")
                        .confidenceScore(0.85)
                        .recommendation("Cold storage releases balancing local supply. Monitor arrivals to prevent glut.")
                        .forecastWeek(37)
                        .forecastYear(2026)
                        .build()
        );
        forecastRepository.saveAll(forecasts);

        // 7. Seed Sample Orders
        Order order1 = Order.builder()
                .orderNumber("OD-AGRI-2026-000101")
                .buyer(buyerBhubaneswar)
                .totalAmount(new BigDecimal("5600.00"))
                .status(Order.OrderStatus.COMPLETED)
                .deliveryAddress("Unit 4 Market, Bhubaneswar, Khordha - 751001")
                .deliveryDistrict("Khordha")
                .notes("Fair trade bulk delivery completed successfully")
                .build();
        orderRepository.save(order1);

        Order order2 = Order.builder()
                .orderNumber("OD-AGRI-2026-000102")
                .buyer(consumerPriya)
                .totalAmount(new BigDecimal("780.00"))
                .status(Order.OrderStatus.CONFIRMED)
                .deliveryAddress("Plot 12, Nayapalli, Bhubaneswar, Khordha - 751012")
                .deliveryDistrict("Khordha")
                .notes("Urgent delivery requested for evening market")
                .build();
        orderRepository.save(order2);

        log.info("KisanSetu Odisha Demo Data successfully seeded! 30 districts, 14 crops, 8 users, 7 listings, 4 forecasts.");
    }

    private District createDistrict(String name, State state, Double lat, Double lon) {
        return District.builder()
                .name(name)
                .state(state)
                .latitude(lat)
                .longitude(lon)
                .build();
    }
}
