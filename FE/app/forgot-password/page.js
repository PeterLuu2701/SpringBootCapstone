"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.css'; // Import CSS Module


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Xử lý logic quên mật khẩu ở đây (gọi API, v.v.)
    console.log('Quên mật khẩu:', { email });
    setMessage('Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.');
  };

  return (
    
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Forgot Password</h1>
        {message ? (
          <p className={styles.message}>{message}</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
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
            <button type="submit" className={styles.resetButton}>
              Reset Password
            </button>
          </form>
        )}
        <div className={styles.loginLink}>
          <span>Remember your password?</span>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
    
  );
};

export default ForgotPasswordPage;