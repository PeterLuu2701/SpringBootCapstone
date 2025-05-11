"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.css'; // Import CSS Module
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const baseURL = "http://localhost:8080"; // Thay đổi nếu backend của bạn chạy trên một địa chỉ khác

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/auth/sign-up?email=${email}&password=${password}&username=${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ email, password, username: name }), //Không cần body vì backend nhận từ query params
      });

      const data = await response.json();

      if (response.ok) {
        // Đăng ký thành công
        console.log('Đăng ký thành công:', data);
        // Chuyển hướng đến trang đăng nhập hoặc trang chủ
        router.push("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      } else {
        // Đăng ký thất bại
        console.error('Đăng ký thất bại:', data);
        setError(data.message || "Đăng ký thất bại.");
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại."); 
    }
  };

  return (
    
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Register</h1>
        {error && <p className={styles.error}>{error}</p>} {/* Hiển thị thông báo lỗi */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <div className={styles.inputContainer}>
              <span className={styles.icon}>👤</span>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputContainer}>
              <span className={styles.icon}>📧</span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputContainer}>
              <span className={styles.icon}>🔒</span>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
        <div className={styles.loginLink}>
          <span>Already have an account?</span>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
    
  );
};

export default RegisterPage;