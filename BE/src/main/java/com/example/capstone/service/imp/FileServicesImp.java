package com.example.capstone.service.imp;

import com.example.capstone.service.FileServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
            Path rootPath = Paths.get(root); // Biến kiểu String thành Path
            if(!Files.exists(rootPath)) {
                Files.createDirectory(rootPath);
            }
            // File.copy sẽ có 2 tham số là InputStream là file của min
            // tham số thứ 2 l mình lưu .resole là hỗ trợ dấu / của mình hỗ trợ hệ điều hành
            //Tham số thứ 3 là để không bị trùng file
            Files.copy(file.getInputStream(), rootPath.resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            System.out.println("Lỗi không có Folder");
        }
    }

    @Override
    public Resource loadFile(String filename) {
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
            }

        } catch (Exception e) {
            System.out.println("Lỗi load file "+ e.getMessage());
        }

        return null;
    }
}
