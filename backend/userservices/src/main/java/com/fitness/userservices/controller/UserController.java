package com.fitness.userservices.controller;

import com.fitness.userservices.dto.RegisterRequest;
import com.fitness.userservices.dto.UserResponse;
import com.fitness.userservices.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserProfile(@PathVariable String userId){
        logger.info("User Fetched (In Controller Layer)");
        return ResponseEntity.ok(userService.getUserProfile(userId));
    }

    // we are creating UserResponse & RegisterRequest dto(data transfer object representation)
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request){
        logger.info("User registered (In Controller Layer)");
        return ResponseEntity.ok(userService.register(request));
    }

    @GetMapping("/{userId}/validate")
    public ResponseEntity<Boolean> validateUser(@PathVariable String userId){
        return ResponseEntity.ok(userService.existyByUserId(userId));
    }

}
