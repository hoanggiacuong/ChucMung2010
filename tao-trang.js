// Tạo index.html + một trang cho mỗi người trong data.js (ngan.html, thao.html...).
// Mỗi trang có thẻ Open Graph riêng để Telegram hiện "💌 Gửi chị Ngân" khi dán link.
// Chạy: node tao-trang.js
const fs = require("fs");
const path = require("path");
const THIEP = require("./data.js");

const phienBan = Date.now().toString(36); // chống trình duyệt trong Telegram giữ bản cũ
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function trang(khoa, nguoi) {
  const tieuDe = `💌 Gửi ${nguoi.goi}`;
  const moTa = `Có một bất ngờ nhỏ ngày 20/10 dành cho ${nguoi.goi}. Mở ra xem nhé!`;
  const url = THIEP.diaChi + (khoa ? `${khoa}.html` : "");
  const anh = THIEP.diaChi + "cover.png";
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(tieuDe)}</title>
<meta name="description" content="${esc(moTa)}">
<meta name="theme-color" content="#0b0718">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(tieuDe)}">
<meta property="og:description" content="${esc(moTa)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(anh)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💐</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap">
<link rel="stylesheet" href="style.css?v=${phienBan}">
</head>
<body class="khoa">
<div class="sao" id="sao"></div>
<canvas id="troi" aria-hidden="true"></canvas>
<button class="nut-nhac" id="nut-nhac" type="button" aria-label="Bật hoặc tắt nhạc" hidden>♪</button>

<main>
  <section id="mo-dau">
    <div class="mo-dau-chu" id="mo-dau-chu">
      <div class="nho">20 · 10 · ${new Date().getFullYear()}</div>
      <h1>Có một bất ngờ nhỏ<br>dành cho <em id="ten-goi"></em></h1>
      <div class="cham"><span class="vong"><span></span></span>Chạm vào bầu trời</div>
    </div>
    <div class="keo-xuong" id="keo-xuong"><a href="#thu"><span id="keo-chu"></span><b>↓</b></a></div>
  </section>

  <section id="thu">
    <div class="khung"><article class="thu" id="la-thu"></article></div>
  </section>

  <section id="vuon">
    <div class="khung">
      <div class="tieu-de">
        <div class="nho">Vườn hoa của team</div>
        <h2>Mỗi bông hoa một lời chúc</h2>
        <p>Chạm vào từng bông để đọc nhé</p>
      </div>
      <div class="vuon" id="vuon-hoa"></div>
      <div class="dem" id="dem"></div>
    </div>
  </section>

  <section id="qua">
    <div class="khung">
      <div class="tieu-de">
        <div class="nho">Và một món quà</div>
        <h2>Mở hộp ra xem nào</h2>
        <p id="qua-goi-y">Chạm vào hộp quà</p>
      </div>
      <button class="hop" id="hop" type="button" aria-label="Mở hộp quà">
        <span class="anh-sang"></span><span class="than-hop"></span><span class="ruy-bang-doc"></span><span class="nap"></span><span class="no"></span>
      </button>
      <div class="qua-hien" id="qua-hien" hidden>
        <div class="the"><div class="nho">Quà của <span></span></div><p class="ten-qua"></p></div>
      </div>
    </div>
  </section>

  <section id="ket">
    <div class="khung">
      <div class="nho">Từ <span id="tu-cong-ty"></span></div>
      <h2><em>Chúc mừng</em>20 · 10</h2>
      <p id="ket-loi"></p>
      <img id="anh-chung" class="anh-chung" alt="" hidden>
      <button class="nut" id="ban-lai" type="button">🎆 Bắn pháo hoa lần nữa</button>
    </div>
  </section>
</main>

<div class="lop-phu" id="lop-phu" hidden>
  <div class="the" role="dialog" aria-modal="true" aria-labelledby="the-tu">
    <p class="tu" id="the-tu"></p>
    <p id="the-loi"></p>
    <button class="nut" id="the-dong" type="button">Cảm ơn ❤</button>
  </div>
</div>

<script src="data.js?v=${phienBan}"></script>
<script>window.NGUOI_NHAN = ${JSON.stringify(khoa)};</script>
<script src="app.js?v=${phienBan}"></script>
</body>
</html>
`;
}

const thuMuc = __dirname;
fs.writeFileSync(path.join(thuMuc, "index.html"), trang(null, THIEP.chung));
console.log("index.html  →", THIEP.diaChi);
for (const [khoa, nguoi] of Object.entries(THIEP.chiEm)) {
  fs.writeFileSync(path.join(thuMuc, `${khoa}.html`), trang(khoa, nguoi));
  console.log(`${khoa}.html`.padEnd(12), "→", THIEP.diaChi + khoa + ".html", ` (${nguoi.goi})`);
}
