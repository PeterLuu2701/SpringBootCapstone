package com.example.capstone.dto;

import com.example.capstone.dto.BlogDTO;
import com.example.capstone.entity.Blog;
import com.example.capstone.entity.User;

public class BlogMapper {

    public static BlogDTO toDTO(Blog blog) {
        BlogDTO dto = new BlogDTO();
        dto.setId(blog.getId());
        dto.setTitle(blog.getTitle());
        dto.setContent(blog.getContent());
        dto.setCreatedAt(blog.getCreatedAt());
        dto.setUpdatedAt(blog.getUpdatedAt());
        if(blog.getAuthor() != null) {
            dto.setAuthorId(blog.getAuthor().getId().longValue());
        }
        if (blog.getTour() != null) {
            dto.setTourId(blog.getTour().getId());
        }
        dto.setImageUrl(blog.getImageUrl());
        return dto;
    }

    public static Blog toEntity(BlogDTO dto, User author, String imageUrl) { // Thêm tham số User
        Blog blog = new Blog();
        blog.setId(dto.getId());
        blog.setTitle(dto.getTitle());
        blog.setContent(dto.getContent());
        // Không set createdAt, updatedAt ở đây, để service handle
        blog.setAuthor(author); // Set author
        blog.setImageUrl(imageUrl);
        return blog;
    }
}