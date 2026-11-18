# Checklist kiểm thử DRAGON HONOR CARD

Ngày kiểm tra: 19/11/2026. Môi trường hiện tại không cung cấp phiên trình duyệt tương tác, nên các ca cần nhìn giao diện hoặc thao tác chuột/cảm ứng được ghi **Chưa kiểm thử**.

| Ca | Nội dung | Kết quả thực tế |
|---|---|---|
| TC01 | Website mở thành công | **PASS (HTTP)** – `GET /` trả 200 trên local server. |
| TC02 | Logo chính thức hiển thị | **Chưa kiểm thử** – chưa có file logo gốc. |
| TC03 | Tiêu đề xuất hiện | **PASS (mã nguồn)** – `DRAGON HONOR CARD` có trong `index.html`; chưa kiểm tra hình ảnh trình duyệt. |
| TC04 | Ô nhập ở trung tâm | **Chưa kiểm thử** – cần kiểm tra hình ảnh trình duyệt. |
| TC05 | Tìm kiếm chính xác | **PASS (logic)** – kiểm tra hàm tìm kiếm bằng Node. |
| TC06 | Tìm không dấu | **PASS (logic)** – `Nguyen Thanh Long`, `Vinh Phuc` cho đúng kết quả. |
| TC07 | Autocomplete đúng tên | **Chưa kiểm thử UI** – thuật toán trả đúng tên, danh sách gợi ý chưa được thao tác trên trình duyệt. |
| TC08 | Tìm gần đúng | **PASS (logic)** – `Nguyen Thnah Long` cho đúng kết quả. |
| TC09 | Enter chọn đúng người | **Chưa kiểm thử** – cần thao tác bàn phím. |
| TC10 | Khung thành xuất hiện | **Chưa kiểm thử** – cần trình duyệt. |
| TC11 | Kéo bóng bằng chuột | **Chưa kiểm thử** – cần trình duyệt. |
| TC12 | Kéo bóng bằng cảm ứng | **Chưa kiểm thử** – cần thiết bị cảm ứng hoặc mô phỏng. |
| TC13 | Thả ngoài gôn, bóng trở về | **Chưa kiểm thử** – cần trình duyệt. |
| TC14 | Thả vào gôn, ghi bàn | **Chưa kiểm thử** – cần trình duyệt. |
| TC15 | Lưới rung khi impact | **Chưa kiểm thử** – cần trình duyệt. |
| TC16 | Chữ GOAL xuất hiện | **Chưa kiểm thử** – cần trình duyệt. |
| TC17 | Card tự xuất hiện | **Chưa kiểm thử** – cần trình duyệt. |
| TC18 | Tên trên card chính xác | **Chưa kiểm thử UI** – dữ liệu tên đã đối chiếu nguồn. |
| TC19 | Lời chúc tương ứng | **Chưa kiểm thử UI** – 24 bản ghi đã đối chiếu nguyên văn với nguồn. |
| TC20 | Hai lời chúc tiếng Anh | **PASS (dữ liệu)** – đúng 2 bản ghi `language: en`; chưa kiểm thử card. |
| TC21 | Đủ 24 lời chúc riêng | **PASS (dữ liệu)** – 24 ID và 24 lời chúc khác nhau, không có lời chúc trống. |
| TC22 | Không ghi bàn nhiều lần | **Chưa kiểm thử** – cần trình duyệt. |
| TC23 | Reload về trang chủ | **Chưa kiểm thử** – cần trình duyệt. |
| TC24 | Hoạt động trên mobile | **Chưa kiểm thử** – cần trình duyệt mobile. |
| TC25 | Không có lỗi JavaScript nghiêm trọng | **Chưa kiểm thử runtime** – `node --check` đã qua cho mọi file JS. |
| TC26 | Thao tác dự phòng mở card | **Chưa kiểm thử** – cần trình duyệt. |
| TC27 | Lời chúc dài không bị cắt | **Chưa kiểm thử** – cần trình duyệt mobile. |
| TC28 | Giảm chuyển động | **Chưa kiểm thử** – cần bật `prefers-reduced-motion` trong trình duyệt. |

