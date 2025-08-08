package com.example.capstone.service.imp;

import com.example.capstone.dto.BlogDTO;
import com.example.capstone.entity.Blog;
import com.example.capstone.entity.User;
import com.example.capstone.dto.BlogMapper;
import com.example.capstone.repository.BlogRepository;
import com.example.capstone.repository.UserRepository;
import com.example.capstone.service.BlogService;
import com.example.capstone.service.FileService; // Đã thay đổi import
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile; // Đảm bảo import này có

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogServiceImp implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final FileService fileService; // Đã thay đổi kiểu dữ liệu

    public BlogServiceImp(BlogRepository blogRepository, UserRepository userRepository, FileService fileService) { // Đã thay đổi tham số constructor
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
        this.fileService = fileService; // Gán giá trị
    }

    @Override
    public BlogDTO createBlog(BlogDTO blogDTO) {
        User author = userRepository.findById(blogDTO.getAuthorId().intValue())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + blogDTO.getAuthorId()));

        String imageUrl = null;
        if (blogDTO.getImage() != null && !blogDTO.getImage().isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + blogDTO.getImage().getOriginalFilename(); // Tạo tên file duy nhất
            fileService.save(blogDTO.getImage(), fileName); // Sử dụng service và phương thức mới
            imageUrl = "/file/" + fileName; // Tạo URL dựa trên tên file đã lưu
        }

        Blog blog = BlogMapper.toEntity(blogDTO, author, imageUrl); // Pass imageUrl

        Timestamp now = new Timestamp(System.currentTimeMillis());
        blog.setCreatedAt(new Timestamp(System.currentTimeMillis())); // Đảm bảo set giá trị
        blog.setUpdatedAt(new Timestamp(System.currentTimeMillis())); // Đảm bảo set giá trị

        Blog savedBlog = blogRepository.save(blog);
        return BlogMapper.toDTO(savedBlog);
    }

    @Override
    public BlogDTO getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found with id: " + id));
        return BlogMapper.toDTO(blog);
    }

    @Override
    public List<BlogDTO> getAllBlogs() {
        return blogRepository.findAll().stream()
                .map(BlogMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BlogDTO updateBlog(Long id, BlogDTO blogDTO) {
        Blog existingBlog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found with id: " + id));

        User author = userRepository.findById(blogDTO.getAuthorId().intValue())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + blogDTO.getAuthorId()));

        String imageUrl = existingBlog.getImageUrl(); // Giữ lại URL cũ nếu không có file mới
        if (blogDTO.getImage() != null && !blogDTO.getImage().isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + blogDTO.getImage().getOriginalFilename(); // Tạo tên file duy nhất
            fileService.save(blogDTO.getImage(), fileName); // Sử dụng service và phương thức mới
            imageUrl = "/file/" + fileName; // Cập nhật URL mới
        }

        existingBlog.setTitle(blogDTO.getTitle());
        existingBlog.setContent(blogDTO.getContent());
        existingBlog.setAuthor(author);
        existingBlog.setImageUrl(imageUrl);  // Cập nhật imageUrl
        existingBlog.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        Blog updatedBlog = blogRepository.save(existingBlog);
        return BlogMapper.toDTO(updatedBlog);
    }

    @Override
    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
}