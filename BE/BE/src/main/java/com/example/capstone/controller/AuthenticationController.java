package com.example.capstone.controller;

import com.example.capstone.payload.response.BaseResponse;
import com.example.capstone.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestParam String email, @RequestParam String password) {
//        SecretKey key = Jwts.SIG.HS256.key().build();
//        String secretString = Encoders.BASE64.encode(key.getEncoded());
//
//        System.out.println("Key: " + secretString);

        String token = authenticationService.authenticate(email, password);

        BaseResponse response = new BaseResponse();
        response.setData(token);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String username
    ) {
        boolean isSuccess = authenticationService.signUp(email, password, username);

        BaseResponse response = new BaseResponse();
        response.setData(isSuccess);
        response.setMessage(isSuccess ? "Sign up successful!" : "Sign up failed!");
        response.setCode(isSuccess ? 0 : 1);

        return ResponseEntity.ok(response);
    }

}
