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
import java.util.Arrays;
import java.util.List;

@Component
public class CustomAuthenFilter extends OncePerRequestFilter {

    private final JwtHelper jwtHelper;
    private static final List<String> BYPASS_PATHS = Arrays.asList(
            "/file/**"
    );

    public CustomAuthenFilter(JwtHelper jwtHelper) {
        this.jwtHelper = jwtHelper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Get the requested path
        String path = request.getRequestURI();
        // Simple check: does the path start with any of the bypass paths?
        // This is a basic check; for more complex patterns, you might need PatternMatcher
        boolean shouldBypass = BYPASS_PATHS.stream().anyMatch(bypassPath -> path.startsWith(bypassPath));

        // If the path should be bypassed, skip the rest of this filter's logic
        if (shouldBypass) {
            System.out.println("CustomAuthenFilter bypassing: " + path); // Debug print
            filterChain.doFilter(request, response); // Let the request proceed
            return; // Exit this filter
        }
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
