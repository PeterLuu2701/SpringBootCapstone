package com.example.capstone.config;

import com.example.capstone.filter.CustomAuthenFilter;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Dùng BCrypt để mã hóa mật khẩu
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            throw new RuntimeException("User not found"); // Không tạo user mặc định
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder); // Đúng cách: Dùng BCryptPasswordEncoder
        return new ProviderManager(List.of(authProvider));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomAuthenFilter customAuthenFilter)
            throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Tắt CSRF để test API
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Không
                                                                                                              // dùng
                                                                                                              // session
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**",
                                "/destination", "/destination/**"
                                ,"/tour","/tour/**", "/blog","/blog/**"
                                ,"/file/**"
                                , "/activity/**"
                                , "/user/**"
                                , "/role/**"
                        )
                        .permitAll() // Các API này không cần login
                        .anyRequest().authenticated() // Còn lại thì cần authentication
                )
                .addFilterBefore(customAuthenFilter, UsernamePasswordAuthenticationFilter.class) // Thêm filter custom
                .build();
    }
}
