package com.example.capstone.controller;

import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import org.json.JSONArray;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private static final Map<String, String> config = new HashMap<String, String>() {
        {
            put("app_id", "2553");
            put("key1", "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL");
            put("key2", "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz");
            put("endpoint", "https://sb-openapi.zalopay.vn/v2/create");
            put("callback_url", "http://localhost:8080/api/payment/callback");
        }
    };

    private static String getCurrentTimeString(String format) {
        Calendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT+7"));
        SimpleDateFormat fmt = new SimpleDateFormat(format);
        fmt.setCalendar(cal);
        return fmt.format(cal.getTimeInMillis());
    }

    private String createHmacSha256(String key, String data) throws Exception {
        Mac sha256Hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256Hmac.init(secretKey);
        byte[] hash = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1)
                hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public static class OrderRequest {
        private Long amount;

        public Long getAmount() {
            return amount;
        }

        public void setAmount(Long amount) {
            this.amount = amount;
        }
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        try {
            Random rand = new Random();
            int randomId = rand.nextInt(1000000);
            final Map<String, Object> embedData = new HashMap<>();
            embedData.put("preferred_payment_method", new String[] { "" }); // Để rỗng để hiển thị tất cả phương thức
            final List<Map<String, Object>> itemList = new ArrayList<>();
            itemList.add(new HashMap<>());

            // Tạo dữ liệu đơn hàng với giá trị amount từ request
            Map<String, Object> order = new HashMap<>();
            order.put("app_id", config.get("app_id"));
            order.put("app_trans_id", getCurrentTimeString("yyMMdd") + "_" + randomId);
            order.put("app_time", System.currentTimeMillis());
            order.put("app_user", "user123");
            order.put("amount", request.getAmount()); // Sử dụng amount từ request
            order.put("description", "Lazada - Payment for the order #" + randomId);
            order.put("bank_code", ""); // Để rỗng để hiển thị cổng thanh toán
            order.put("item", new JSONArray(itemList).toString());
            order.put("embed_data", new JSONObject(embedData).toString());

            // Tạo chữ ký HMAC
            String data = order.get("app_id") + "|" + order.get("app_trans_id") + "|" + order.get("app_user") + "|" +
                    order.get("amount") + "|" + order.get("app_time") + "|" + order.get("embed_data") + "|" +
                    order.get("item");
            order.put("mac", createHmacSha256(config.get("key1"), data));

            // Log chi tiết
            System.out.println("Request to ZaloPay: " + order);
            System.out.println("Data for HMAC: " + data);
            System.out.println("Mac: " + order.get("mac"));
            System.out.println("Item: " + order.get("item"));
            System.out.println("Embed Data: " + order.get("embed_data"));
            System.out.println("App Time: " + new Date((Long) order.get("app_time")).toString());

            // Gửi yêu cầu đến ZaloPay
            CloseableHttpClient client = HttpClients.createDefault();
            HttpPost post = new HttpPost(config.get("endpoint"));

            List<NameValuePair> params = new ArrayList<>();
            for (Map.Entry<String, Object> e : order.entrySet()) {
                params.add(new BasicNameValuePair(e.getKey(), e.getValue().toString()));
            }

            post.setEntity(new UrlEncodedFormEntity(params));
            CloseableHttpResponse res = client.execute(post);

            // Đọc phản hồi
            BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
            StringBuilder resultJsonStr = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                resultJsonStr.append(line);
            }

            // Log phản hồi
            System.out.println("ZaloPay response: " + resultJsonStr.toString());

            JSONObject result = new JSONObject(resultJsonStr.toString());
            Map<String, Object> resultMap = result.toMap();

            // Kiểm tra nếu thanh toán thành công thì gọi callback
            if (resultMap.containsKey("return_code") && resultMap.get("return_code").equals(1)) {
                // Tạo dữ liệu callback giả lập
                Map<String, Object> callbackData = new HashMap<>();
                callbackData.put("app_trans_id", order.get("app_trans_id"));
                callbackData.put("amount", order.get("amount"));
                callbackData.put("app_id", order.get("app_id"));
                callbackData.put("zp_trans_id", resultMap.getOrDefault("zp_trans_id", "123456789"));
                callbackData.put("server_time", System.currentTimeMillis());

                String callbackDataStr = new JSONObject(callbackData).toString();
                String callbackMac = createHmacSha256(config.get("key2"), callbackDataStr);

                // Tạo body cho callback
                Map<String, String> callbackBody = new HashMap<>();
                callbackBody.put("data", callbackDataStr);
                callbackBody.put("mac", callbackMac);

                // Gọi nội bộ tới /api/payment/callback
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                HttpEntity<Map<String, String>> callbackRequest = new HttpEntity<>(callbackBody, headers);

                ResponseEntity<Map> callbackResponse = restTemplate.postForEntity(
                        config.get("callback_url"), callbackRequest, Map.class);
                System.out.println("Callback response: " + callbackResponse.getBody());
            }

            return ResponseEntity.ok(resultMap);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi tạo đơn hàng: " + e.getMessage());
        }
    }

    // DTO để nhận dữ liệu callback từ ZaloPay
    public static class CallbackRequest {
        private String data;
        private String mac;

        public String getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
        }

        public String getMac() {
            return mac;
        }

        public void setMac(String mac) {
            this.mac = mac;
        }
    }

    @PostMapping("/callback")
    public ResponseEntity<?> handleCallback(@RequestBody CallbackRequest cbdata) {
        Map<String, Object> result = new HashMap<>();

        try {
            String dataStr = cbdata.getData();
            String reqMac = cbdata.getMac();

            // Tính lại mac để kiểm tra
            String computedMac = createHmacSha256(config.get("key2"), dataStr);
            System.out.println("Computed Mac: " + computedMac);

            // Kiểm tra callback hợp lệ
            if (!reqMac.equals(computedMac)) {
                result.put("return_code", -1);
                result.put("return_message", "mac not equal");
                System.out.println("Invalid callback: mac not equal");
            } else {
                // Callback hợp lệ, parse data
                JSONObject dataJson = new JSONObject(dataStr);
                String appTransId = dataJson.getString("app_trans_id");
                System.out.println(
                        "Thanh toán thành công: update order's status = success where app_trans_id = " + appTransId);

                result.put("return_code", 1);
                result.put("return_message", "success");
            }
        } catch (Exception e) {
            result.put("return_code", 0); // ZaloPay sẽ thử lại tối đa 3 lần
            result.put("return_message", e.getMessage());
            System.out.println("Callback error: " + e.getMessage());
        }

        return ResponseEntity.ok(result);
    }
}