package com.example.capstone.controller;

import com.example.capstone.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/file")
@CrossOrigin
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {

        Resource file = fileService.load(filename);

        if (file == null) {
            return ResponseEntity.notFound().build();
        }

        String contentType = "application/octet-stream";
        try {
            // Cố gắng xác định Content-Type dựa vào file (đáng tin cậy hơn phần mở rộng)
            contentType = file.getURL().openConnection().getContentType();
            if (contentType == null) {
                // Fallback nếu không xác định được từ file
                if (filename.endsWith(".png")) {
                    contentType = MediaType.IMAGE_PNG_VALUE;
                } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
                    contentType = MediaType.IMAGE_JPEG_VALUE;
                } else if (filename.endsWith(".gif")) {
                    contentType = MediaType.IMAGE_GIF_VALUE;
                }
            }
        } catch (Exception e) {
            System.out.println("Error determining content type: " + e.getMessage());
            // Fallback nếu có lỗi khi xác định từ file
            if (filename.endsWith(".png")) {
                contentType = MediaType.IMAGE_PNG_VALUE;
            } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
                contentType = MediaType.IMAGE_JPEG_VALUE;
            } else if (filename.endsWith(".gif")) {
                contentType = MediaType.IMAGE_GIF_VALUE;
            }
        }


        return ResponseEntity.ok()
                // Bỏ header Content-Disposition để trình duyệt hiển thị ảnh trực tiếp
                // .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, contentType) // Set Content-Type đã xác định
                .body(file);
    }
}