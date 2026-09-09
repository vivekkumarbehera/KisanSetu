package com.kisansetu.repository;

import com.kisansetu.entity.User;
import com.kisansetu.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    List<User> findByRole(Role role);
    long countByRole(Role role);
    long countByVerified(boolean verified);
}
