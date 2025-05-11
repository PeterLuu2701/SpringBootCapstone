package com.example.capstone.service.imp;



import com.example.capstone.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;




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
            Path rootPath = Paths.get(root);
            if (!Files.exists(rootPath)) {
                Files.createDirectories(rootPath);
            }
            //thực hiện thao tác upload vô folder của mình
            //thằng files.copy này nhận hai tham số (file.getInputStream() do khách hàng upload lên)
            //tham số thứ 2 là mình sẽ lưu hình này ở đâu thì mình sẽ lưu ngay trong folder rootPath
            //resolve tương đương dấu / của mình thì mình không gán cứng ở đây mình cần nối chuỗi là được
            //resolve hỗ tro tương ứng với
            //getOriginalFilename tên file và định dạng file mình upload lên
            //StandardCopyOption.REPLACE_EXISTING : khi mình upload lên tên file nó có thể bị trùng thì mình sẽ đè lên
            Files.copy(file.getInputStream(),rootPath.resolve(file.getOriginalFilename()),StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            System.out.println("Lỗi upload: "+e.getMessage());
        }


    }


    @Override
    public Resource load(String filename) {
        try{
            Path pathFile=Paths.get(root).resolve(filename);
            Resource resource=new UrlResource(pathFile.toUri());
            if(resource.exists()){
                return resource;
            }
        }catch (Exception e){
            System.out.println("Lỗi upload: "+e.getMessage());
        }
        return null;
    }




}



