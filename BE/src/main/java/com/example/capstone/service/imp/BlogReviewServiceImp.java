package com.example.capstone.service.imp;

import com.example.capstone.dto.BlogReviewDTO;
import com.example.capstone.entity.Blog;
import com.example.capstone.entity.BlogReview;
import com.example.capstone.entity.User;
import com.example.capstone.dto.BlogReviewMapper;
import com.example.capstone.repository.BlogRepository;
import com.example.capstone.repository.BlogReviewRepository;
import com.example.capstone.repository.UserRepository;
import com.example.capstone.service.BlogReviewService;
import com.example.capstone.service.FileServices;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogReviewServiceImp implements BlogReviewService {

    private final BlogReviewRepository blogReviewRepository;
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final FileServices fileServices;

    public BlogReviewServiceImp(BlogReviewRepository blogReviewRepository, BlogRepository blogRepository, UserRepository userRepository, FileServices fileServices) {
        this.blogReviewRepository = blogReviewRepository;
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
        this.fileServices = fileServices;
    }

    @Override
    public BlogReviewDTO createBlogReview(BlogReviewDTO blogReviewDTO) {
        Blog blog = blogRepository.findById(blogReviewDTO.getBlogId())
                .orElseThrow(() -> new EntityNotFoundException("Blog not found with id: " + blogReviewDTO.getBlogId()));
        User author = userRepository.findById(blogReviewDTO.getAuthorId().intValue())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + blogReviewDTO.getAuthorId()));

        String imageUrl = null;
        if (blogReviewDTO.getImage() != null && !blogReviewDTO.getImage().isEmpty()) {
            fileServices.saveFile(blogReviewDTO.getImage());
            imageUrl = "/file/" + blogReviewDTO.getImage().getOriginalFilename();
        }

        BlogReview blogReview = BlogReviewMapper.toEntity(blogReviewDTO, blog, author, imageUrl);
        blogReview.setReviewDate(new Timestamp(System.currentTimeMillis()));

        BlogReview savedBlogReview = blogReviewRepository.save(blogReview);
        return BlogReviewMapper.toDTO(savedBlogReview);
    }

    @Override
    public BlogReviewDTO getBlogReviewById(Long id) {
        BlogReview blogReview = blogReviewRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("BlogReview not found with id: " + id));
        return BlogReviewMapper.toDTO(blogReview);
    }

    @Override
    public List<BlogReviewDTO> getAllBlogReviews() {
        return blogReviewRepository.findAll().stream()
                .map(BlogReviewMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BlogReviewDTO updateBlogReview(Long id, BlogReviewDTO blogReviewDTO) {
        BlogReview existingBlogReview = blogReviewRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("BlogReview not found with id: " + id));

        Blog blog = blogRepository.findById(blogReviewDTO.getBlogId())
                .orElseThrow(() -> new EntityNotFoundException("Blog not found with id: " + blogReviewDTO.getBlogId()));
        User author = userRepository.findById(blogReviewDTO.getAuthorId().intValue())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + blogReviewDTO.getAuthorId()));

        String imageUrl = null;
        if (existingBlogReview != null && existingBlogReview.getImageUrl() != null){
            imageUrl = existingBlogReview.getImageUrl();
        }
        if (blogReviewDTO.getImage() != null && !blogReviewDTO.getImage().isEmpty()) {
            fileServices.saveFile(blogReviewDTO.getImage());
            imageUrl = "/file/" + blogReviewDTO.getImage().getOriginalFilename();
        }

        existingBlogReview.setBlog(blog);
        existingBlogReview.setAuthor(author);
        existingBlogReview.setRating(blogReviewDTO.getRating());
        existingBlogReview.setComment(blogReviewDTO.getComment());
        existingBlogReview.setImageUrl(imageUrl);
        existingBlogReview.setReviewDate(new Timestamp(System.currentTimeMillis()));

        BlogReview updatedBlogReview = blogReviewRepository.save(existingBlogReview);
        return BlogReviewMapper.toDTO(updatedBlogReview);
    }

    @Override
    public void deleteBlogReview(Long id) {
        blogReviewRepository.deleteById(id);
    }
}