Các file `index.html`, CSS và JS nội bộ đều trả HTTP 200. Kiểm tra cú pháp JavaScript bằng `node --check` đều qua. Chưa xác minh tải Bootstrap/Google Fonts qua CDN trong trình duyệt.

## Kiểm tra sau lần chỉnh sửa UI/UX

Ngày kiểm tra: 19/11/2026. Môi trường vẫn không có phiên trình duyệt tương tác; kết quả logic bên dưới là kiểm tra bằng Node với DOM mô phỏng, không thay thế kiểm tra giao diện trên thiết bị thật.

| Ca | Kết quả |
|---|---|
| TC01–TC05, bố cục desktop/mobile | **Chưa kiểm thử trực quan** ở các viewport yêu cầu. CSS đã chuyển sang Grid `100dvh` trên desktop và cuộn tự nhiên ở tablet/mobile. |
| TC06, font thống nhất | **Chưa kiểm thử trực quan**; CSS dùng hai biến font display/body và các token typography. |
| TC07–TC08, tên thống nhất | **PASS (mã nguồn/logic)**: gợi ý, màn game và card dùng `honorific + name`, không dùng `text-transform` trên tên. Chưa nhìn giao diện. |
| TC09, viết hoa lời chúc | **PASS (dữ liệu)**: không phát hiện chữ thường rõ ràng sau dấu kết câu; bổ sung dấu chấm cuối lời chúc 22. |
| TC10–TC13, dấu tiếng Việt và card dài | **Chưa kiểm thử trực quan**; tên và lời chúc dài đã qua kiểm tra nội dung đầy đủ bằng Node. |
| TC14, nút về trang chủ | **PASS (logic mô phỏng)**: sau card, nút trở về Welcome, xóa input/card và reset bóng. Chưa click trong trình duyệt. |
| TC15, họa tiết không che chữ | **Chưa kiểm thử trực quan**; pseudo-element được đưa sau nội dung bằng z-index. |
| TC16, tìm kiếm/autocomplete | **PASS (logic tìm kiếm)**; danh sách UI chưa được thao tác trong trình duyệt. |
| TC17–TC18, kéo chuột/cảm ứng | **Chưa kiểm thử trên trình duyệt/thiết bị**; kiểm tra logic game mô phỏng xác nhận thả ngoài gôn và ghi bàn. |
| TC19, animation GOAL | **PASS (logic mô phỏng)**: callback cũ bị vô hiệu hóa khi reset và lượt mới chạy được. Chưa kiểm tra hình ảnh chuyển động. |
| TC20–TC21, reset và người tiếp theo | **PASS (logic mô phỏng)**: hai lượt Ian và Joseph nhận đúng card, reset giữa các lượt. |
| TC22, lỗi JavaScript nghiêm trọng | **Chưa kiểm thử runtime trình duyệt**; tất cả file JS qua `node --check` và các kiểm tra logic trên. |

Local server trả HTTP 200 cho `index.html`, toàn bộ CSS và JavaScript nội bộ sau sửa. Ở lần kiểm thử này logo chính thức chưa được cung cấp; kết quả cập nhật logo nằm ở mục tiếp theo.

## Cập nhật logo và căn header

- Đã đưa logo DRAGON và BTEC vào giữa header bằng Grid ba cột; trên điện thoại, hai logo nằm giữa ở hàng riêng.
- Logo BTEC dùng đúng file người dùng cung cấp: SHA-256 của bản đưa vào dự án trùng bản gốc, ảnh đã có alpha trong suốt.
- Logo DRAGON PNG có 1.221.540 pixel nền trong suốt; mọi pixel còn hiển thị có RGB trùng ảnh JPG gốc. Bản chỉnh ảnh tạo lại nét/chữ đã bị loại, không sử dụng trong website.
- Chưa xác minh căn chỉnh bằng trình duyệt hoặc ảnh chụp sau sửa vì phiên trình duyệt tương tác không khả dụng. Cần kiểm tra trực quan desktop và mobile trước khi công bố.
