package com.example.capstone.service.imp;

import com.example.capstone.dto.BlogDTO;
import com.example.capstone.entity.Blog;
import com.example.capstone.entity.User;
import com.example.capstone.dto.BlogMapper;
import com.example.capstone.repository.BlogRepository;
import com.example.capstone.repository.UserRepository;
import com.example.capstone.service.BlogService;
import com.example.capstone.service.FileService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired; // Import Autowired
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogServiceImp implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final FileService fileService; // Inject FileService thông qua constructor

    // Sửa lại constructor để Autowire FileService
    @Autowired
    public BlogServiceImp(BlogRepository blogRepository, UserRepository userRepository, FileService fileService) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
        this.fileService = fileService;
    }

    @Override
    public BlogDTO createBlog(BlogDTO blogDTO) {
        User author = userRepository.findById(blogDTO.getAuthorId().intValue())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + blogDTO.getAuthorId()));

        String imageUrl = null;
        if (blogDTO.getImage() != null && !blogDTO.getImage().isEmpty()) {
            String originalFilename = blogDTO.getImage().getOriginalFilename();
            String fileName = System.currentTimeMillis() + "_" + originalFilename;
            fileService.save(blogDTO.getImage(), fileName);
            // Sửa đường dẫn ở đây
            imageUrl = "/file/" + fileName;  // Tạo URL tương ứng cho FileController
        }

        // Cần thêm logic set Tour nếu blogDTO có tourId
        // Tour tour = null;
        // if (blogDTO.getTourId() != null) {
        //     tour = tourRepository.findById(blogDTO.getTourId()).orElse(null); // Cần inject TourRepository
        // }

        Blog blog = BlogMapper.toEntity(blogDTO, author, imageUrl);
        // if (tour != null) {
        //    blog.setTour(tour); // Set Tour
        // }


        Timestamp now = new Timestamp(System.currentTimeMillis());
        blog.setCreatedAt(now);
        blog.setUpdatedAt(now);

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

        // Cần thêm logic set Tour nếu blogDTO có tourId và bạn muốn cập nhật Tour
        // Tour tour = null;
        // if (blogDTO.getTourId() != null) {
        //     tour = tourRepository.findById(blogDTO.getTourId()).orElse(null); // Cần inject TourRepository
        // }
        // if (tour != null || blogDTO.getTourId() == null) { // Cho phép set Tour null
        //    existingBlog.setTour(tour);
        // }


        String imageUrl = existingBlog.getImageUrl(); // Giữ lại URL cũ nếu không có file mới
        if (blogDTO.getImage() != null && !blogDTO.getImage().isEmpty()) {
            String originalFilename = blogDTO.getImage().getOriginalFilename();
            String fileName = System.currentTimeMillis() + "_" + originalFilename;
            fileService.save(blogDTO.getImage(), fileName);
            // Sửa đường dẫn ở đây
            imageUrl = "/file/" + fileName;  // Cập nhật imageUrl cho FileController
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
        Blog blogToDelete = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found with id: " + id));
        // Thêm logic xóa file ảnh cũ nếu cần
        // if (blogToDelete.getImageUrl() != null && !blogToDelete.getImageUrl().isEmpty()) {
        //     fileService.delete(blogToDelete.getImageUrl().replace("/file/", "")); // Cần thêm phương thức delete và loại bỏ /file/
        // }
        blogRepository.deleteById(id);
    }
}