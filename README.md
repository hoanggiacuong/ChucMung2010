# Chúc mừng 20/10

Thiệp 20/10 cho chị em trong công ty: mở đầu gieo hạt, tưới cây cho hoa nở ra tên rồi mưa hoa, phong thư dấu sáp mở ra lá thư riêng (chữ hiện dần), vườn hoa lời chúc của cả team, hộp quà kèm thẻ cào, màn pháo hoa trái tim kết thúc.

**Một link chung cho cả 4 người** (vào rồi chạm vào lá bài có tên mình):
- https://bbold-gui-chi-em.pages.dev/

**Hoặc link riêng từng người** (mỗi link có ô xem trước riêng khi dán vào Telegram):
- https://bbold-gui-chi-em.pages.dev/ngan.html
- https://bbold-gui-chi-em.pages.dev/thao.html
- https://bbold-gui-chi-em.pages.dev/quyen.html
- https://bbold-gui-chi-em.pages.dev/quynhanh.html

## Sửa nội dung
1. Sửa `data.js`: lời chúc, quà, lời chúc của anh em trong vườn hoa, ảnh
2. Chạy `node tao-trang.js` để tạo lại các trang `.html`
3. Commit và push, khoảng 1–2 phút sau Cloudflare Pages cập nhật

Ảnh chibi: `anh/chibi-*.jpg` (ảnh vuông 400×400). Đổi ảnh thì thay file và sửa trường `chibi` trong `data.js`.

Mỗi người có giao diện riêng (`phongCach` trong `data.js`): `holo` (Y2K ánh kim), `neon` (đen + neon), `denim` (pastel hoa cúc), `cherry` (cherry cola). Sticker kéo thả nằm ở `nhan`, thẻ nhân vật nằm ở `vibe`, các slide "20/10 Wrapped" nằm ở `wrapped`.

Mở đầu: chạm để gieo hạt, tưới 4 lần thì cây lớn, ra nụ, hoa nở với tên ở nhuỵ rồi cánh hoa bay thành mưa hoa. Thẻ nhân vật: người có ảnh chibi phải quay một lượt gacha ở phần thẻ, bấm "Nhận nhân vật" thì thẻ mới lật ra. Ở link chung, màn chọn người chỉ hiện lá bài úp kèm tên để giữ bất ngờ.

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
