package com.fitness.activityservice.dto;

import com.fitness.activityservice.model.ActivityType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ActivityRequest {
    private String id;
    private String userId;
    private ActivityType type;
    private Integer duration;
    private LocalDateTime startTime;
    private Map<String , Object> additionalMetric;
    private Integer caloriesBurned;
}

