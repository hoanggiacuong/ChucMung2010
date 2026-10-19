// File này được tạo tự động bởi dong-bo-loi-chuc.js từ Google Form/Sheet "Vườn hoa".
// ĐỪNG SỬA TAY — chạy lại `node dong-bo-loi-chuc.js <link-vuon-hoa>` sẽ ghi đè toàn bộ file này.
// Đồng bộ lần cuối: 16:49:24 19/10/2026
// Chạy SAU khi window.NGUOI_NHAN đã có (xem tao-trang.js) và TRƯỚC app.js, nên chỉ cần
// gộp thêm đúng phần của người đang xem trang vào THIEP đang có sẵn.
(function () {
  var THIEP = typeof window !== "undefined" ? window.THIEP : require("./data.js");
  var khoa = typeof window !== "undefined" ? window.NGUOI_NHAN : null;

  // Vườn hoa: lời chúc riêng từng người gửi cho từng chị — chỉ hiện trên đúng trang chị đó
  var vuonTheoNguoi = {
    "ngan": [
      {
        "tu": "Gia Cường",
        "loi": "Chúc chị xinh đẹp trẻ trung, ngày 20/10 vui vẻ"
      },
      {
        "tu": "Sơn 6 múi",
        "loi": "Chúc chị Ngân đại ca 20/10 mãi trẻ, mãi ngầu và tiếp tục gánh team artist!"
      },
      {
        "tu": "Anh Bộ",
        "loi": "Chúc em luôn tràn đầy năng lượng! Chúc em đu concert nào cũng săn được vé VIP, lướt TikTok lên xu hướng và giữ vững cái chất \"đầu gấu\" Hải Phòng để vẽ art nào cũng nét căng nhé!"
      },
      {
        "tu": "Nghiệp",
        "loi": "Chúc chị Ngân 20/10 tươi vui, lúc nào cũng rạng rỡ, ăn ngon mặc đẹp và luôn tràn đầy năng lượng tích cực nhé chị!"
      },
      {
        "tu": "Anh Nghĩa",
        "loi": "Chúc Chun 1 ngày 20/10 thật vui, luôn xinh tươi, làm được những điều mình thích nhé! !!"
      }
    ],
    "thao": [
      {
        "tu": "Gia Cường",
        "loi": "Chúc chị mi nhon, ăn ngon ngủ khỏe 20/10"
      },
      {
        "tu": "Sơn 6 múi",
        "loi": "Chúc chị Thảo 20/10 tóc mọc đầy đầu, ăn không béo và sớm có người rước ạ!"
      },
      {
        "tu": "Anh Bộ",
        "loi": "Chúc em lúc nào cũng xinh đẹp, khỏe mạnh, hết hẳn ốm vặt! Chúc kế hoạch giảm cân lần thứ N của em thành công rực rỡ dù chỉ cần nằm ườn. Cảm ơn em luôn chăm chỉ, nhiệt huyết và chu đáo!"
      },
      {
        "tu": "Nghiệp",
        "loi": "Chúc chị Thảo ngày 20/10 thật nhiều niềm vui, lúc nào cũng thong thả, bình yên và có thời gian thư giãn trọn vẹn bên gia đình!"
      },
      {
        "tu": "Anh Nghĩa",
        "loi": "20/10 vui vẻ nha! Chúc em Thảo được ăn ngon,  luôn rạng rỡ!!!"
      }
    ],
    "quyen": [
      {
        "tu": "Gia Cường",
        "loi": "Chúc Quyên 20/10 xinh đẹp,  nhiều yêu thương"
      },
      {
        "tu": "Sơn 6 múi",
        "loi": "Chúc chị luôn xinh đẹp, tìm được nhiều món hợp khẩu vị để ăn uống ngon miệng hơn, tăng cân và luôn khỏe mạnh nhé."
      },
      {
        "tu": "Anh Bộ",
        "loi": "Chúc em luôn xinh đẹp, gánh team xuất sắc! Mong cây luôn xanh, cá luôn khỏe, và menu xúc xích của em luôn sẵn sàng để nạp năng lượng cày việc thật hăng nhé!"
      },
      {
        "tu": "Nghiệp",
        "loi": "Chúc Quyên 20/10 vui vẻ, ngày càng xinh xắn, đi chơi xả ga, ăn hoài không béo và luôn giữ tinh thần thoải mái, yêu đời!"
      },
      {
        "tu": "Anh Nghĩa",
        "loi": "Chúc Quyên 20/10 thật vui, luôn xinh đẹp, yêu đời nhé!"
      }
    ],
    "quynhanh": [
      {
        "tu": "Gia Cường",
        "loi": "Chúc em có ngày lễ nhiều yêu thương và niềm vui."
      },
      {
        "tu": "Sơn 6 múi",
        "loi": "20/10 Chúc Quỳnh Anh luôn giữ được sự bình yên trong thế giới riêng và cứ chăm chỉ tỏa sáng theo cách của riêng mình nhé."
      },
      {
        "tu": "Anh Bộ",
        "loi": "Chúc em út thật nhiều niềm vui và xinh đẹp! Tuy em hướng nội đến mức sắp \"hòa tan\" vào cái màn hình máy tính, nhưng sự tập trung của em làm anh nể thật đấy. Thi thoảng ngước lên cười cái cho xôm nhé!"
      },
      {
        "tu": "Nghiệp",
        "loi": "Chúc Quỳnh Anh ngày 20/10 xinh tươi, lúc nào cũng vui vẻ, yêu đời và luôn gặp thật nhiều may mắn, điều dễ chịu trong cuộc sống!"
      },
      {
        "tu": "Anh Nghĩa",
        "loi": "Chúc Quỳnh Anh 20/10 vui vẻ, có một ngày thoải mái, hạnh phúc!"
      }
    ]
  };

  if (khoa && vuonTheoNguoi[khoa]) {
    vuonTheoNguoi[khoa].forEach(function (muc) { THIEP.loiChucTeam.push(muc); });
  }

  if (typeof module !== "undefined") module.exports = THIEP;
})();
