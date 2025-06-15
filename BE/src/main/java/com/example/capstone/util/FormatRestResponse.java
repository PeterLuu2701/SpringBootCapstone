package com.example.capstone.util;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;

import com.example.capstone.entity.RestResponse;
import com.example.capstone.util.annotation.ApiMessage;

import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class FormatRestResponse implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body,
            MethodParameter returnType,
            MediaType selectedContentType,
            Class selectedConverterType,
            ServerHttpRequest request,
            ServerHttpResponse response) {

        HttpServletResponse servletResponse = ((ServletServerHttpResponse) response).getServletResponse();
        int status = servletResponse.getStatus();

        if (body instanceof String) {
            return body; // String đặc biệt, cần xử lý riêng
        }

        if (status >= 400) {
            return body; // Lỗi thì giữ nguyên response gốc
        }

        RestResponse<Object> res = new RestResponse<>();
        res.setStatusCode(status);

        // Nếu là Page hoặc Slice thì lấy getContent()
        if (body instanceof Page) {
            res.setData(((Page<?>) body).getContent());
        } else if (body instanceof Slice) {
            res.setData(((Slice<?>) body).getContent());
        } else {
            res.setData(body);
        }

        ApiMessage message = returnType.getMethodAnnotation(ApiMessage.class);
        res.setMessage(message != null ? message.value() : "CALL API SUCCESS!");

        return res;
    }

}
