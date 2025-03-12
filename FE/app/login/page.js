"use client";
import React from "react";
import Link from "next/link";
import styles from "./style.module.css";
import ReveloLayout from "@/layout/ReveloLayout";

const page = () => {
  return (
    <ReveloLayout>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <div className={styles.inputContainer}>
                <span className={styles.icon}>👤</span>
                <input
                  type="text"
                  id="username"
                  placeholder="Type your username"
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
    </ReveloLayout>
  );
};

export default page;
