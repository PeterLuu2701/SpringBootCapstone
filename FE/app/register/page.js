"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.css'; // Import CSS Module
import ReveloLayout from '@/layout/ReveloLayout';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Xử lý logic đăng ký ở đây (gọi API, lưu dữ liệu, v.v.)
    console.log('Đăng ký:', { name, email, password });
  };

  return (
    <ReveloLayout>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Register</h1>
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
    </ReveloLayout>
  );
};

export default RegisterPage;