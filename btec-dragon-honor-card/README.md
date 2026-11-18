# DRAGON HONOR CARD

Website tri ân 20/11 của **CLB Bóng đá BTEC DRAGON**. Người dùng tìm tên, kéo hoặc chạm quả bóng để ghi bàn, rồi đọc thẻ vinh danh riêng. Dự án chỉ dùng HTML, CSS, Bootstrap 5 và JavaScript ES6, không có backend.

## Chạy trong VS Code

1. Mở thư mục `btec-dragon-honor-card` trong VS Code.
2. Dùng tiện ích **Live Server** và chọn **Open with Live Server** trên `index.html`. Hoặc, nếu đã có Node.js, chạy `node dev-server.cjs` trong thư mục này.
3. Mở địa chỉ localhost được công cụ hiển thị. ES modules cần HTTP server; mở `index.html` trực tiếp qua `file://` có thể bị trình duyệt chặn.

## Logo chính thức

Logo CLB và trường đã có trong `assets/images/dragon-logo.png` và `assets/images/btec-logo.png`. PNG DRAGON chỉ bỏ nền trắng bên ngoài; các pixel logo còn lại giữ đúng màu ảnh gốc. PNG BTEC gốc đã trong suốt nên được dùng nguyên file. Bản gốc cũng được giữ trong thư mục ảnh để đối chiếu.

## Cấu trúc

- `index.html`: ba màn hình, thành phần sân bóng và card.
- `css/style.css`: giao diện chung và tìm kiếm.
- `css/game.css`: sân bóng, khung thành và quả bóng.
- `css/animation.css`: hiệu ứng chuyển cảnh và ghi bàn.
- `css/responsive.css`: card và các điều chỉnh cho mobile.
- `css/overrides.css`: giữ danh sách gợi ý hiển thị ngoài khung tìm kiếm.
- `css/layout.css`: bố cục viewport desktop, cuộn mobile, typography và thẻ vinh danh.
- `js/data.js`: 24 bản ghi và lời chúc nguyên văn.
- `js/search.js`: chuẩn hóa tiếng Việt, gợi ý, tìm gần đúng, bàn phím.
- `js/game.js`: Pointer Events, vùng ghi bàn theo kích thước thực, thao tác dự phòng.
- `js/animations.js`: trình tự GOAL và xuất hiện card.
- `js/card.js`: nội dung thẻ theo người nhận.
- `js/main.js`: trạng thái màn hình, ngôn ngữ và logo.

Sau khi đọc thẻ, nút **Trở về trang chủ** xóa lựa chọn hiện tại, tìm kiếm và card, đồng thời reset bóng và hiệu ứng để bắt đầu lượt mới mà không cần tải lại trang.

## Chuẩn bị deploy Vercel

Đây là static site không cần build. Khi được yêu cầu deploy, tạo repository GitHub chỉ chứa thư mục dự án này (hoặc chọn thư mục này làm **Root Directory** trong Vercel), chọn framework preset **Other**, bỏ trống build command và output directory, rồi deploy. `index.html` ở gốc dự án và các đường dẫn CSS/JS/ảnh đều là đường dẫn tương đối. Bootstrap và Google Fonts tải qua CDN, nên máy truy cập cần mạng để nhận các tài nguyên này.

Chưa push GitHub hoặc deploy Vercel.

Kết quả kiểm thử hiện có và các ca cần kiểm tra thủ công nằm trong `TESTING.md`.

## Checklist kiểm thử

Các mục TC01–TC28 trong yêu cầu gốc cần được kiểm tra trên trình duyệt desktop và mobile trước khi công bố. Chỉ đánh dấu PASS cho các thao tác đã chạy thực tế. Các tình huống quan trọng gồm tìm có dấu/không dấu/gần đúng, Enter khi nhiều kết quả, kéo vào/ngoài khung thành bằng chuột và cảm ứng, chạm hoặc bàn phím để sút, hai lời chúc tiếng Anh, đọc lời chúc dài trên mobile và giảm chuyển động.
