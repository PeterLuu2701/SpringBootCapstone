package com.example.capstone.service;

import com.example.capstone.dto.BlogDTO;
import java.util.List;

public interface BlogService {
    BlogDTO createBlog(BlogDTO blogDTO);
    BlogDTO getBlogById(Long id);
    List<BlogDTO> getAllBlogs();
    BlogDTO updateBlog(Long id, BlogDTO blogDTO);
    void deleteBlog(Long id);
}