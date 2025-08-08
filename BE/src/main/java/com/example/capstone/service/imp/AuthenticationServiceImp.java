package com.example.capstone.service.imp;

import com.example.capstone.entity.Role;
import com.example.capstone.entity.User;
import com.example.capstone.repository.RoleRepository;
import com.example.capstone.repository.UserRepository;
import com.example.capstone.service.AuthenticationService;
import com.example.capstone.util.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationServiceImp implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtHelper jwtHelper;

    @Override
    public String authenticate(String email, String password) {
        String data = jwtHelper.decodeToken("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIZWxsbyJ9.HMtvGLNAR0-qD1lgTgvHk4bPLnBBxNBSLQp1k0B5b-Q");
        System.out.println(data);

        String token = "";
        Optional<User> userOptional = userRepository.findByEmail(email);

        if(userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                token = jwtHelper.generateToken(data);
            }
        }
        return token;
    }

    @Override
    public boolean signUp(String email, String password, String username) {
        if (userRepository.findByEmail(email).isPresent()) {
            // User with this email already exists
            return false;
        }

        try {
            // Set default role to USER, which has role_id = 1
            Optional<Role> roleOptional = roleRepository.findById(1L); // Changed from 2L to 1L
            if (roleOptional.isPresent()) {
                Role defaultRole = roleOptional.get();

                User newUser = new User();
                newUser.setEmail(email);
                newUser.setPassword(passwordEncoder.encode(password)); // Hash the password here!
                newUser.setUsername(username);
                newUser.setRole(defaultRole); // Uses the setRole method from the User entity

                userRepository.save(newUser);
                return true;
            } else {
                // Log a warning if the default role (ID 1) is not found.
                // This indicates a database setup or configuration issue.
                System.err.println("Warning: Default role with ID 1 (USER role) not found in the database.");
                return false;
            }
        } catch (Exception e) {
            // Log the full stack trace for detailed debugging
            e.printStackTrace();
            return false;
        }
    }


}
