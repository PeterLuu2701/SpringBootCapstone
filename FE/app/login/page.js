"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const baseURL = "http://localhost:8080"; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/auth/sign-in?email=${email}&password=${password}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
      });

      const data = await response.json();

      if (response.ok) {
        
        console.log("Đăng nhập thành công:", data);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", data.data.data); 
          localStorage.setItem("username", email); //Backend chưa trả về username, tạm thời lưu email vào
        }

        // Chuyển hướng đến trang chủ
        router.push("/");
      } else {
        
        setError(data.message || "Đăng nhập thất bại.");
      }
    } catch (err) {
      console.error("Lỗi khi đăng nhập:", err);
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Login</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputContainer}>
                <span className={styles.icon}>👤</span>
                <input
                  type="email"
                  id="email"
                  placeholder="Type your email"
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
                  placeholder="Type your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.forgotPassword}>
              <a href="forgot-password">Forgot password?</a>
            </div>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
          <div className={styles.orSignUp}>
            <span>Or Sign Up Using</span>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>
                <img src="/assets/images/social/facebook.png" alt="Facebook" />
              </a>
              <a href="#" className={styles.socialIcon}>
                <img src="/assets/images/social/instagram.png" alt="Twitter" />
              </a>
              <a href="#" className={styles.socialIcon}>
                <img src="/assets/images/social/google.png" alt="Google" />
              </a>
            </div>
          </div>
          <div className={styles.signUp}>
            <span>Don't have an account?</span>
            <Link href="register">Sign Up</Link>
          </div>
        </div>
      </div>
    
  );
};

export default LoginPage;