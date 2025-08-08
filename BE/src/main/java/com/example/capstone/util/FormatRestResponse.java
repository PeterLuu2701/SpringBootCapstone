package com.example.capstone.util;

import com.example.capstone.entity.RestResponse;
import com.example.capstone.util.annotation.ApiMessage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.MethodParameter;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@RestControllerAdvice
public class FormatRestResponse implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        // Chỉ áp dụng cho các phương thức không trả về Resource
        // Điều kiện này giúp Spring tối ưu hóa, nhưng đôi khi vẫn cần kiểm tra trong beforeBodyWrite
        return !returnType.getParameterType().equals(Resource.class);
    }

    @Override
    public Object beforeBodyWrite(Object body,
                                  MethodParameter returnType,
                                  MediaType selectedContentType,
                                  Class selectedConverterType,
                                  ServerHttpRequest request,
                                  ServerHttpResponse response) {

        // **Thêm kiểm tra này để chắc chắn bỏ qua Resource responses**
        if (body instanceof Resource) {
            // Log hoặc debug ở đây nếu bạn thấy nó vẫn vào được đây
            System.out.println("FormatRestResponse bypassing Resource body.");
            return body; // Trả về body gốc (Resource) mà không bọc
        }

        HttpServletResponse servletResponse = ((ServletServerHttpResponse) response).getServletResponse();
        int status = servletResponse.getStatus();
        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(status);

        if (body instanceof String) {
            // Cẩn thận: nếu API trả về String thì FormatRestResponse này sẽ trả về String
            // thay vì bọc nó trong RestResponse. Tùy thuộc vào yêu cầu định dạng response,
            // bạn có thể muốn bọc String này. Nếu muốn bọc String, hãy bỏ dòng này.
            // Ví dụ: res.setData(body); res.setMessage(...); return res;
            return body; // Giữ lại nếu bạn muốn các String response không bị bọc
        }
        if (status >= 400) {
            // Nếu status là lỗi (>= 400), trả về body gốc (thường là đối tượng lỗi)
            return body;
        } else {
            // Đối với response thành công (status < 400) và không phải String/Resource
            res.setData(body);
            ApiMessage message = returnType.getMethodAnnotation(ApiMessage.class);
            res.setMessage(message != null ? message.value() : "CALL API SUCCESS!");
            return res;
        }
    }
}