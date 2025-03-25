package com.example.capstone.filter;

import com.example.capstone.util.JwtHelper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class CustomAuthenFilter extends OncePerRequestFilter {

    private final JwtHelper jwtHelper;

    public CustomAuthenFilter(JwtHelper jwtHelper) {
        this.jwtHelper = jwtHelper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authenHeader = request.getHeader("Authorization");
        if(authenHeader != null && authenHeader.startsWith("Bearer ")) {
            String token = authenHeader.substring(7);

            String data = jwtHelper.decodeToken(token);

            if(data != null) {

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken("", "", List.of());

                SecurityContext securityContext = SecurityContextHolder.getContext();
                securityContext.setAuthentication(authenticationToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
