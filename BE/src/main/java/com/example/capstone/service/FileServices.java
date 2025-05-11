package com.example.capstone.service;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;

@Service
public interface FileServices {
    //MultipartFile : Đại diện file của mình giúp lấy được tên file , định dạng file, ..
    void saveFile(MultipartFile file);
    Resource loadFile(String filename) throws FileNotFoundException;;
}
