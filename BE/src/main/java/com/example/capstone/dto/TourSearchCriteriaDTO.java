package com.example.capstone.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class TourSearchCriteriaDTO {

    private String destination;

    private String  activity;
    private Timestamp start_date;
    private int guest;




}
