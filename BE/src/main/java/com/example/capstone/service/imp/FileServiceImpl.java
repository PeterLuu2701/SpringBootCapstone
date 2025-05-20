package com.example.capstone.service.imp;

import com.example.capstone.service.FileService;
import org.springframework.beans.factory.annotation.Autowired; // Import Autowired
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.io.IOException; // Import IOException

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.upload}")
    private String root;

    // Thêm Autowired nếu bạn muốn sử dụng constructor injection
    @Autowired
    public FileServiceImpl(@Value("${file.upload}") String root) {
        this.root = root;
    }


    @Override
    public void save(MultipartFile file, String fileName) {
        try {
            Path rootPath = Paths.get(root);
            if (!Files.exists(rootPath)) {
                Files.createDirectories(rootPath);
                //System.out.println("Created upload directory: " + rootPath.toAbsolutePath()); // Debug print
            }
            Path filePath = rootPath.resolve(fileName);
            //System.out.println("Saving file to: " + filePath.toAbsolutePath()); // Debug print
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
           // System.out.println("File saved successfully: " + filePath.toAbsolutePath()); // Debug print
        } catch (Exception e) {
           // System.out.println("Error saving file: " + e.getMessage()); // Debug print
            e.printStackTrace(); // Print stack trace for more detail
            throw new RuntimeException("Could not save the file. Error: " + e.getMessage(), e); // Ném lại ngoại lệ
        }
    }

    @Override
    public Resource load(String filename) {
        try{
            Path pathFile = Paths.get(root).resolve(filename);
            //System.out.println("Attempting to load file from path: " + pathFile.toAbsolutePath()); // Debug print
            Resource resource = new UrlResource(pathFile.toUri());
            if(resource.exists() && resource.isReadable()){ // Kiểm tra cả quyền đọc
               // System.out.println("File found and readable: " + pathFile.toAbsolutePath()); // Debug print
                return resource;
            } else {
                //System.out.println("File not found or not readable at path: " + pathFile.toAbsolutePath()); // Debug print
                // return null; // Hoặc ném ngoại lệ
                throw new RuntimeException("Could not read the file: " + filename);
            }
        }catch (Exception e){
            System.out.println("Error loading file: "+e.getMessage()); // Debug print
            e.printStackTrace(); // Print stack trace for more detail
            throw new RuntimeException("Could not load the file. Error: " + e.getMessage(), e); // Ném lại ngoại lệ
        }
        // return null; // Không cần return null ở đây nếu đã ném ngoại lệ
    }

    //  phương thức xóa file
    // public boolean delete(String filename) {
    //     try {
    //         Path fileToDelete = Paths.get(root).resolve(filename);
    //         return Files.deleteIfExists(fileToDelete);
    //     } catch (IOException e) {
    //         System.out.println("Error deleting file: " + e.getMessage());
    //         e.printStackTrace();
    //         return false;
    //     }
    // }
}