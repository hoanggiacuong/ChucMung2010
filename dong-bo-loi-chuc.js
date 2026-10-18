// Đồng bộ lời chúc "Vườn hoa" từ Google Form vào loi-chuc-gop.js.
//
// Cách dùng (nhận cả link lẫn file CSV tải về máy):
//   node dong-bo-loi-chuc.js "<link-CSV-hoặc-đường-dẫn-file-CSV>"
//
// Cách 1 — tải file CSV trực tiếp từ Form (không cần share Sheet):
//   Mở Form -> tab Responses -> bấm icon "⋮" (góc trên phải) -> Download responses (.csv)
//   -> dùng luôn đường dẫn file .csv vừa tải, ví dụ:
//      node dong-bo-loi-chuc.js "C:/Users/Cuong/Downloads/Vuon hoa loi chuc (Responses).csv"
//
// Cách 2 — lấy link CSV của Sheet (nếu Form đã liên kết sẵn 1 Sheet):
//   Mở Sheet chứa câu trả lời của Form -> Share -> "Anyone with the link" (Viewer)
//   -> lấy link sheet trên thanh địa chỉ, dạng:
//      https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXX/edit#gid=0
//   -> đổi thành link CSV (KHÔNG giữ phần &gid=... ở cuối — gid của Sheet trả lời
//      Form thường không phải 0, giữ lại sẽ bị lỗi 400):
//      https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXX/export?format=csv
//
// Form cần đúng 5 câu hỏi theo thứ tự:
//   1. Tên của anh/em                        (bắt buộc)
//   2. Lời chúc cho chị Ngân                 (không bắt buộc — ai không viết thì bỏ trống)
//   3. Lời chúc cho chị Thảo                 (không bắt buộc)
//   4. Lời chúc cho chị Quyên                (không bắt buộc)
//   5. Lời chúc cho chị Quỳnh Anh            (không bắt buộc)
//
// Mỗi ô không trống -> thành 1 bông hoa {tu, loi} trong "Vườn hoa", CHỈ hiện trên
// trang của đúng chị đó (không hiện chung cho cả 4 trang).
//
// Script ghi ĐÈ TOÀN BỘ loi-chuc-gop.js mỗi lần chạy (nguồn thật là Sheet).
// Sau khi chạy xong, nhớ chạy: node tao-trang.js   rồi commit, push.

const fs = require("fs");
const path = require("path");

const KHOA = ["ngan", "thao", "quyen", "quynhanh"];
const TEN_HIEN = { ngan: "Ngân", thao: "Thảo", quyen: "Quyên", quynhanh: "Quỳnh Anh" };

// Parser CSV đơn giản, có xử lý field nằm trong dấu "..." (kể cả có dấu phẩy/xuống dòng bên trong)
function phanTichCSV(text) {
  const hang = [];
  let dong = [];
  let o = "";
  let trongDau = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (trongDau) {
      if (c === '"' && text[i + 1] === '"') { o += '"'; i++; }
      else if (c === '"') { trongDau = false; }
      else { o += c; }
    } else {
      if (c === '"') trongDau = true;
      else if (c === ",") { dong.push(o); o = ""; }
      else if (c === "\r") { /* bỏ qua */ }
      else if (c === "\n") { dong.push(o); hang.push(dong); dong = []; o = ""; }
      else { o += c; }
    }
  }
  if (o.length || dong.length) { dong.push(o); hang.push(dong); }
  return hang.filter((h) => h.length && h.some((x) => x.trim() !== ""));
}

async function layNoiDungCSV(nguon) {
  if (/^https?:\/\//i.test(nguon)) {
    console.log("Đang tải:", nguon);
    const res = await fetch(nguon);
    if (!res.ok) {
      throw new Error(`Tải thất bại: ${res.status} ${res.statusText} - kiểm tra lại quyền chia sẻ của Sheet (phải để "Anyone with the link" xem được).`);
    }
    return res.text();
  }
  console.log("Đang đọc file:", nguon);
  if (!fs.existsSync(nguon)) {
    throw new Error(`Không tìm thấy file: ${nguon}`);
  }
  // Bỏ BOM nếu có (Google hay thêm BOM đầu file khi tải CSV về máy)
  return fs.readFileSync(nguon, "utf8").replace(/^﻿/, "");
}

async function main() {
  const nguon = process.argv[2];
  if (!nguon) {
    console.error('Thiếu nguồn dữ liệu. Dùng: node dong-bo-loi-chuc.js "<link-CSV-hoặc-đường-dẫn-file-CSV>"');
    process.exit(1);
  }

  const text = await layNoiDungCSV(nguon);
  const hang = phanTichCSV(text);
  if (!hang.length) {
    console.error("Sheet rỗng hoặc không đọc được.");
    process.exit(1);
  }
  const dongs = hang.slice(1); // bỏ dòng tiêu đề

  // Mỗi dòng: [Dấu thời gian, Tên, Ngân, Thảo, Quyên, Quỳnh Anh]
  const vuonTheoNguoi = { ngan: [], thao: [], quyen: [], quynhanh: [] };
  let boQua = 0;
  for (const dong of dongs) {
    const ten = (dong[1] || "").trim();
    if (!ten) { boQua++; continue; }
    KHOA.forEach((khoa, i) => {
      const loi = (dong[2 + i] || "").trim();
      if (loi) vuonTheoNguoi[khoa].push({ tu: ten, loi });
    });
  }

  const noiDung = `// File này được tạo tự động bởi dong-bo-loi-chuc.js từ Google Form/Sheet "Vườn hoa".
// ĐỪNG SỬA TAY — chạy lại `+'`'+`node dong-bo-loi-chuc.js <link-vuon-hoa>`+'`'+` sẽ ghi đè toàn bộ file này.
// Đồng bộ lần cuối: ${new Date().toLocaleString("vi-VN")}
// Chạy SAU khi window.NGUOI_NHAN đã có (xem tao-trang.js) và TRƯỚC app.js, nên chỉ cần
// gộp thêm đúng phần của người đang xem trang vào THIEP đang có sẵn.
(function () {
  var THIEP = typeof window !== "undefined" ? window.THIEP : require("./data.js");
  var khoa = typeof window !== "undefined" ? window.NGUOI_NHAN : null;

  // Vườn hoa: lời chúc riêng từng người gửi cho từng chị — chỉ hiện trên đúng trang chị đó
  var vuonTheoNguoi = ${JSON.stringify(vuonTheoNguoi, null, 2).replace(/\n/g, "\n  ")};

  if (khoa && vuonTheoNguoi[khoa]) {
    vuonTheoNguoi[khoa].forEach(function (muc) { THIEP.loiChucTeam.push(muc); });
  }

  if (typeof module !== "undefined") module.exports = THIEP;
})();
`;

  fs.writeFileSync(path.join(__dirname, "loi-chuc-gop.js"), noiDung, "utf8");

  console.log("Xong. Vườn hoa:", KHOA.map((k) => `${TEN_HIEN[k]} +${vuonTheoNguoi[k].length}`).join(", "));
  if (boQua) console.log(`(Bỏ qua ${boQua} dòng thiếu tên)`);
  console.log("Tiếp theo: chạy `node tao-trang.js` rồi commit, push.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
