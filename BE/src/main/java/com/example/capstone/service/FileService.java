package com.example.capstone.service;


import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {
     void save(MultipartFile file, String fileName) ;
     Resource load(String filename);

}