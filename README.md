# Chúc mừng 20/10

Thiệp 20/10 cho chị em trong công ty: pháo hoa tụ thành tên, lá thư riêng, vườn hoa lời chúc của cả team, hộp quà.

**Link gửi từng người** (mỗi link có ô xem trước riêng khi dán vào Telegram):
- https://hoanggiacuong.github.io/ChucMung2010/ngan.html
- https://hoanggiacuong.github.io/ChucMung2010/thao.html
- https://hoanggiacuong.github.io/ChucMung2010/quyen.html
- https://hoanggiacuong.github.io/ChucMung2010/quynhanh.html

## Sửa nội dung
1. Sửa `data.js`: lời chúc, quà, lời chúc của anh em trong vườn hoa, ảnh
2. Chạy `node tao-trang.js` để tạo lại các trang `.html`
3. Commit và push, khoảng 1–2 phút sau GitHub Pages cập nhật

Ảnh: bỏ vào thư mục `anh/` rồi ghi đường dẫn vào `data.js` (ví dụ `anh: "anh/ngan.jpg"`). Nên thu nhỏ ảnh còn chiều rộng khoảng 1000px.

## Ảnh bìa xem trước
`cover.png` được chụp từ `cover.html` bằng Edge:
```
msedge --headless=new --hide-scrollbars --virtual-time-budget=6000 --window-size=1200,630 --screenshot=cover.png cover.html
```

## Lưu ý với Telegram
- Telegram lưu ô xem trước của link sau lần dán đầu tiên. Thử thì dán vào **Saved Messages**, đừng dán vào nhóm chung
- Đổi ảnh bìa hay tiêu đề sau khi đã dán: nhắn link cho **@WebpageBot** để Telegram cập nhật
- Lời chúc của mọi người nằm chung trong `data.js`, ai mở mã nguồn cũng đọc được. Đừng để thông tin riêng tư
