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
//   phongCach: giao diện riêng: "holo" (Y2K ánh kim), "neon" (đen + neon), "denim" (pastel hoa cúc), "cherry" (cherry cola), "kitty" (hồng dễ thương kiểu Hello Kitty)
//   nhan:   4 sticker kéo thả được (2 cái ở màn mở đầu, 2 cái quanh lá thư), chữ cũng chạy trên băng chữ
//   vibe:   thẻ nhân vật: danhHieu, emoji, hiem (độ hiếm), chiSo: [tên, số 0-100 hoặc "∞"]
//   wrapped: các dấu ấn "một năm qua" của riêng người này: [con số lớn, câu đi kèm, emoji]. Mỗi mục thành một bông hoa riêng trong vườn hoa
// Dùng được cả trên trình duyệt (window.THIEP) lẫn trong node (module.exports).
var THIEP = {
  // Địa chỉ trang trên Cloudflare Pages, dùng cho ảnh xem trước trên Telegram
  diaChi: "https://bbold-gui-chi-em.pages.dev/",
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
        "Cảm ơn chị vì luôn là điểm tựa vững vàng của cả team, nghiêm túc khi cần mà vẫn giữ được sự trẻ con đáng yêu mỗi lúc trò chuyện.",
        "20/10 này chúc chị luôn xinh đẹp, khoẻ mạnh, có thật nhiều dịp đi quẩy concert cùng chị Thảo, và nét vẽ cứ thế mà thăng hoa mãi 🐻🎨"
      ],
      anh: "",
      chibi: "anh/chibi-ngan.jpg",
      phongCach: "holo",
      nhan: ["gấu con Hải Phòng 🐻", "cạ cứng đi concert của chị Thảo 🎤", "lúc nghiêm lúc nghịch", "tay vẽ cứng ✍️"],
      vibe: { danhHieu: "Đại tỷ gấu con Hải Phòng", emoji: "🐻", hiem: "SSR", chiSo: [["Chất đầu gấu", 100], ["Thích đi quẩy concert cùng chị Thảo", 80], ["Nét vẽ", 98]] },
      wrapped: [["Nhiều lần", "rủ chị Thảo đi quẩy concert cùng nhau", "🎤"], ["200+", "bức vẽ ra đời dưới deadline dí sát nút", "🎨"], ["Top 1", "chị cả đầu gấu nhưng tim mềm nhất xóm", "🐻"], ["50/50", "tỉ lệ nghiêm túc và trẻ con mỗi ngày", "🎭"]],
      qua: "Hoa tươi và một bữa tiệc đang đợi chị em 💐🎉"
    },
    thao: {
      goi: "Thảo",
      tenNgan: "Thảo",
      chao: "Thảo ơi,",
      ban: "Thảo",
      loiChuc: [
        "Cảm ơn chị vì chưa khi nào ngừng lo cho mọi người, từ mua đồ, chuẩn bị, đến gọt từng miếng hoa quả cho cả phòng.",
        "20/10 này chúc chị thật nhiều sức khoẻ để bớt ốm vặt, lúc nào cũng hồng hào dễ thương như màu chị thích, và thắng thêm vài trận khẩu chiến với sếp. Mong giấc mơ được ở nhà ngủ nướng sớm thành hiện thực nhé 🩷😴"
      ],
      anh: "",
      chibi: "anh/chibi-thao.jpg",
      phongCach: "kitty",
      nhan: ["hồng là chân ái 🩷", "giọng Nghệ An auto cute", "tổng quản văn phòng", "mơ được ngủ nướng 😴"],
      vibe: { danhHieu: "Tổng quản dễ thương của văn phòng", emoji: "🍑", hiem: "UR", chiSo: [["Độ chăm sóc cả nhà", 100], ["Tốc độ gọt hoa quả", "∞"], ["Độ lầy khi cãi tay đôi với sếp", 95]] },
      wrapped: [["365", "ngày lo cho cả văn phòng từ A-Z", "🧺"], ["200+", "lần đèo chị Ngân đi làm dù người đang mệt", "🛵"], ["∞", "lần 'cãi tay đôi' với sếp mà vẫn thắng lý", "😤"], ["1", "giấc mơ duy nhất: được ở nhà ngủ nướng", "😴"]],
      qua: "Hoa tươi và một bữa tiệc đang đợi chị em 💐🎉"
    },
    quyen: {
      goi: "Quyên",
      tenNgan: "Quyên",
      chao: "Quyên ơi,",
      ban: "Quyên",
      loiChuc: [
        "Cảm ơn Quyên vì luôn âm thầm làm tốt mọi việc, thông minh và chỉn chu trong từng chi tiết.",
        "20/10 này chúc Quyên luôn cao ráo xinh đẹp, công việc vẫn thuận lợi như vốn có, và được người yêu chiều hết mức. Chúc mấy bể thuỷ sinh của Quyên luôn trong xanh, cá béo tròn, và mỗi lần ngắm là thêm một lần thấy bình yên nhé 🐠"
      ],
      anh: "",
      chibi: "anh/chibi-quyen.jpg",
      phongCach: "neon",
      nhan: ["mặt lạnh tim ấm 🖤", "cao nhất hội", "dân chơi thuỷ sinh có số 🐠", "đã có người yêu rồi nha"],
      vibe: { danhHieu: "Cao thủ thuỷ sinh, mặt lạnh tim ấm", emoji: "🐠", hiem: "SSR", chiSo: [["Độ lạnh lúc nghiêm túc", 100], ["Độ thông minh", 100], ["Mê cá cảnh & cây thuỷ sinh", "∞"]] },
      wrapped: [["10", "câu nói trung bình một ngày (đã là nhiều)", "🤐"], ["∞", "niềm vui mỗi khi về nhà ngắm bể cá cảnh tự nuôi", "🐠"], ["1", "nụ cười khiến cả phòng auto tan chảy", "✨"], ["1", "người yêu kém tuổi đang chờ tan ca đón về", "💌"]],
      qua: "Hoa tươi và một bữa tiệc đang đợi chị em 💐🎉"
    },
    quynhanh: {
      goi: "em út Quỳnh Anh",
      tenNgan: "Quỳnh Anh",
      chao: "Quỳnh Anh ơi,",
      ban: "em",
      loiChuc: [
        "Cảm ơn em vì luôn chăm chỉ với công việc của mình, có việc gì cần là sẵn sàng tham gia ngay.",
        "20/10 này chúc em luôn khoẻ mạnh, vui vẻ trong chính thế giới của mình, công việc thuận lợi và được nhiều thương yêu mỗi ngày nhé 🎧🌙"
      ],
      anh: "",
      chibi: "anh/chibi-quynhanh.jpg",
      phongCach: "denim",
      nhan: ["góc riêng là nhà 🎧", "ít nói nhất hội", "cày việc không than vãn", "lặng lẽ mà chất"],
      vibe: { danhHieu: "Bí ẩn nhất team, chăm nhất hội", emoji: "🎧", hiem: "UR", chiSo: [["Độ tập trung trong thế giới riêng", 100], ["Mức độ ít nói", 100], ["Chăm chỉ không nghỉ", "∞"]] },
      wrapped: [["0", "lần than vãn dù việc nhiều cỡ nào", "💪"], ["1", "thế giới riêng không ai chen vào được", "🎧"], ["100%", "độ nghiêm túc mỗi khi ngồi vào bàn làm việc", "📐"], ["Top 1", "em út trầm tính nhưng nội lực nhất team", "🌙"]],
      qua: "Hoa tươi và một bữa tiệc đang đợi chị em 💐🎉"
    }
  },

  // Vườn hoa: mỗi anh em một bông, chạm vào để đọc.
  // Để trống ở đây — lời chúc thật được đồng bộ từ Google Form vào loi-chuc-gop.js
  // (chạy: node dong-bo-loi-chuc.js "<link-CSV>"), riêng cho từng người.
  loiChucTeam: [],
  // Bảng tin: lời chúc của người này luôn hiện đầu tiên, những người khác xếp ngẫu nhiên mỗi lần mở (để trống "" thì ngẫu nhiên hết)
  loiChucDauTien: "Anh Bộ"
};

if (typeof module !== "undefined") module.exports = THIEP;
else window.THIEP = THIEP;
