// components/blog-dashboard/BlogDashboard.js
"use client";
import React from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Link from 'next/link';

const BlogDashboard = () => {
    // Dữ liệu blog mẫu (thay bằng API thật sau)
    const blogs = [
        {
            id: 1,
            title: 'Bài viết thử nghiệm 1',
            description: 'Đây là mô tả ngắn của bài viết thử nghiệm 1.',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            date: '2023-11-16',
        },
        {
            id: 2,
            title: 'Bài viết thử nghiệm 2',
            description: 'Đây là mô tả ngắn của bài viết thử nghiệm 2.',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            date: '2023-11-15',
        },
        {
            id: 3,
            title: 'Bài viết thử nghiệm 3',
            description: 'Đây là mô tả ngắn của bài viết thử nghiệm 3.',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            date: '2023-11-15',
        },
        {
            id: 4,
            title: 'Bài viết thử nghiệm 4',
            description: 'Đây là mô tả ngắn của bài viết thử nghiệm 4.',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            date: '2023-11-15',
        },
        {
            id: 5,
            title: 'Bài viết thử nghiệm 5',
            description: 'Đây là mô tả ngắn của bài viết thử nghiệm 5.',
            imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            date: '2023-11-15',
        },
    ];

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Blog Dashboard</h2>
            <Button variant="primary" className="mb-4" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                Thêm bài viết mới
            </Button>
            <Row>
                {blogs.map((blog) => (
                    <Col md={4} key={blog.id} className="mb-4 d-flex align-items-stretch">
                        <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', }}>
                            <Card.Img variant="top" src={blog.imageUrl} alt={blog.title} style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
                                <Card.Title style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{blog.title}</Card.Title>
                                <Card.Text style={{ fontSize: '0.9rem', color: '#555', flexGrow: 1 }}>{blog.description}</Card.Text>
                                <Card.Text><small className="text-muted">{blog.date}</small></Card.Text>
                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <Link href={`/admin/blog-details/${blog.id}`} passHref>
                                        <Button variant="outline-primary" size="sm" style={{ color: '#007bff', borderColor: '#007bff', textDecoration: 'none' }}
                                                onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = '#007bff'; }}
                                                onMouseLeave={(e) => { e.target.style.color = '#007bff'; e.target.style.backgroundColor = 'transparent'; }}>
                                            Xem chi tiết
                                        </Button>
                                    </Link>
                                    <div>
                                        <Button variant="outline-secondary" size="sm" className="ms-2" style={{ color: '#6c757d', borderColor: '#6c757d', textDecoration: 'none' }}
                                                onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = '#6c757d'; }}
                                                onMouseLeave={(e) => { e.target.style.color = '#6c757d'; e.target.style.backgroundColor = 'transparent'; }}>
                                            Sửa
                                        </Button>
                                        <Button variant="outline-danger" size="sm" className="ms-2" style={{ color: '#dc3545', borderColor: '#dc3545', textDecoration: 'none' }}
                                                onMouseEnter={(e) => { e.target.style.color = 'white'; e.target.style.backgroundColor = '#dc3545'; }}
                                                onMouseLeave={(e) => { e.target.style.color = '#dc3545'; e.target.style.backgroundColor = 'transparent'; }}>
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BlogDashboard;