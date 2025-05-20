package com.example.capstone.util;

import org.springframework.core.MethodParameter;
import org.springframework.core.io.Resource; // Import Resource
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.example.capstone.entity.RestResponse;
import com.example.capstone.util.annotation.ApiMessage;

import jakarta.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class FormatRestResponse implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        // Chỉ áp dụng nếu kiểu trả về KHÔNG PHẢI là Resource
        return !Resource.class.isAssignableFrom(returnType.getParameterType());
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
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(status);

        // ResponseBodyAdvice này đã được cấu hình để không hỗ trợ Resource trong supports(),
        // nhưng kiểm tra lại ở đây để đảm bảo an toàn.
        if (body instanceof Resource) {
            // Không định dạng lại response cho file
            return body;
        }


        if (body instanceof String) {
            // Xử lý đặc biệt cho String để tránh bọc lại String JSON
            // Kiểm tra Content-Type
            if (selectedContentType != null && (MediaType.TEXT_HTML.equals(selectedContentType) || MediaType.TEXT_PLAIN.equals(selectedContentType) || MediaType.APPLICATION_JSON.equals(selectedContentType) )) {
                // Nếu là HTML, text, hoặc JSON (do Controller trả về String JSON), không bọc lại
                return body;
            }
        }


        if (status >= 400) {
            // Nếu là response lỗi (>= 400), trả về body nguyên bản
            return body;
        } else {
            res.setData(body);
            ApiMessage message = returnType.getMethodAnnotation(ApiMessage.class);
            res.setMessage(message != null ? message.value() : "CALL API SUCCESS!");
        }
        return res;
    }

}