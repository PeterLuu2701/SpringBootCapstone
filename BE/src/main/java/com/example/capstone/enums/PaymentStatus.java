package com.example.capstone.enums;

public enum PaymentStatus {


    PENDING,
    COMPLETED,
    FAILED; // Thêm các trạng thái khác nếu cần

    // Bạn có thể thêm các phương thức tiện ích nếu cần
    // Ví dụ: method để kiểm tra xem trạng thái có phải là completed không
    public boolean isCompleted() {
        return this == COMPLETED;
    }
}
