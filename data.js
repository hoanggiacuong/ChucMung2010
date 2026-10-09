// Nội dung thiệp. Sửa file này rồi chạy: node tao-trang.js
// Mỗi người một mục trong "chiEm"; khoá (ngan, thao...) là tên file link: .../ngan.html
//   goi:    tên trên phong thư và trong ô xem trước Telegram ("Gửi chị Ngân")
//   chao:   dòng mở đầu lá thư ("Chị Ngân ơi,")
//   ban:    cách gọi trong các câu chung ("chị" / "Quyên" / "em")
//   tenNgan: chữ pháo hoa tụ lại trên bầu trời (ngắn thôi cho rõ: "Ngân")
//   anh:    ảnh riêng, ví dụ "anh/ngan.jpg" (để trống nếu không có)
//   qua:    phần quà trong hộp (để trống "" thì ẩn phần bốc quà)
// Dùng được cả trên trình duyệt (window.THIEP) lẫn trong node (module.exports).
var THIEP = {
  // Địa chỉ trang sau khi lên GitHub Pages, dùng cho ảnh xem trước trên Telegram
  diaChi: "https://hoanggiacuong.github.io/ChucMung2010/",
  nguoiGui: "Cả team",          // ký tên cuối thư
  congTy: "cả nhà mình",        // "Chúc mừng 20/10 — từ ..."
  anhChung: "",                 // ảnh cả team ở cuối trang, ví dụ "anh/team.jpg"

  // Trang chung (index.html), khi mở link không có tên
  chung: {
    goi: "các chị em",
    tenNgan: "Chị Em",
    chao: "Gửi các chị em,",
    ban: "chị em",
    loiChuc: [
      "Cảm ơn mọi người đã làm văn phòng mình ấm áp, vui vẻ và gọn gàng hơn mỗi ngày.",
      "Chúc chị em 20/10 thật nhiều hoa, nhiều quà, luôn xinh đẹp, khoẻ mạnh và hạnh phúc."
    ],
    anh: "",
    qua: ""
  },

  chiEm: {
    ngan: {
      goi: "chị Ngân",
      tenNgan: "Ngân",
      chao: "Chị Ngân ơi,",
      ban: "chị",
      loiChuc: [
        "Cảm ơn chị vì lúc nào cũng là người bình tĩnh nhất team, kể cả những hôm deadline dí sát nút.",
        "20/10 này chúc chị thật nhiều sức khoẻ, luôn xinh đẹp, cười nhiều hơn và bớt phải nhắc tụi em nộp việc đúng hạn 😄"
      ],
      anh: "",
      qua: "Một buổi spa thư giãn trọn gói 💆‍♀️"
    },
    thao: {
      goi: "chị Thảo",
      tenNgan: "Thảo",
      chao: "Chị Thảo ơi,",
      ban: "chị",
      loiChuc: [
        "Cảm ơn chị đã luôn sẵn lòng giúp mọi người, kể cả những câu hỏi ngớ ngẩn nhất của tụi em.",
        "Chúc chị 20/10 ngập tràn hoa và quà, luôn trẻ trung, xinh đẹp, gia đình êm ấm và mọi điều mong ước đều thành."
      ],
      anh: "",
      qua: "Một bó hoa tươi giao tận bàn mỗi thứ Hai trong tháng 💐"
    },
    quyen: {
      goi: "Quyên",
      tenNgan: "Quyên",
      chao: "Quyên ơi,",
      ban: "Quyên",
      loiChuc: [
        "Văn phòng mà thiếu Quyên chắc sẽ yên tĩnh đến mức buồn ngủ. Cảm ơn Quyên đã mang năng lượng tới mỗi ngày.",
        "Chúc Quyên 20/10 thật vui, công việc thuận lợi, và năm nay đi du lịch được thật nhiều nơi mình thích."
      ],
      anh: "",
      qua: "Voucher trà sữa cả tháng 🧋"
    },
    quynhanh: {
      goi: "em út Quỳnh Anh",
      tenNgan: "Quỳnh Anh",
      chao: "Quỳnh Anh ơi,",
      ban: "em",
      loiChuc: [
        "Em út của team mà làm việc chẳng thua ai. Cảm ơn em vì lúc nào cũng nhiệt tình và vui vẻ.",
        "Chúc em 20/10 thật nhiều niềm vui, học được thật nhiều, luôn xinh xắn và được cả team cưng như giờ nhé!"
      ],
      anh: "",
      qua: "Được về sớm một buổi chiều tự chọn 🏃‍♀️"
    }
  },

  // Vườn hoa: mỗi anh em một bông, chạm vào để đọc
  loiChucTeam: [
    { tu: "Cường", loi: "Chúc chị em luôn vui, khoẻ và xinh đẹp. Văn phòng có mọi người mới thành nhà!" },
    { tu: "Team Dev", loi: "Bug thì còn fix được chứ chị em mà nghỉ là team sập. Chúc 20/10 thật vui!" },
    { tu: "Team Art", loi: "Vẽ cả trăm cái bánh cũng không xinh bằng chị em mình. Chúc luôn rạng rỡ!" },
    { tu: "Team Game Design", loi: "Chúc chị em một năm toàn level dễ, phần thưởng to và không có màn boss nào." },
    { tu: "Team Marketing", loi: "Chỉ số yêu thương dành cho chị em luôn tăng trưởng 100% mỗi ngày!" },
    { tu: "Sếp", loi: "Cảm ơn chị em đã đồng hành cùng công ty. Chúc mọi người luôn hạnh phúc và thành công." }
  ]
};

if (typeof module !== "undefined") module.exports = THIEP;
else window.THIEP = THIEP;
