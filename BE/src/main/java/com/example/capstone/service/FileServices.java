package com.example.capstone.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileServices {
    //MultipartFile : Đại diện file của mình giúp lấy được tên file , định dạng file, ..
    void saveFile(MultipartFile file);
    Resource loadFile(String filename);
}
