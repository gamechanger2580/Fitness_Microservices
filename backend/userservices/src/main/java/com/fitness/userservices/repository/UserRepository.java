package com.fitness.userservices.repository;

import com.fitness.userservices.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);

    Boolean existsByKeyCloakId(String userId);

    User findByEmail(String email);
}