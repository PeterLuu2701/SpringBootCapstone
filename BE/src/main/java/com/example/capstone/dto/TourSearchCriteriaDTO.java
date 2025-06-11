package com.example.capstone.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TourSearchCriteriaDTO {
    private String destination;
    private String  activity;
    private LocalDate startDate;
    private int guest;




}
