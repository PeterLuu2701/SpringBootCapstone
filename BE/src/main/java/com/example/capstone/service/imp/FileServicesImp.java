package com.example.capstone.service.imp;

import com.example.capstone.service.FileServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileServicesImp implements FileServices {

    //logic code uplaod file
    @Value("${file.upload}")
    private String root;

    @Override
    public void saveFile(MultipartFile file) {
        try{
            Path rootPath = Paths.get(root);
            if(!Files.exists(rootPath)) {
                System.out.println("Attempting to create directory: " + rootPath.toAbsolutePath()); // Debug print
                // Use createDirectories to create parent directories if needed
                Files.createDirectories(rootPath);
                System.out.println("Directory creation attempt finished."); // Debug print
            } else {
                System.out.println("Directory already exists: " + rootPath.toAbsolutePath()); // Debug print
            }

            Path filePath = rootPath.resolve(file.getOriginalFilename());
            System.out.println("Attempting to save file to: " + filePath.toAbsolutePath()); // Debug print
            // Use StandardCopyOption.REPLACE_EXISTING if you want to overwrite
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File saved successfully: " + file.getOriginalFilename()); // Debug print

        } catch (IOException e) {
            // This block will catch specific IO errors like AccessDeniedException
            System.err.println("!! IO Error during file save !!");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace(); // <<<<< THIS IS KEY - IT PRINTS THE REAL REASON
            // Re-throw as a runtime exception so the controller knows it failed
            throw new RuntimeException("Failed to save file: " + file.getOriginalFilename(), e);
        } catch (Exception e) {
            // This catches any other unexpected errors
            System.err.println("!! An unexpected error occurred during file save !!");
            System.err.println("Error message: " + e.getMessage());
            e.printStackTrace(); // <<<<< THIS IS KEY - IT PRINTS THE REAL REASON
            // Re-throw as a runtime exception
            throw new RuntimeException("An unexpected error occurred while saving file: " + file.getOriginalFilename(), e);
        }
    }

    @Override
    public Resource loadFile(String filename) throws FileNotFoundException {
        try{
            Path pathFile = Paths.get(root).resolve(filename);
            //Biến file về kiểu dữ liệu về Resource để kiểm tra nó dễ hơn
            /*File hoặc*/
            Resource resource = new UrlResource(pathFile.toUri());

            // Kiểm tra nếu như resouce tồn tại
            //Kiểm tra cho phép đọc hay không vì sau nay làm việc trên server ngta không có gán quyên cho mình đọc cái
            //file đó luôn , mà không có quyền đọc file đó nên là không có upload file được
            //Resource cho phép mình kiểm tra nó đươc
            //Nếu không có kiểm tra quyền thì xài File được
            if(resource.exists()) {
                return resource;
            } else {
                System.err.println("File not found or not readable: " + pathFile.toAbsolutePath()); // Log
                throw new FileNotFoundException("Could not read file: " + filename);
            }

        } catch (Exception e) {
            System.err.println("Error loading file: "+ e.getMessage());
            e.printStackTrace(); // Print stack trace
            // Wrap and re-throw if it's not a FileNotFoundException already
            throw new RuntimeException("Error accessing file: " + filename, e);
        }
    }
}
