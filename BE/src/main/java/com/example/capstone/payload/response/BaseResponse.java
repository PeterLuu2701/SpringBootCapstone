package com.example.capstone.payload.response;

import lombok.Data;

@Data
public class BaseResponse {
    private int code;
    private String message;
    private Object data;


}
