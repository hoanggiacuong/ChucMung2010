// File này được tạo tự động bởi dong-bo-loi-chuc.js từ Google Form/Sheet "Vườn hoa".
// ĐỪNG SỬA TAY — chạy lại `node dong-bo-loi-chuc.js <link-vuon-hoa>` sẽ ghi đè toàn bộ file này.
// Đồng bộ lần cuối: 16:46:29 18/10/2026
// Chạy SAU khi window.NGUOI_NHAN đã có (xem tao-trang.js) và TRƯỚC app.js, nên chỉ cần
// gộp thêm đúng phần của người đang xem trang vào THIEP đang có sẵn.
(function () {
  var THIEP = typeof window !== "undefined" ? window.THIEP : require("./data.js");
  var khoa = typeof window !== "undefined" ? window.NGUOI_NHAN : null;

  // Vườn hoa: lời chúc riêng từng người gửi cho từng chị — chỉ hiện trên đúng trang chị đó
  var vuonTheoNguoi = {
    "ngan": [
      {
        "tu": "Cường",
        "loi": "Chúc chị xinh đẹp, ngày 20/10 vui vẻ"
      }
    ],
    "thao": [
      {
        "tu": "Cường",
        "loi": "Chúc chị mi nhon, ăn ngon ngủ khỏe 20/10"
      }
    ],
    "quyen": [
      {
        "tu": "Cường",
        "loi": "Chúc Quyên 20/10 xinh đẹp"
      }
    ],
    "quynhanh": [
      {
        "tu": "Cường",
        "loi": "Chúc em nhiều tiền"
      }
    ]
  };

  if (khoa && vuonTheoNguoi[khoa]) {
    vuonTheoNguoi[khoa].forEach(function (muc) { THIEP.loiChucTeam.push(muc); });
  }

  if (typeof module !== "undefined") module.exports = THIEP;
})();
