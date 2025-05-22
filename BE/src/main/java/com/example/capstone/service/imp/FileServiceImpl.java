package com.example.capstone.service.imp;

import com.example.capstone.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.upload}")
    private String root;

    @Override
    public void save(MultipartFile file, String fileName) {
        try {
            Path rootPath = Paths.get(root).toAbsolutePath().normalize(); // Normalize đường dẫn
            if (!Files.exists(rootPath)) {
                Files.createDirectories(rootPath);

            }
            Path filePath = rootPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save file: " + fileName, e);
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path rootPath = Paths.get(root).toAbsolutePath().normalize();
            Path pathFile = rootPath.resolve(filename).normalize();
            Resource resource = new UrlResource(pathFile.toUri());
            if (resource.exists() || resource.isReadable()) { // Kiểm tra cả tồn tại và có thể đọc
                return resource;
            } else {
                return null; // Trả về null nếu không tìm thấy hoặc không đọc được
            }
        } catch (Exception e) {
            if (!(e instanceof FileNotFoundException)) { // Vẫn giữ lại logic ném lỗi cho các exception khác
                throw new RuntimeException("Error accessing file: " + filename, e);
            }
            return null;
        }
    }
}