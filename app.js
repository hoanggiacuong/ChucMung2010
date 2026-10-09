(function () {
  "use strict";
  var D = window.THIEP;
  var P = (window.NGUOI_NHAN && D.chiEm[window.NGUOI_NHAN]) || D.chung;
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var cho = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var ngauNhien = function (a, b) { return a + Math.random() * (b - a); };
  var nhe = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rung = function (ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} };

  /* ---------- Ảnh chibi (để trống thì dùng chữ cái đầu tên) ---------- */
  function chibi(nguoi) {
    return nguoi.chibi ? '<img src="' + esc(nguoi.chibi) + '" alt="">' : "<span>" + esc(Array.from(nguoi.tenNgan)[0]) + "</span>";
  }
  var coGacha = !!P.chibi; // có ảnh chibi thì mở đầu bằng một lượt quay gacha, ảnh để dành lúc lật thẻ
  if (coGacha) {
    $("#mo-dau-chu h1").innerHTML = "Có 1 lượt quay 20/10<br>dành cho <em id=\"ten-goi\"></em>";
    $("#mo-dau-chu .cham").lastChild.textContent = "Chạm để quay ✨";
  }

  /* ---------- Link chung: chọn mặt mình rồi sang thiệp riêng ---------- */
  var khoaNguoi = Object.keys(D.chiEm);
  if (!window.NGUOI_NHAN && khoaNguoi.length) {
    $("#ds-chon").innerHTML = khoaNguoi.map(function (k, i) {
      var n = D.chiEm[k];
      return '<a class="mot-nguoi" href="' + k + '.html" style="animation-delay:' + (0.15 + i * 0.12) + 's">' +
        '<span class="la-up"><i>?</i></span><b>' + esc(n.tenNgan) + "</b></a>"; // lá bài úp: mặt chibi để dành lúc quay gacha
    }).join("");
    $("#chon").hidden = false;
    document.body.classList.add("dang-chon");
    $("#ds-chon").addEventListener("click", function (e) {
      var a = e.target.closest(".mot-nguoi"); if (!a) return;
      e.preventDefault();
      a.classList.add("chon-roi"); document.body.classList.add("roi-di");
      setTimeout(function () { location.href = a.getAttribute("href"); }, 450);
    });
    $("#xem-chung").addEventListener("click", function () {
      $("#chon").classList.add("an");
      document.body.classList.remove("dang-chon");
      setTimeout(function () { $("#chon").hidden = true; }, 500);
    });
  }

  /* ---------- Giao diện riêng từng người: màu pháo hoa, font chữ pháo hoa, thẻ cào ---------- */
  // Thứ tự màu giữ nguyên ý nghĩa: [chính, nhấn (đuôi pháo, pháo liễu), sáng, kem, đậm, phụ, trắng, lạnh]
  var GIAO_DIEN = {
    holo: {
      mau: ["#c7a6ff", "#9ff3ff", "#ffc4f0", "#f0eaff", "#ff8ad8", "#a78bfa", "#ffffff", "#7ef0ff"],
      chuTen: ["700", '"Quicksand", sans-serif'], chuSo: ["700", '"Quicksand", sans-serif'],
      cao: ["#b8c6ff", "#ffd6f5", "#9ff3ff", "#e7d6ff", "#c7a6ff"], chuCao: "rgba(60,30,110,.8)"
    },
    neon: {
      mau: ["#ff3df2", "#c6ff3d", "#ff9cf7", "#eaffb8", "#ff1fa8", "#8a5cff", "#ffffff", "#3dfcff"],
      chuTen: ["800", '"M PLUS Rounded 1c", sans-serif'], chuSo: ["700", '"Quicksand", sans-serif'],
      cao: ["#1a1a1a", "#c6ff3d", "#262626", "#ff3df2", "#111111"], chuCao: "#ffffff"
    },
    denim: {
      mau: ["#ffb3c7", "#ffe08a", "#cfe6ff", "#fffbe8", "#ff8fae", "#a9c9ff", "#ffffff", "#8ec5ff"],
      chuTen: ["italic 700", '"Fraunces", serif'], chuSo: ["700", '"Quicksand", sans-serif'],
      cao: ["#9cc7f2", "#e6f2ff", "#7fb0e6", "#fff4c9", "#8ab8ea"], chuCao: "rgba(25,50,90,.8)"
    },
    cherry: {
      mau: ["#ff4d6d", "#ffc98a", "#ffb3c0", "#fff1e0", "#e01e47", "#ff8fa3", "#ffffff", "#ffd27a"],
      chuTen: ["400", '"Pacifico", cursive'], chuSo: ["800", '"Baloo 2", sans-serif'],
      cao: ["#ff8fa3", "#ffe1e7", "#ff4d6d", "#fff1e0", "#e01e47"], chuCao: "rgba(110,10,30,.8)"
    }
  };
  var GD = GIAO_DIEN[P.phongCach] || {
    mau: ["#ff7aa2", "#ffd27a", "#ffb3c7", "#fff1c1", "#ff5d8f", "#c9a7ff", "#ffffff", "#8fe3ff"],
    chuTen: ["700", '"Dancing Script", cursive'], chuSo: ["700", '"Quicksand", sans-serif'],
    cao: ["#e9b949", "#fff1bf", "#d9a43a", "#ffe7a3", "#c98f2a"], chuCao: "rgba(110,60,0,.75)"
  };

  /* ---------- Nội dung ---------- */
  $("#ten-goi").textContent = P.goi;
  $("#keo-chu").textContent = "Kéo xuống, có thư cho " + P.ban;
  $("#pb-ten").textContent = P.goi;

  var thu = '<p class="chao hien-dan">' + esc(P.chao) + "</p>";
  if (P.anh) thu += '<img class="anh-rieng hien-dan" src="' + esc(P.anh) + '" alt="">';
  P.loiChuc.forEach(function (d) { thu += '<p class="hien-dan">' + esc(d) + "</p>"; });
  thu += '<div class="ky hien-dan">Thương mến,<b>' + esc(D.nguoiGui) + "</b></div>";
  $("#la-thu").innerHTML = thu;

  $("#tu-cong-ty").textContent = D.congTy;
  $("#ket-loi").textContent = "Chúc " + P.ban + " một ngày 20/10 thật trọn vẹn, và cả những ngày sau nữa.";
  if (D.anhChung) { var ac0 = $("#anh-chung"); ac0.src = D.anhChung; ac0.hidden = false; }
  if (!P.qua) $("#qua").hidden = true;

  /* ---------- Bầu trời sao, sao băng, cánh hoa rơi ---------- */
  var sao = $("#sao"), html = "";
  for (var i = 0; i < 90; i++) {
    var s = ngauNhien(1, 2.6).toFixed(1);
    html += '<i style="left:' + ngauNhien(0, 100).toFixed(2) + "%;top:" + ngauNhien(0, 100).toFixed(2) +
      "%;width:" + s + "px;height:" + s + "px;animation-delay:-" + ngauNhien(0, 3).toFixed(2) +
      "s;animation-duration:" + ngauNhien(2, 5).toFixed(2) + 's"></i>';
  }
  sao.innerHTML = html;

  function saoBang() {
    if (!document.hidden && !nhe) {
      var b = document.createElement("b");
      b.className = "sao-bang";
      b.style.left = ngauNhien(30, 105) + "%"; b.style.top = ngauNhien(-5, 35) + "%";
      b.addEventListener("animationend", function () { b.remove(); });
      sao.appendChild(b);
    }
    setTimeout(saoBang, ngauNhien(3500, 8000));
  }
  setTimeout(saoBang, 2000);

  function raiCanhHoa() {
    if (nhe) return;
    var lop = $("#canh-hoa"), n = window.innerWidth < 500 ? 11 : 18, h = "";
    for (var k = 0; k < n; k++) {
      h += '<i style="left:' + ngauNhien(-5, 100).toFixed(1) + "%;--s:" + ngauNhien(9, 17).toFixed(1) + "px;--t:" + ngauNhien(11, 20).toFixed(1) +
        "s;--d:-" + ngauNhien(0, 20).toFixed(1) + "s;--dx:" + ngauNhien(-25, 25).toFixed(0) + "vw;--x:" + ngauNhien(2.5, 5).toFixed(1) + 's"></i>';
    }
    lop.innerHTML = h;
    lop.classList.add("hien");
  }

  /* ---------- Âm thanh: hộp nhạc tự tổng hợp, không cần file ---------- */
  var am = null, tong, nhacBat = false, nhipKe = 0, gioKe = 0, henNhac = null, nhieu = null;
  var GIAI = [76, 79, 84, 83, 79, 76, 77, 81, 84, 81, 0, 79, 76, 79, 81, 79, 76, 72, 74, 77, 76, 72, 0, 0];
  var BASS = [48, 43, 41, 43, 45, 48, 43, 48];
  var HOP_AM = [[60, 64, 67], [59, 62, 67], [60, 65, 69], [59, 62, 65], [60, 64, 69], [60, 64, 67], [59, 62, 65], [60, 64, 67]];
  var hz = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };

  function khoiAm() {
    if (am) { if (am.state === "suspended") am.resume(); return; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    am = new AC();
    tong = am.createGain(); tong.gain.value = 0.55;
    var tre = am.createDelay(), hoi = am.createGain(), vang = am.createGain();
    tre.delayTime.value = 0.33; hoi.gain.value = 0.32; vang.gain.value = 0.35;
    tong.connect(am.destination); tong.connect(tre); tre.connect(hoi); hoi.connect(tre); tre.connect(vang); vang.connect(am.destination);
    var buf = am.createBuffer(1, am.sampleRate * 0.6, am.sampleRate), d = buf.getChannelData(0);
    for (var k = 0; k < d.length; k++) d[k] = Math.random() * 2 - 1;
    nhieu = buf;
  }
  function not(m, t, dai, to) {
    var o = am.createOscillator(), o2 = am.createOscillator(), g = am.createGain(), g2 = am.createGain();
    o.type = "sine"; o.frequency.value = hz(m);
    o2.type = "sine"; o2.frequency.value = hz(m) * 2; g2.gain.value = 0.22;
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(tong);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(to, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dai);
    o.start(t); o2.start(t); o.stop(t + dai + 0.05); o2.stop(t + dai + 0.05);
  }
  function keNhac() {
    var NHIP = 0.38;
    while (gioKe < am.currentTime + 0.5) {
      var b = nhipKe % GIAI.length, o = Math.floor(b / 3) % BASS.length, phach = b % 3;
      if (GIAI[b]) not(GIAI[b], gioKe, 1.8, 0.16);
      if (phach === 0) not(BASS[o], gioKe, 2.2, 0.13);
      else HOP_AM[o].forEach(function (m) { not(m, gioKe, 0.9, 0.035); });
      nhipKe++; gioKe += NHIP;
    }
  }
  function batNhac() {
    khoiAm(); if (!am) return;
    nhacBat = true;
    tong.gain.cancelScheduledValues(am.currentTime);
    tong.gain.setTargetAtTime(0.55, am.currentTime, 0.1);
    gioKe = am.currentTime + 0.1;
    clearInterval(henNhac); henNhac = setInterval(keNhac, 120); keNhac();
    $("#nut-nhac").classList.remove("tat");
  }
  function tatNhac() {
    nhacBat = false; clearInterval(henNhac);
    if (am) tong.gain.setTargetAtTime(0, am.currentTime, 0.1);
    $("#nut-nhac").classList.add("tat");
  }
  function tiengNo(to) {
    if (!am || !nhacBat) return;
    var src = am.createBufferSource(), loc = am.createBiquadFilter(), g = am.createGain(), t = am.currentTime;
    src.buffer = nhieu; loc.type = "lowpass"; loc.frequency.value = ngauNhien(500, 1100);
    g.gain.setValueAtTime(to || 0.35, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    src.connect(loc); loc.connect(g); g.connect(am.destination); src.start(t); src.stop(t + 0.6);
  }
  var lanLach = 0;
  function tiengLach() { // tiếng lách tách: vài tiếng nổ nhỏ cao, rải trong 0.4s
    if (!am || !nhacBat || am.currentTime - lanLach < 0.25) return;
    lanLach = am.currentTime;
    for (var k = 0; k < 7; k++) {
      var src = am.createBufferSource(), loc = am.createBiquadFilter(), g = am.createGain(), t = am.currentTime + ngauNhien(0, 0.4);
      src.buffer = nhieu; loc.type = "highpass"; loc.frequency.value = ngauNhien(2500, 5000);
      g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      src.connect(loc); loc.connect(g); g.connect(am.destination); src.start(t, ngauNhien(0, 0.5)); src.stop(t + 0.05);
    }
  }
  function tiengChuong() {
    if (!am || !nhacBat) return;
    [84, 88, 91, 96].forEach(function (m, k) { not(m, am.currentTime + k * 0.09, 1.4, 0.12); });
  }
  function tiengXoet() { // tiếng mở phong thư
    if (!am || !nhacBat) return;
    var src = am.createBufferSource(), loc = am.createBiquadFilter(), g = am.createGain(), t = am.currentTime;
    src.buffer = nhieu; loc.type = "bandpass"; loc.Q.value = 0.8;
    loc.frequency.setValueAtTime(900, t); loc.frequency.exponentialRampToValueAtTime(3500, t + 0.35);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.18, t + 0.05); g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    src.connect(loc); loc.connect(g); g.connect(am.destination); src.start(t); src.stop(t + 0.45);
  }
  $("#nut-nhac").addEventListener("click", function () { nhacBat ? tatNhac() : batNhac(); });
  document.addEventListener("visibilitychange", function () {
    if (!am) return;
    if (document.hidden) am.suspend(); else if (nhacBat) am.resume();
  });

  /* ---------- Pháo hoa ---------- */
  var cv = $("#troi"), cx = cv.getContext("2d"), W = 0, H = 0;
  var cvGiay = document.createElement("canvas"), cg = cvGiay.getContext("2d"); // giấy màu: canvas riêng, xoá sạch mỗi khung
  cvGiay.className = "giay-mau"; cvGiay.setAttribute("aria-hidden", "true"); cv.parentNode.insertBefore(cvGiay, cv.nextSibling);
  function doKichThuoc() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cvGiay.width = cv.width; cvGiay.height = cv.height; cg.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  doKichThuoc();
  window.addEventListener("resize", doKichThuoc);

  var MAU = GD.mau;
  var MAU_GIAY = [MAU[0], MAU[1], MAU[5], MAU[7], "#ffffff", MAU[4], MAU[2]];
  var DOM = MAU.map(function (c) {
    var s = document.createElement("canvas"); s.width = s.height = 32;
    var g = s.getContext("2d"), r = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    r.addColorStop(0, "#fff"); r.addColorStop(0.22, c); r.addColorStop(0.5, c + "55"); r.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = r; g.fillRect(0, 0, 32, 32); return s;
  });
  var LOE = MAU.map(function (c) { // quầng sáng lớn khi nổ, soi sáng cả bầu trời
    var s = document.createElement("canvas"); s.width = s.height = 128;
    var g = s.getContext("2d"), r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    r.addColorStop(0, c + "cc"); r.addColorStop(0.3, c + "44"); r.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = r; g.fillRect(0, 0, 128, 128); return s;
  });
  var hat = [], phao = [], giay = [], loe = [], tiLe = function () { return Math.min(W, H) / 400; };
  var chiSo = function () { return Math.floor(Math.random() * MAU.length); };
  var trongKhoang = function (k, mac) { return k ? ngauNhien(k[0], k[1]) : mac; };

  /* Nổ một quả. tuyChon.hinh: "cuc" (mặc định, toả tròn đặc), "vong" (vòng tròn nghiêng), "tim" (trái tim) */
  function no(x, y, n, tuyChon) {
    tuyChon = tuyChon || {};
    var mau = tuyChon.mau || [chiSo(), chiSo()];
    var tocDo = (tuyChon.tocDo || 5) * Math.max(0.8, tiLe()), ra = [], hinh = tuyChon.hinh || "cuc";
    var nghieng = ngauNhien(0.3, 1), xoay = Math.random() * Math.PI * 2;
    for (var k = 0; k < n; k++) {
      var vx, vy;
      if (hinh === "vong") {
        var gv = k / n * Math.PI * 2, vv = tocDo * ngauNhien(0.95, 1), a0 = Math.cos(gv) * vv, b0 = Math.sin(gv) * vv * nghieng;
        vx = a0 * Math.cos(xoay) - b0 * Math.sin(xoay); vy = a0 * Math.sin(xoay) + b0 * Math.cos(xoay);
      } else if (hinh === "tim") {
        var t = k / n * Math.PI * 2, vt = tocDo / 16 * ngauNhien(0.94, 1.03);
        vx = 16 * Math.pow(Math.sin(t), 3) * vt;
        vy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * vt;
      } else {
        var goc = Math.random() * Math.PI * 2, v = tocDo * Math.pow(Math.random(), 0.45);
        vx = Math.cos(goc) * v; vy = Math.sin(goc) * v;
      }
      var p = {
        x: x, y: y, vx: vx, vy: vy + (tuyChon.len || 0),
        song: trongKhoang(tuyChon.song, ngauNhien(55, 100)), toiDa: 100, co: trongKhoang(tuyChon.co, ngauNhien(7, 13)),
        dom: DOM[mau[k % mau.length]], can: tuyChon.can || 0.975, duoi: tuyChon.duoi, lach: tuyChon.lach,
        kieu: tuyChon.giu ? "giu" : "roi", trongLuc: tuyChon.trongLuc == null ? 0.06 : tuyChon.trongLuc,
        pha: Math.random() * 6.28, ke: ngauNhien(0.012, 0.022), tx: x, ty: y
      };
      p.toiDa = p.song; hat.push(p); ra.push(p);
    }
    if (!tuyChon.imLang) {
      tiengNo();
      loe.push({ x: x, y: y, a: 0.9, dom: LOE[mau[0]], r: Math.max(W, H) * 0.55 });
    }
    return ra;
  }
  function ban(x, dichY, khiNo) {
    phao.push({ x: x, y: H + 10, x0: x, y0: H + 10, dichY: dichY, t: 0, dai: ngauNhien(55, 70), khiNo: khiNo });
  }

  /* Các kiểu pháo hoa */
  var KIEU = ["cuc", "cuc", "vong", "lieu", "lach", "tim", "hai"];
  function noKieu(x, y, kieu, to) {
    var s = Math.max(1, tiLe()), c1 = chiSo(), c2 = chiSo();
    if (kieu === "vong") no(x, y, Math.round(72 * s), { hinh: "vong", mau: [c1], tocDo: 5, trongLuc: 0.03 });
    else if (kieu === "hai") {
      no(x, y, Math.round(64 * s), { hinh: "vong", mau: [c1], tocDo: 6, trongLuc: 0.03 });
      no(x, y, Math.round(55 * s), { mau: [c2, 6], tocDo: 2.6, imLang: true });
    } else if (kieu === "lieu") no(x, y, Math.round(70 * s), { mau: [1, 3], tocDo: 4.6, can: 0.962, trongLuc: 0.035, song: [140, 200], co: [5, 8], duoi: true });
    else if (kieu === "lach") no(x, y, Math.round(80 * s), { mau: [c1, 6], tocDo: 5, lach: true, song: [45, 70] });
    else if (kieu === "tim") no(x, y, Math.round(96 * s), { hinh: "tim", mau: [0, 4, 2], tocDo: 4.6 * (to || 1), trongLuc: 0.022, song: [85, 110] });
    else no(x, y, Math.round(ngauNhien(70, 120) * s));
  }
  function banKieu(kieu, x, y, to) {
    x = x == null ? ngauNhien(W * 0.15, W * 0.85) : x;
    y = y == null ? ngauNhien(H * 0.15, H * 0.45) : y;
    ban(x, y, function () { noKieu(x, y, kieu, to); });
  }
  function banNgauNhien() { banKieu(KIEU[Math.floor(Math.random() * KIEU.length)]); }

  function lachTach(x, y) {
    for (var k = 0; k < 4; k++) {
      hat.push({ x: x, y: y, vx: ngauNhien(-1.8, 1.8), vy: ngauNhien(-1.8, 1.8), song: ngauNhien(8, 16), toiDa: 16, co: 5, dom: DOM[6], kieu: "roi", trongLuc: 0.02, can: 0.9 });
    }
    tiengLach();
  }

  /* Giấy màu */
  function phaoGiay(x, y, n, huong) {
    for (var k = 0; k < n; k++) {
      var goc = (huong == null ? -Math.PI / 2 : huong) + ngauNhien(-0.6, 0.6), v = ngauNhien(6, 15) * Math.max(0.8, tiLe() * 0.9);
      giay.push({
        x: x, y: y, vx: Math.cos(goc) * v, vy: Math.sin(goc) * v, goc: Math.random() * 6.28, vg: ngauNhien(-0.25, 0.25),
        w: ngauNhien(5, 9), h: ngauNhien(9, 15), mau: MAU_GIAY[k % MAU_GIAY.length], song: ngauNhien(140, 220), lac: Math.random() * 6.28
      });
    }
  }
  function giayHaiBen() {
    phaoGiay(0, H, 70, -Math.PI / 3);
    phaoGiay(W, H, 70, -Math.PI * 2 / 3);
  }

  var truoc = performance.now(), t0 = 0, daSach = false;
  function khung(bayGio) {
    var f = Math.min((bayGio - truoc) / 16.67, 3); truoc = bayGio; t0 += f;
    if (!hat.length && !phao.length && !giay.length && !loe.length) { // trời trống: xoá một lần rồi thôi
      if (!daSach) { cx.clearRect(0, 0, W, H); cg.clearRect(0, 0, W, H); daSach = true; }
      requestAnimationFrame(khung); return;
    }
    daSach = false;
    cx.globalCompositeOperation = "destination-out";
    cx.fillStyle = "rgba(0,0,0,0.24)"; cx.fillRect(0, 0, W, H);
    cx.globalCompositeOperation = "lighter";

    for (var q = loe.length - 1; q >= 0; q--) {
      var L = loe[q]; L.a *= Math.pow(0.86, f);
      if (L.a < 0.02) { loe.splice(q, 1); continue; }
      cx.globalAlpha = L.a * 0.32;
      cx.drawImage(L.dom, L.x - L.r, L.y - L.r, L.r * 2, L.r * 2);
    }
    for (var k = phao.length - 1; k >= 0; k--) {
      var r = phao[k]; r.t += f;
      var u = Math.min(r.t / r.dai, 1), e = 1 - Math.pow(1 - u, 3);
      r.x = r.x0 + Math.sin(u * 9) * 2; r.y = r.y0 + (r.dichY - r.y0) * e;
      hat.push({ x: r.x, y: r.y, vx: ngauNhien(-0.4, 0.4), vy: ngauNhien(0.5, 1.5), song: 22, toiDa: 22, co: 6, dom: DOM[1], kieu: "roi", trongLuc: 0.02 });
      if (u >= 1) { phao.splice(k, 1); r.khiNo(); }
    }
    for (var j = hat.length - 1; j >= 0; j--) {
      var p = hat[j], a;
      if (p.kieu === "roi") {
        var can = Math.pow(p.can || 0.975, f);
        p.vx *= can; p.vy = p.vy * can + p.trongLuc * f;
        p.x += p.vx * f; p.y += p.vy * f; p.song -= f;
        if (p.song <= 0 || p.y > H + 20) {
          if (p.lach && p.song <= 0) lachTach(p.x, p.y);
          hat.splice(j, 1); continue;
        }
        if (p.duoi && Math.random() < 0.45 * f) {
          hat.push({ x: p.x, y: p.y, vx: 0, vy: 0.25, song: 26, toiDa: 26, co: 4, dom: p.dom, kieu: "roi", trongLuc: 0.012 });
        }
        a = Math.min(1, p.song / p.toiDa * 1.6) * (0.7 + 0.3 * Math.sin(t0 * 0.6 + j));
      } else if (p.kieu === "giu") {
        p.vx *= Math.pow(0.93, f); p.vy *= Math.pow(0.93, f);
        p.x += p.vx * f; p.y += p.vy * f; a = 0.55;
      } else { // "hut": lò xo kéo về điểm đích, lấp lánh nhẹ
        var dx = p.tx + Math.sin(t0 * 0.05 + p.pha) * 0.8 - p.x, dy = p.ty + Math.cos(t0 * 0.05 + p.pha) * 0.8 - p.y;
        var tat = Math.pow(0.86, f);
        p.vx = (p.vx + dx * p.ke * f) * tat; p.vy = (p.vy + dy * p.ke * f) * tat;
        p.x += p.vx * f; p.y += p.vy * f;
        a = 0.38 + 0.22 * Math.sin(t0 * 0.15 + p.pha);
      }
      cx.globalAlpha = a;
      var co = p.kieu === "roi" ? p.co : p.co * 0.75;
      cx.drawImage(p.dom, p.x - co / 2, p.y - co / 2, co, co);
    }

    cg.clearRect(0, 0, W, H);
    for (var m = giay.length - 1; m >= 0; m--) {
      var g = giay[m], hamGiay = Math.pow(0.965, f);
      g.vx *= hamGiay; g.vy = g.vy * hamGiay + 0.22 * f; g.goc += g.vg * f; g.song -= f;
      g.x += (g.vx + Math.sin(t0 * 0.08 + g.lac) * 0.9) * f; g.y += g.vy * f;
      if (g.song <= 0 || g.y > H + 30) { giay.splice(m, 1); continue; }
      cg.globalAlpha = Math.min(1, g.song / 40);
      cg.save(); cg.translate(g.x, g.y); cg.rotate(g.goc); cg.scale(1, Math.cos(t0 * 0.15 + g.lac));
      cg.fillStyle = g.mau; cg.fillRect(-g.w / 2, -g.h / 2, g.w, g.h);
      cg.restore();
    }
    cx.globalAlpha = 1;
    requestAnimationFrame(khung);
  }
  requestAnimationFrame(khung);

  /* Vệt lấp lánh theo ngón tay / chuột */
  var lanVet = 0, daBatDau = false;
  window.addEventListener("pointermove", function (e) {
    if (!daBatDau || nhe) return;
    var bay = performance.now(); if (bay - lanVet < 28) return; lanVet = bay;
    hat.push({ x: e.clientX, y: e.clientY, vx: ngauNhien(-0.6, 0.6), vy: ngauNhien(-0.3, 0.9), song: 34, toiDa: 34, co: ngauNhien(5, 9), dom: DOM[chiSo()], kieu: "roi", trongLuc: 0.03, can: 0.95 });
  }, { passive: true });

  /* Lấy điểm từ một hình vẽ (chữ, trái tim) để các hạt tụ vào */
  function layDiem(ve) {
    var w = Math.max(1, Math.floor(W)), h = Math.max(1, Math.floor(H));
    var c = document.createElement("canvas"); c.width = w; c.height = h;
    var g = c.getContext("2d"); g.fillStyle = "#fff"; ve(g, w, h);
    var d = g.getImageData(0, 0, w, h).data, buoc = Math.max(3, Math.round(Math.min(w, h) / 140)), ra = [];
    for (var y = 0; y < h; y += buoc) for (var x = 0; x < w; x += buoc) if (d[(y * w + x) * 4 + 3] > 128) ra.push({ x: x, y: y });
    return ra;
  }
  function diemChu(chu, kieuChu) { // kieuChu: [độ đậm, họ font]
    return layDiem(function (g, w, h) {
      var co = Math.min(h * 0.2, 190), font = function (s) { return kieuChu[0] + " " + s + "px " + kieuChu[1]; };
      g.font = font(co);
      var rong = g.measureText(chu).width;
      if (rong > w * 0.86) { co *= w * 0.86 / rong; g.font = font(co); }
      g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(chu, w / 2, h * 0.4);
    });
  }
  function diemTim() {
    return layDiem(function (g, w, h) {
      var s = Math.min(w, h) * 0.021, tx = w / 2, ty = h * 0.4;
      g.beginPath();
      for (var t = 0; t < Math.PI * 2; t += 0.02) {
        var x = 16 * Math.pow(Math.sin(t), 3), y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        g.lineTo(tx + x * s, ty + y * s);
      }
      g.fill();
    });
  }
  function tuVao(ds, diem) {
    if (!diem.length) return;
    for (var k = diem.length - 1; k > 0; k--) { var m = Math.floor(Math.random() * (k + 1)), tg = diem[k]; diem[k] = diem[m]; diem[m] = tg; }
    ds.forEach(function (p, k) {
      var d = diem[k % diem.length];
      p.tx = d.x + ngauNhien(-1.5, 1.5); p.ty = d.y + ngauNhien(-1.5, 1.5); p.kieu = "hut";
    });
  }
  function thaRoi(ds) {
    ds.forEach(function (p) {
      p.kieu = "roi"; p.vx = ngauNhien(-1.2, 1.2); p.vy = ngauNhien(-2, 0.5);
      p.trongLuc = ngauNhien(0.02, 0.05); p.song = p.toiDa = ngauNhien(70, 160);
    });
  }

  var fontSan = Promise.race([
    document.fonts ? Promise.all([
      document.fonts.load(GD.chuTen[0] + " 80px " + GD.chuTen[1], P.tenNgan),
      document.fonts.load(GD.chuSo[0] + " 80px " + GD.chuSo[1], "20·10")
    ]) : Promise.resolve(),
    cho(2500)
  ]).catch(function () {});

  /* ---------- Màn mở đầu ---------- */
  var xongMoDau = false, henPhao = null;
  function trinhDien() {
    var x = W / 2, y = H * 0.4, n = W < 500 ? 900 : 1400;
    ban(x, y, function () {
      var ds = no(x, y, n, { giu: true, tocDo: 7, mau: [0, 1, 2, 3, 4, 6] });
      rung(30);
      fontSan.then(function () {
        setTimeout(function () { tuVao(ds, diemChu(P.tenNgan, GD.chuTen)); }, 400);
        setTimeout(function () { tuVao(ds, diemTim()); tiengChuong(); rung([15, 80, 15]); }, 3700);
        setTimeout(function () { tuVao(ds, diemChu("20·10", GD.chuSo)); }, 6200);
        setTimeout(function () {
          thaRoi(ds); ketThucMoDau();
          banKieu("lieu", W * 0.22, H * 0.22); setTimeout(function () { banKieu("lieu", W * 0.78, H * 0.2); }, 350);
        }, 9000);
      });
    });
  }
  function ketThucMoDau() {
    xongMoDau = true;
    document.body.classList.remove("khoa");
    $("#keo-xuong").classList.add("hien");
    raiCanhHoa();
    henPhao = setInterval(function () { if (!document.hidden && dangThay.moDau) banNgauNhien(); }, 3000);
  }
  $("#mo-dau").addEventListener("click", function (e) {
    if (!daBatDau) {
      daBatDau = true;
      batNhac();
      $("#nut-nhac").hidden = false;
      $("#mo-dau-chu").classList.add("an");
      if (coGacha) quayGacha(); else trinhDien();
      return;
    }
    if (e.target.closest(".keo-xuong")) return;
    var x = e.clientX, y = Math.min(e.clientY, H * 0.75);
    banKieu(KIEU[Math.floor(Math.random() * KIEU.length)], x, y);
  });

  /* ---------- Quay gacha: quả cầu đổi màu xanh → tím → vàng → cầu vồng, nổ, lật thẻ chibi ---------- */
  function notGacha(bac) {
    if (!am || !nhacBat) return;
    var t = am.currentTime;
    [0, 4, 7].forEach(function (b, k) { not(60 + bac * 5 + b, t + k * 0.06, 1.1, 0.1); });
  }
  function quayGacha() {
    var g = $("#gacha"), chu = $("#g-chu");
    var MAU_G = ["#7ec8ff", "#b07bff", "#ffd25e", "#ffffff"];
    var LOI = ["Đang triệu hồi…", "Ồ, màu tím nè…", "VÀNG?!", "CẦU VỒNG‼️"];
    var HAT = [[7, 6], [5, 6], [1, 3], [0, 1, 5, 7, 6]];
    $("#g-anh").src = P.chibi;
    $("#g-ten").textContent = P.tenNgan;
    g.hidden = false;
    document.body.classList.add("dang-gacha");
    var buoc = function (k) {
      g.className = "gacha roi m" + (k + 1);
      g.style.setProperty("--g", MAU_G[k]);
      chu.textContent = LOI[k];
      chu.classList.remove("nay"); void chu.offsetWidth; chu.classList.add("nay");
      if (k) no(W / 2, H * 0.45, 30 + k * 25, { tocDo: 2 + k, mau: HAT[k], imLang: true, trongLuc: 0.02 });
      notGacha(k); rung(20 + k * 25);
    };
    requestAnimationFrame(function () { buoc(0); });
    [1, 2, 3].forEach(function (k) { setTimeout(function () { buoc(k); }, nhe ? k * 500 : 900 + k * 1050); });
    setTimeout(function () {
      g.classList.add("mo-the");
      $("#g-loe").classList.add("no");
      chu.textContent = "UR ‼️ Trúng nhân vật cực hiếm!";
      chu.classList.remove("nay"); void chu.offsetWidth; chu.classList.add("nay");
      no(W / 2, H * 0.45, 220, { tocDo: 8, mau: [0, 1, 2, 5, 7, 6] });
      phaoGiay(W / 2, H * 0.45, 90);
      tiengNo(0.6); tiengChuong(); rung([60, 40, 90]);
      setTimeout(function () { $("#g-nhan").hidden = false; }, 1400);
    }, nhe ? 2000 : 4350);
  }
  function nhanNhanVat() {
    var g = $("#gacha");
    if ($("#g-nhan").hidden || g.classList.contains("an")) return;
    g.classList.add("an");
    tiengChuong();
    setTimeout(function () { g.hidden = true; document.body.classList.remove("dang-gacha"); trinhDien(); }, 650);
  }
  $("#gacha").addEventListener("click", nhanNhanVat);

  /* ---------- Phong thư ---------- */
  var phongBi = $("#phong-bi"), laThu = $("#la-thu"), daMoThu = false;
  var tachKyTu = (function () {
    if (window.Intl && Intl.Segmenter) {
      var seg = new Intl.Segmenter("vi", { granularity: "grapheme" });
      return function (s) { return Array.from(seg.segment(s), function (x) { return x.segment; }); };
    }
    return function (s) { return Array.from(s); };
  })();

  /* Chữ hiện dần như đang viết: tách thành từng ký tự, mỗi ký tự trễ hơn một chút */
  function vietThu() {
    var tre = 0;
    laThu.querySelectorAll(".hien-dan").forEach(function (el) {
      if (el.tagName === "P") {
        var toc = el.classList.contains("chao") ? 55 : 22;
        el.innerHTML = tachKyTu(el.textContent).map(function (c) { return '<span class="ch">' + esc(c) + "</span>"; }).join("");
        el.classList.add("ro");
        el.querySelectorAll(".ch").forEach(function (c, k) { c.style.transitionDelay = (tre + k * toc) + "ms"; });
        tre += el.textContent.length * toc + 350;
      } else {
        el.style.transitionDelay = tre + "ms"; tre += 500;
      }
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () { laThu.classList.add("viet"); }); });
    setTimeout(function () { laThu.classList.add("viet-xong"); }, tre + 800);
  }
  function hienHetThu() { // chạm vào thư để hiện hết ngay, khỏi chờ
    if (laThu.classList.contains("viet")) laThu.classList.add("hien-het");
  }

  function moThu() {
    if (daMoThu) return;
    daMoThu = true;
    if (!am) batNhac();
    tiengXoet(); rung(20);
    phongBi.classList.add("mo");
    var r = $("#pb-dau").getBoundingClientRect();
    no(r.left + r.width / 2, r.top + r.height / 2, 46, { tocDo: 3.2, mau: [0, 4, 1], imLang: true, trongLuc: 0.08 });
    $("#pb-goi-y").classList.add("an");
    setTimeout(function () { phongBi.classList.add("lat"); }, 420);
    setTimeout(function () { phongBi.classList.add("rut"); }, 850);
    setTimeout(function () {
      // FLIP: lá thư đang thò ra khỏi phong bì -> nở thành lá thư đầy đủ
      var vo = $(".pb-vo"), dau = laThu.getBoundingClientRect();
      vo.style.height = vo.offsetHeight + "px";
      phongBi.classList.add("xong");
      var cuoi = laThu.getBoundingClientRect();
      if (laThu.animate && !nhe) {
        laThu.animate([
          { transform: "translate(" + (dau.left - cuoi.left) + "px," + (dau.top - cuoi.top) + "px)", width: dau.width + "px", height: dau.height + "px", overflow: "hidden" },
          { transform: "none", width: cuoi.width + "px", height: cuoi.height + "px", overflow: "hidden" }
        ], { duration: 750, easing: "cubic-bezier(.3,.9,.3,1)" });
      }
      setTimeout(function () {
        tiengChuong();
        if (nhe) { laThu.querySelectorAll(".hien-dan").forEach(function (el) { el.classList.add("ro"); }); laThu.classList.add("viet", "viet-xong"); }
        else vietThu();
      }, nhe ? 0 : 650);
    }, 1900);
  }
  phongBi.addEventListener("click", function (e) {
    if (!daMoThu) moThu();
    else if (e.target.closest(".thu")) hienHetThu();
  });

  /* ---------- Hiện dần khi kéo tới ---------- */
  var dangThay = { moDau: true };
  var quanSat = new IntersectionObserver(function (muc) {
    muc.forEach(function (m) {
      var id = m.target.id;
      if (id === "mo-dau") { dangThay.moDau = m.isIntersecting; return; }
      if (!m.isIntersecting) return;
      if (id === "thu") {
        phongBi.classList.add("hien");
      } else if (id === "vibe") {
        $("#the-vibe").classList.add("mo");
      } else if (id === "vuon") {
        $("#vuon-hoa").classList.add("mo");
      } else if (id === "ket" && !m.target.dataset.daBan) {
        m.target.dataset.daBan = "1"; banLoat(3);
      }
      if (id !== "mo-dau") quanSat.unobserve(m.target);
    });
  }, { threshold: 0.3 });
  ["#mo-dau", "#thu", "#vibe", "#vuon", "#ket"].forEach(function (s) { quanSat.observe($(s)); });

  function banLoat(n) { for (var k = 0; k < n; k++) setTimeout(banNgauNhien, k * 450); }

  /* Màn pháo hoa cuối: dồn dập rồi kết bằng ba trái tim */
  var dangDien = false;
  function phaoKetThuc() {
    if (dangDien) return;
    dangDien = true;
    var lich = [[0, "cuc"], [280, "vong"], [560, "lieu"], [900, "lach"], [1200, "hai"], [1450, "lieu"], [1750, "vong"],
      [2050, "lach"], [2300, "cuc"], [2550, "hai"], [2800, "lieu"], [3050, "lach"]];
    lich.forEach(function (l) { setTimeout(function () { banKieu(l[1]); }, l[0]); });
    setTimeout(function () {
      var to = Math.min(1, W / 900) * 0.9 + 0.1, hang = W < 600 ? [[0.5, 0.2], [0.27, 0.46], [0.73, 0.46]] : [[0.22, 0.32], [0.5, 0.24], [0.78, 0.32]];
      hang.forEach(function (v, k) { setTimeout(function () { banKieu("tim", W * v[0], H * v[1], W < 600 ? 0.5 : to); }, k * 160); });
    }, 3700);
    setTimeout(function () { giayHaiBen(); tiengChuong(); rung([20, 60, 20, 60, 40]); dangDien = false; }, 4900);
  }
  $("#ban-lai").addEventListener("click", function () { if (!nhacBat && !am) batNhac(); phaoKetThuc(); });

  /* ---------- Sticker kéo thả ---------- */
  function dinhSticker(chuoi, noi, viTriCss) {
    chuoi.forEach(function (chu, k) {
      var el = document.createElement("button");
      el.type = "button"; el.className = "sticker"; el.textContent = chu;
      el.style.cssText = viTriCss[k] + ";--xoay:" + ngauNhien(-14, 14).toFixed(1) + "deg;animation-delay:" + (0.3 + k * 0.25) + "s";
      noi.appendChild(el);
      var dx = 0, dy = 0, bd = null;
      el.addEventListener("pointerdown", function (e) {
        e.stopPropagation();
        bd = { x: e.clientX - dx, y: e.clientY - dy };
        el.classList.add("keo");
        try { el.setPointerCapture(e.pointerId); } catch (x) {}
      });
      el.addEventListener("pointermove", function (e) {
        if (!bd) return;
        dx = e.clientX - bd.x; dy = e.clientY - bd.y;
        el.style.translate = dx + "px " + dy + "px";
      });
      ["pointerup", "pointercancel"].forEach(function (t) {
        el.addEventListener(t, function () { bd = null; el.classList.remove("keo"); });
      });
      el.addEventListener("click", function (e) { e.stopPropagation(); });
    });
  }
  if (P.nhan && P.nhan.length) {
    dinhSticker(P.nhan.slice(0, 2), $("#mo-dau-chu"), coGacha ? ["left:4px;top:-58px", "right:4px;bottom:-52px"] : ["left:-8px;top:-6px", "right:-8px;top:64px"]);
    dinhSticker(P.nhan.slice(2, 4), $("#thu .khung"), ["left:-6px;top:-18px", "right:-6px;bottom:-14px"]);
  }

  /* ---------- Băng chữ chạy ---------- */
  (function () {
    var ten = P.tenNgan.toUpperCase(), cum = ["HAPPY 20.10", ten].concat(P.nhan || ["XINH ĐẸP", "HẠNH PHÚC"]);
    var mot = cum.map(function (c) { return "<span>" + esc(c) + "</span><i>✦</i>"; }).join("");
    var hai = (mot + mot + mot);
    document.querySelectorAll(".bang .chay").forEach(function (el) { el.innerHTML = hai + hai; });
  })();

  /* ---------- Thẻ nhân vật (vibe check) ---------- */
  if (P.vibe) {
    $("#vibe").hidden = false;
    $("#tv-hiem").textContent = P.vibe.hiem || "SSR";
    $("#tv-emoji").textContent = P.vibe.emoji || "✨";
    if (P.chibi) $("#tv-anh").src = P.chibi; else $("#tv-anh").parentNode.hidden = true;
    $("#tv-ten").textContent = P.tenNgan;
    $("#tv-danh-hieu").textContent = P.vibe.danhHieu || "";
    $("#tv-chi-so").innerHTML = (P.vibe.chiSo || []).map(function (c, k) {
      var vo = c[1] === "∞" || +c[1] > 100, pt = vo ? 100 : Math.max(0, +c[1] || 0);
      return '<div class="cs' + (vo ? " vo-cuc" : "") + '"><span>' + esc(c[0]) + "</span><b>" + esc(c[1]) + "</b>" +
        '<i><u style="width:' + pt + "%;transition-delay:" + (0.4 + k * 0.35) + 's"></u></i></div>';
    }).join("");
    var tv = $("#the-vibe");
    tv.addEventListener("pointermove", function (e) {
      var r = tv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      tv.classList.add("nghieng");
      tv.style.setProperty("--rx", ((0.5 - y) * 22).toFixed(1) + "deg");
      tv.style.setProperty("--ry", ((x - 0.5) * 26).toFixed(1) + "deg");
      tv.style.setProperty("--gx", (x * 100).toFixed(0) + "%");
      tv.style.setProperty("--gy", (y * 100).toFixed(0) + "%");
    });
    tv.addEventListener("pointerleave", function () { tv.classList.remove("nghieng"); });
    tv.addEventListener("click", function () {
      var r = tv.getBoundingClientRect();
      no(r.left + r.width / 2, r.top + r.height * 0.3, 70, { tocDo: 4, mau: [0, 1, 6], imLang: true, trongLuc: 0.05 });
      tiengChuong(); rung(15);
    });
  }

  /* ---------- 20/10 Wrapped: các slide kiểu story ---------- */
  if (P.wrapped && P.wrapped.length) {
    $("#wrapped").hidden = false;
    $("#wr-ten").textContent = P.ban === "em" ? "em" : P.goi;
    var slide = [["🎁", String(new Date().getFullYear()), "20/10 Wrapped của " + P.goi + ". Cùng nhìn lại một năm xịn xò nhé!"]]
      .concat(P.wrapped.map(function (w) { return [w[2] || "✨", w[0], w[1]]; }))
      .concat([["💖", "Cảm ơn", "vì đã là chính mình. Chúc mừng 20/10!"]]);
    var wr = $("#wr"), wrSlide = $("#wr-slide"), wrThanh = $("#wr-thanh"), wrSo = 0, wrHen = null, wrChay = false, DAI = 4500;
    wrThanh.innerHTML = slide.map(function () { return "<i><b></b></i>"; }).join("");
    var demLen = function (el, chu) { // số đứng đầu chạy từ 0 lên, giữ nguyên phần chữ phía sau
      var m = /^(\d[\d.]*)(.*)$/.exec(chu);
      if (!m || nhe) { el.textContent = chu; return; }
      var dich = +m[1].replace(/\./g, ""), coCham = m[1].indexOf(".") > 0, bd = performance.now();
      (function chay(bay) {
        var u = Math.min(1, (bay - bd) / 1100), v = Math.round(dich * (1 - Math.pow(1 - u, 3)));
        el.textContent = (coCham ? v.toLocaleString("de-DE") : v) + m[2];
        if (u < 1) requestAnimationFrame(chay);
      })(bd);
    };
    var hienSlide = function (k) {
      wrSo = Math.max(0, Math.min(slide.length - 1, k));
      var s = slide[wrSo];
      wrSlide.className = "wr-slide n" + (wrSo % 4);
      wrSlide.innerHTML = '<div class="wr-emoji">' + s[0] + '</div><div class="wr-lon"></div><div class="wr-chu">' + esc(s[2]) + "</div>";
      demLen(wrSlide.querySelector(".wr-lon"), s[1]);
      wrThanh.querySelectorAll("i").forEach(function (t, j) { t.className = j < wrSo ? "xong" : j === wrSo ? "dang" : ""; });
      clearTimeout(wrHen);
      if (wrChay && wrSo < slide.length - 1) wrHen = setTimeout(function () { hienSlide(wrSo + 1); }, DAI);
      if (wrSo === slide.length - 1) {
        var r = wr.getBoundingClientRect();
        setTimeout(function () { phaoGiay(r.left + r.width / 2, r.top + r.height * 0.4, 60); tiengChuong(); }, 300);
      }
    };
    wr.style.setProperty("--dai", DAI + "ms");
    hienSlide(0);
    wr.addEventListener("click", function (e) {
      var r = wr.getBoundingClientRect();
      hienSlide(e.clientX - r.left < r.width * 0.3 ? wrSo - 1 : wrSo + 1);
      rung(8);
    });
    wr.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") { e.preventDefault(); hienSlide(wrSo + 1); }
      if (e.key === "ArrowLeft") hienSlide(wrSo - 1);
    });
    new IntersectionObserver(function (m) {
      wrChay = m[0].isIntersecting;
      wr.classList.toggle("chay", wrChay);
      if (wrChay) hienSlide(wrSo); else clearTimeout(wrHen);
    }, { threshold: 0.5 }).observe(wr);
  }

  /* ---------- Vườn hoa ---------- */
  var CAP_MAU = [["#ff7aa2", "#e0457b"], ["#ffd27a", "#ff9f43"], ["#c9a7ff", "#8b5cf6"], ["#8fe3ff", "#3aa0d8"], ["#ffb3c7", "#ff5d8f"], ["#fff1c1", "#ffc857"]];
  var MAU_HOA = [0, 1, 5, 7, 2, 3]; // màu hạt (chỉ số trong MAU) ứng với từng cặp màu hoa
  var ds = D.loiChucTeam, soHoa = ds.length, rong = Math.min(26, 150 / soHoa), vuon = "";
  ds.forEach(function (l, k) {
    var cao = (k % 2 ? 170 : 240) + ngauNhien(-20, 20), V = cao + 70, cm = CAP_MAU[k % CAP_MAU.length];
    var la = 70 + cao * 0.55, canh = [5, 6, 8][k % 3], ry = canh === 8 ? 18 : 21, tre = (k * 0.22).toFixed(2), bong = "";
    for (var c = 0; c < canh; c++) {
      bong += '<ellipse cx="50" cy="' + (60 - ry + 4) + '" rx="' + (canh === 8 ? 9 : 12) + '" ry="' + ry +
        '" transform="rotate(' + (c * 360 / canh) + ' 50 60)" fill="url(#cm' + k + ')"/>';
    }
    vuon += '<button class="hoa" type="button" data-i="' + k + '" style="left:' + ((k + 0.5) / soHoa * 100) + "%;width:" + rong + "%;animation-delay:-" + (k * 0.8) + 's" aria-label="Lời chúc của ' + esc(l.tu) + '">' +
      '<svg viewBox="0 0 100 ' + V + '" style="filter:drop-shadow(0 0 10px ' + cm[0] + '88)">' +
      '<defs><radialGradient id="cm' + k + '" cx="50%" cy="85%" r="90%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="' + cm[0] + '"/><stop offset="1" stop-color="' + cm[1] + '"/></radialGradient></defs>' +
      '<g>' +
      '<path class="than" pathLength="1" style="transition-delay:' + tre + 's" d="M50 ' + V + " C 58 " + (V * 0.72) + ", 42 " + (V * 0.42) + ', 50 62" stroke="#7fd6a4" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path class="la" style="transform-origin:50px ' + la + "px;transition-delay:" + (1 + +tre) + 's" d="M50 ' + la + " q 22 -16 32 -4 q -16 16 -32 4z" + '" fill="#5cbf8a"/>' +
      '<g class="bong" style="transform-origin:50px 60px;transition-delay:' + (1.2 + +tre) + 's">' + bong +
      '<circle cx="50" cy="60" r="8" fill="#ffe9a8"/></g></g></svg>' +
      '<span class="ten">' + esc(l.tu) + "</span></button>";
  });
  $("#vuon-hoa").innerHTML = vuon;

  var daDoc = {};
  function capNhatDem() {
    var n = Object.keys(daDoc).length;
    $("#dem").textContent = n === soHoa ? "Đọc hết rồi! Kéo xuống còn quà nữa nè ↓" : "Đã đọc " + n + "/" + soHoa + " lời chúc";
  }
  capNhatDem();
  var lopPhu = $("#lop-phu");
  function moThe(k) {
    var l = ds[k];
    $("#the-tu").textContent = l.tu;
    $("#the-loi").textContent = l.loi;
    lopPhu.hidden = false;
    requestAnimationFrame(function () { lopPhu.classList.add("mo"); });
    $("#the-dong").focus();
    var moi = !daDoc[k]; daDoc[k] = 1;
    document.querySelector('.hoa[data-i="' + k + '"]').classList.add("da-doc");
    capNhatDem();
    tiengChuong();
    if (moi && Object.keys(daDoc).length === soHoa) setTimeout(function () { banLoat(3); }, 400);
  }
  function dongThe() {
    lopPhu.classList.remove("mo");
    setTimeout(function () { lopPhu.hidden = true; }, 300);
  }
  $("#vuon-hoa").addEventListener("click", function (e) {
    var h = e.target.closest(".hoa"); if (!h) return;
    var k = +h.dataset.i, r = h.querySelector(".bong").getBoundingClientRect();
    no(r.left + r.width / 2, r.top + r.height / 2, 50, { tocDo: 3, mau: [MAU_HOA[k % MAU_HOA.length], 6], imLang: true, trongLuc: 0.04 });
    h.classList.remove("nhun"); void h.offsetWidth; h.classList.add("nhun");
    setTimeout(function () { moThe(k); }, nhe ? 0 : 380);
  });
  $("#the-dong").addEventListener("click", dongThe);
  lopPhu.addEventListener("click", function (e) { if (e.target === lopPhu) dongThe(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lopPhu.hidden) dongThe(); });

  /* ---------- Hộp quà + thẻ cào ---------- */
  var hop = $("#hop");
  hop.addEventListener("click", function () {
    if (hop.dataset.daMo) return;
    hop.dataset.daMo = "1";
    if (!am) batNhac();
    hop.classList.add("lac-hop");
    setTimeout(function () {
      hop.classList.remove("lac-hop"); hop.classList.add("mo");
      var r = hop.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height * 0.35;
      no(x, y, 160, { tocDo: 7, len: -3, trongLuc: 0.12, mau: [0, 1, 4, 5, 6, 7] });
      phaoGiay(x, y, 60);
      tiengChuong(); rung(40);
      $("#qua-goi-y").textContent = "Có thẻ cào nè, cào thử xem!";
      var q = $("#qua-hien");
      q.querySelector(".nho span").textContent = P.goi;
      q.querySelector(".ten-qua").textContent = P.qua;
      setTimeout(function () {
        q.hidden = false;
        veLopCao();
        q.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }, 800);
  });

  var lopCao = $("#lop-cao"), bc = lopCao.getContext("2d"), dangCao = false, truocCao = null, demCao = 0, xongCao = false;
  function veLopCao() {
    var r = lopCao.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2), w = r.width, h = r.height;
    lopCao.width = Math.round(w * dpr); lopCao.height = Math.round(h * dpr);
    bc.setTransform(dpr, 0, 0, dpr, 0, 0);
    var g = bc.createLinearGradient(0, 0, w, h);
    [0, 0.3, 0.5, 0.75, 1].forEach(function (d, k) { g.addColorStop(d, GD.cao[k]); });
    bc.fillStyle = g; bc.fillRect(0, 0, w, h);
    for (var k = 0; k < w * h / 40; k++) { // hạt kim tuyến
      bc.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255," + ngauNhien(0.2, 0.7) + ")" : "rgba(150,90,10," + ngauNhien(0.1, 0.3) + ")";
      bc.fillRect(Math.random() * w, Math.random() * h, ngauNhien(0.8, 2), ngauNhien(0.8, 2));
    }
    bc.fillStyle = GD.chuCao; bc.textAlign = "center"; bc.textBaseline = "middle";
    bc.font = "600 16px 'Be Vietnam Pro', sans-serif"; bc.fillText("✨ Cào ở đây ✨", w / 2, h / 2);
    bc.globalCompositeOperation = "destination-out"; bc.lineCap = bc.lineJoin = "round"; bc.lineWidth = 38;
  }
  function viTri(e) { var r = lopCao.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function phanTramDaCao() {
    var d = bc.getImageData(0, 0, lopCao.width, lopCao.height).data, trong = 0, tong = 0;
    for (var k = 3; k < d.length; k += 4 * 24) { tong++; if (d[k] < 40) trong++; }
    return trong / tong;
  }
  function caoXong() {
    if (xongCao) return;
    xongCao = true;
    lopCao.classList.add("xong");
    $("#cao-goi-y").textContent = "Quà của " + P.ban + " đó! 🎉";
    $("#qua-goi-y").textContent = "Chúc mừng " + P.ban + "!";
    var r = lopCao.getBoundingClientRect();
    phaoGiay(r.left + r.width / 2, r.top + r.height / 2, 90);
    giayHaiBen();
    tiengChuong(); rung([30, 50, 30]);
    banLoat(4);
  }
  lopCao.addEventListener("pointerdown", function (e) {
    if (xongCao) return;
    dangCao = true; truocCao = viTri(e);
    try { lopCao.setPointerCapture(e.pointerId); } catch (x) {}
    bc.beginPath(); bc.arc(truocCao.x, truocCao.y, 19, 0, 7); bc.fill();
  });
  lopCao.addEventListener("pointermove", function (e) {
    if (!dangCao || xongCao) return;
    var p = viTri(e);
    bc.beginPath(); bc.moveTo(truocCao.x, truocCao.y); bc.lineTo(p.x, p.y); bc.stroke();
    truocCao = p;
    if (Math.random() < 0.5) hat.push({ x: e.clientX, y: e.clientY, vx: ngauNhien(-1.5, 1.5), vy: ngauNhien(-2, 0), song: 30, toiDa: 30, co: 7, dom: DOM[1], kieu: "roi", trongLuc: 0.08 });
    if (++demCao % 10 === 0 && phanTramDaCao() > 0.5) caoXong();
  });
  ["pointerup", "pointercancel"].forEach(function (t) {
    lopCao.addEventListener(t, function () { dangCao = false; if (!xongCao && phanTramDaCao() > 0.5) caoXong(); });
  });
})();
