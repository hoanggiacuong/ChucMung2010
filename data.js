// Nội dung thiệp. Sửa file này rồi chạy: node tao-trang.js
// Mỗi người một mục trong "chiEm"; khoá (ngan, thao...) là tên file link: .../ngan.html
//   goi:    tên trên phong thư và trong ô xem trước Telegram ("Gửi chị Ngân")
//   chao:   dòng mở đầu lá thư ("Chị Ngân ơi,")
//   ban:    cách gọi trong các câu chung ("chị" / "Quyên" / "em")
//   tenNgan: chữ pháo hoa tụ lại trên bầu trời (ngắn thôi cho rõ: "Ngân")
//   anh:    ảnh riêng trong lá thư, ví dụ "anh/ngan.jpg" (để trống nếu không có)
//   chibi:  ảnh mặt/chibi để chọn ở link chung (index.html), ví dụ "anh/chibi-ngan.png"
//           (để trống thì hiện chữ cái đầu tên)
//   qua:    phần quà trong hộp (để trống "" thì ẩn phần bốc quà)
//   phongCach: giao diện riêng: "holo" (Y2K ánh kim), "neon" (đen + neon), "denim" (pastel hoa cúc), "cherry" (cherry cola)
//   nhan:   4 sticker kéo thả được (2 cái ở màn mở đầu, 2 cái quanh lá thư), chữ cũng chạy trên băng chữ
//   vibe:   thẻ nhân vật: danhHieu, emoji, hiem (độ hiếm), chiSo: [tên, số 0-100 hoặc "∞"]
//   wrapped: các slide "20/10 Wrapped": [con số lớn, câu đi kèm, emoji]. Số đứng đầu sẽ chạy từ 0 lên
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
      chibi: "anh/chibi-ngan.jpg",
      phongCach: "holo",
      nhan: ["slay ✨", "it girl 💅", "main character", "10/10 ⭐"],
      vibe: { danhHieu: "Nữ hoàng bình tĩnh", emoji: "🦋", hiem: "SSR", chiSo: [["Độ xinh", 100], ["Bình tĩnh khi deadline dí", 99], ["Nhắc team nộp việc", "∞"]] },
      wrapped: [["37", "lần giữ bình tĩnh khi deadline dí sát nút", "🧘‍♀️"], ["1.204", "tin nhắn \"nộp chưa em?\" đã gửi cho team", "📩"], ["100%", "độ yên tâm của cả team khi có chị", "🛡️"], ["Top 1%", "đồng nghiệp được yêu quý nhất năm", "🏆"]],
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
      chibi: "anh/chibi-thao.jpg",
      phongCach: "neon",
      nhan: ["VIBE CHECK ✅", "✌️ peace", "no cap", "đỉnh nóc kịch trần"],
      vibe: { danhHieu: "Cứu tinh của team", emoji: "⚡", hiem: "UR", chiSo: [["Độ cool", 100], ["Sẵn lòng giúp đỡ", 100], ["Kiên nhẫn với câu hỏi ngớ ngẩn", "∞"]] },
      wrapped: [["999+", "câu hỏi ngớ ngẩn chị đã trả lời mà không cáu", "🙋"], ["24/7", "chế độ sẵn sàng giúp đỡ mọi người", "⚡"], ["0", "lần từ chối khi team cần", "🙅‍♀️"], ["Top 1%", "người cool nhất văn phòng", "😎"]],
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
      chibi: "anh/chibi-quyen.jpg",
      phongCach: "denim",
      nhan: ["soft era ☁️", "daisy girl 🌼", "chill thôi", "certified cutie"],
      vibe: { danhHieu: "Trạm phát năng lượng", emoji: "🌼", hiem: "SSR", chiSo: [["Năng lượng", 100], ["Độ dễ thương", 100], ["Số nơi muốn đi du lịch", "∞"]] },
      wrapped: [["8.760", "giờ phát năng lượng tích cực cho văn phòng", "🔋"], ["∞", "nơi muốn đi du lịch trong năm tới", "✈️"], ["3 phút", "là đủ để cả phòng bật cười", "😂"], ["Top 1%", "nguồn vui của cả team", "🌼"]],
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
      chibi: "anh/chibi-quynhanh.jpg",
      phongCach: "cherry",
      nhan: ["em út vibes 🍒", "cười xỉu 😆", "trà sữa time 🧋", "cưng xỉu"],
      vibe: { danhHieu: "Em út quốc dân", emoji: "🍒", hiem: "UR", chiSo: [["Độ nhiệt tình", 100], ["Nụ cười tỏa nắng", 100], ["Được cả team cưng", "∞"]] },
      wrapped: [["365", "ngày nhiệt tình không nghỉ", "🔥"], ["52", "ly trà sữa (ước tính rất khiêm tốn)", "🧋"], ["1000%", "độ cưng của cả team dành cho em", "🥰"], ["Top 1%", "em út xịn nhất vũ trụ", "🍒"]],
      qua: "Được về sớm một buổi chiều tự chọn 🏃‍♀️"
    }
  },

  // Vườn hoa: mỗi anh em một bông, chạm vào để đọc
  loiChucTeam: [
    { tu: "Sếp Bộ", loi: "Cảm ơn chị em đã luôn đồng hành và giữ lửa cho công ty. Chúc mọi người 20/10 thật hạnh phúc, khoẻ mạnh và thành công." },
    { tu: "Anh Nghĩa", loi: "Chúc các chị em luôn xinh đẹp, vui vẻ, công việc suôn sẻ và ngày nào cũng được cưng như hôm nay." },
    { tu: "Cường", loi: "Chúc chị em luôn vui, khoẻ và xinh đẹp. Văn phòng có mọi người mới thành nhà!" },
    { tu: "Sơn", loi: "Chúc chị em 20/10 nhận thật nhiều hoa, nhiều quà, cười thật nhiều và bớt deadline đi một chút." },
    { tu: "Nghiệp", loi: "Chúc chị em luôn rạng rỡ, mọi điều mong ước đều thành, và mãi là những bông hoa đẹp nhất của team." }
  ]
};

if (typeof module !== "undefined") module.exports = THIEP;
else window.THIEP = THIEP;
