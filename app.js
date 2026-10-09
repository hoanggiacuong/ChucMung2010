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

  /* ---------- Nội dung ---------- */
  $("#ten-goi").textContent = P.goi;
  $("#keo-chu").textContent = "Kéo xuống, có thư cho " + P.ban;

  var thu = '<p class="chao hien-dan">' + esc(P.chao) + "</p>";
  if (P.anh) thu += '<img class="anh-rieng hien-dan" src="' + esc(P.anh) + '" alt="">';
  P.loiChuc.forEach(function (d) { thu += '<p class="hien-dan">' + esc(d) + "</p>"; });
  thu += '<div class="ky hien-dan">Thương mến,<b>' + esc(D.nguoiGui) + "</b></div>";
  $("#la-thu").innerHTML = thu;

  $("#tu-cong-ty").textContent = D.congTy;
  $("#ket-loi").textContent = "Chúc " + P.ban + " một ngày 20/10 thật trọn vẹn, và cả những ngày sau nữa.";
  if (D.anhChung) { var ac0 = $("#anh-chung"); ac0.src = D.anhChung; ac0.hidden = false; }
  if (!P.qua) $("#qua").hidden = true;

  /* ---------- Bầu trời sao ---------- */
  var sao = $("#sao"), html = "";
  for (var i = 0; i < 90; i++) {
    var s = ngauNhien(1, 2.6).toFixed(1);
    html += '<i style="left:' + ngauNhien(0, 100).toFixed(2) + "%;top:" + ngauNhien(0, 100).toFixed(2) +
      "%;width:" + s + "px;height:" + s + "px;animation-delay:-" + ngauNhien(0, 3).toFixed(2) +
      "s;animation-duration:" + ngauNhien(2, 5).toFixed(2) + 's"></i>';
  }
  sao.innerHTML = html;

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
  function tiengChuong() {
    if (!am || !nhacBat) return;
    [84, 88, 91, 96].forEach(function (m, k) { not(m, am.currentTime + k * 0.09, 1.4, 0.12); });
  }
  $("#nut-nhac").addEventListener("click", function () { nhacBat ? tatNhac() : batNhac(); });
  document.addEventListener("visibilitychange", function () {
    if (!am) return;
    if (document.hidden) am.suspend(); else if (nhacBat) am.resume();
  });

  /* ---------- Pháo hoa ---------- */
  var cv = $("#troi"), cx = cv.getContext("2d"), W = 0, H = 0;
  function doKichThuoc() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  doKichThuoc();
  window.addEventListener("resize", doKichThuoc);

  var MAU = ["#ff7aa2", "#ffd27a", "#ffb3c7", "#fff1c1", "#ff5d8f", "#c9a7ff", "#ffffff", "#8fe3ff"];
  var DOM = MAU.map(function (c) {
    var s = document.createElement("canvas"); s.width = s.height = 32;
    var g = s.getContext("2d"), r = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    r.addColorStop(0, "#fff"); r.addColorStop(0.22, c); r.addColorStop(0.5, c + "55"); r.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = r; g.fillRect(0, 0, 32, 32); return s;
  });
  var hat = [], phao = [], tiLe = function () { return Math.min(W, H) / 400; };

  function no(x, y, n, tuyChon) {
    tuyChon = tuyChon || {};
    var mau = tuyChon.mau || [Math.floor(Math.random() * MAU.length), Math.floor(Math.random() * MAU.length)];
    var tocDo = (tuyChon.tocDo || 5) * Math.max(0.8, tiLe()), ra = [];
    for (var k = 0; k < n; k++) {
      var goc = Math.random() * Math.PI * 2, v = tocDo * Math.pow(Math.random(), 0.45);
      var p = {
        x: x, y: y, vx: Math.cos(goc) * v, vy: Math.sin(goc) * v + (tuyChon.len || 0),
        song: ngauNhien(55, 100), toiDa: 100, co: ngauNhien(7, 13), dom: DOM[mau[k % mau.length]],
        kieu: tuyChon.giu ? "giu" : "roi", trongLuc: tuyChon.trongLuc == null ? 0.06 : tuyChon.trongLuc,
        pha: Math.random() * 6.28, ke: ngauNhien(0.012, 0.022), tx: x, ty: y
      };
      p.toiDa = p.song; hat.push(p); ra.push(p);
    }
    tiengNo();
    return ra;
  }
  function ban(x, dichY, khiNo) {
    phao.push({ x: x, y: H + 10, x0: x, y0: H + 10, dichY: dichY, t: 0, dai: ngauNhien(55, 70), khiNo: khiNo });
  }
  function banNgauNhien() {
    var x = ngauNhien(W * 0.15, W * 0.85), y = ngauNhien(H * 0.15, H * 0.45);
    ban(x, y, function () { no(x, y, Math.round(ngauNhien(70, 120) * Math.max(1, tiLe()))); });
  }

  var truoc = performance.now(), t0 = 0;
  function khung(bayGio) {
    var f = Math.min((bayGio - truoc) / 16.67, 3); truoc = bayGio; t0 += f;
    if (!hat.length && !phao.length) { cx.clearRect(0, 0, W, H); requestAnimationFrame(khung); return; }
    cx.globalCompositeOperation = "destination-out";
    cx.fillStyle = "rgba(0,0,0,0.24)"; cx.fillRect(0, 0, W, H);
    cx.globalCompositeOperation = "lighter";

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
        var can = Math.pow(0.975, f);
        p.vx *= can; p.vy = p.vy * can + p.trongLuc * f;
        p.x += p.vx * f; p.y += p.vy * f; p.song -= f;
        if (p.song <= 0 || p.y > H + 20) { hat.splice(j, 1); continue; }
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
    cx.globalAlpha = 1;
    requestAnimationFrame(khung);
  }
  requestAnimationFrame(khung);

  /* Lấy điểm từ một hình vẽ (chữ, trái tim) để các hạt tụ vào */
  function layDiem(ve) {
    var w = Math.max(1, Math.floor(W)), h = Math.max(1, Math.floor(H));
    var c = document.createElement("canvas"); c.width = w; c.height = h;
    var g = c.getContext("2d"); g.fillStyle = "#fff"; ve(g, w, h);
    var d = g.getImageData(0, 0, w, h).data, buoc = Math.max(3, Math.round(Math.min(w, h) / 140)), ra = [];
    for (var y = 0; y < h; y += buoc) for (var x = 0; x < w; x += buoc) if (d[(y * w + x) * 4 + 3] > 128) ra.push({ x: x, y: y });
    return ra;
  }
  function diemChu(chu, phong) {
    return layDiem(function (g, w, h) {
      var co = Math.min(h * 0.2, 190), font = function (s) { return "700 " + s + "px " + phong; };
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
      document.fonts.load('700 80px "Dancing Script"', P.tenNgan),
      document.fonts.load('700 80px "Playfair Display"', "20·10")
    ]) : Promise.resolve(),
    cho(2500)
  ]).catch(function () {});

  /* ---------- Màn mở đầu ---------- */
  var daBatDau = false, xongMoDau = false, henPhao = null;
  function trinhDien() {
    var x = W / 2, y = H * 0.4, n = W < 500 ? 900 : 1400;
    ban(x, y, function () {
      var ds = no(x, y, n, { giu: true, tocDo: 7, mau: [0, 1, 2, 3, 4, 6] });
      fontSan.then(function () {
        setTimeout(function () { tuVao(ds, diemChu(P.tenNgan, '"Dancing Script", cursive')); }, 400);
        setTimeout(function () { tuVao(ds, diemTim()); tiengChuong(); }, 3700);
        setTimeout(function () { tuVao(ds, diemChu("20·10", '"Playfair Display", Georgia, serif')); }, 6200);
        setTimeout(function () { thaRoi(ds); ketThucMoDau(); }, 9000);
      });
    });
  }
  function ketThucMoDau() {
    xongMoDau = true;
    document.body.classList.remove("khoa");
    $("#keo-xuong").classList.add("hien");
    henPhao = setInterval(function () { if (!document.hidden && dangThay.moDau) banNgauNhien(); }, 3200);
  }
  $("#mo-dau").addEventListener("click", function (e) {
    if (!daBatDau) {
      daBatDau = true;
      batNhac();
      $("#nut-nhac").hidden = false;
      $("#mo-dau-chu").classList.add("an");
      trinhDien();
      return;
    }
    if (e.target.closest(".keo-xuong")) return;
    var x = e.clientX, y = Math.min(e.clientY, H * 0.75);
    ban(x, y, function () { no(x, y, Math.round(100 * Math.max(1, tiLe()))); });
  });

  /* ---------- Hiện dần khi kéo tới ---------- */
  var dangThay = { moDau: true };
  var quanSat = new IntersectionObserver(function (muc) {
    muc.forEach(function (m) {
      var id = m.target.id;
      if (id === "mo-dau") { dangThay.moDau = m.isIntersecting; return; }
      if (!m.isIntersecting) return;
      if (id === "thu") {
        m.target.querySelectorAll(".hien-dan").forEach(function (el, k) {
          el.style.transitionDelay = (k * 0.6) + "s"; el.classList.add("ro");
        });
      } else if (id === "vuon") {
        $("#vuon-hoa").classList.add("mo");
      } else if (id === "ket" && !m.target.dataset.daBan) {
        m.target.dataset.daBan = "1"; banLoat(3);
      }
      if (id !== "mo-dau") quanSat.unobserve(m.target);
    });
  }, { threshold: 0.3 });
  ["#mo-dau", "#thu", "#vuon", "#ket"].forEach(function (s) { quanSat.observe($(s)); });

  function banLoat(n) { for (var k = 0; k < n; k++) setTimeout(banNgauNhien, k * 450); }
  $("#ban-lai").addEventListener("click", function () { if (!nhacBat && !am) batNhac(); banLoat(5); });

  /* ---------- Vườn hoa ---------- */
  var CAP_MAU = [["#ff7aa2", "#e0457b"], ["#ffd27a", "#ff9f43"], ["#c9a7ff", "#8b5cf6"], ["#8fe3ff", "#3aa0d8"], ["#ffb3c7", "#ff5d8f"], ["#fff1c1", "#ffc857"]];
  var ds = D.loiChucTeam, soHoa = ds.length, rong = Math.min(26, 150 / soHoa), vuon = "";
  ds.forEach(function (l, k) {
    var cao = (k % 2 ? 170 : 240) + ngauNhien(-20, 20), V = cao + 70, cm = CAP_MAU[k % CAP_MAU.length];
    var la = 70 + cao * 0.55, canh = [5, 6, 8][k % 3], ry = canh === 8 ? 18 : 21, tre = (k * 0.22).toFixed(2), bong = "";
    for (var c = 0; c < canh; c++) {
      bong += '<ellipse cx="50" cy="' + (60 - ry + 4) + '" rx="' + (canh === 8 ? 9 : 12) + '" ry="' + ry +
        '" transform="rotate(' + (c * 360 / canh) + ' 50 60)" fill="url(#cm' + k + ')"/>';
    }
    vuon += '<button class="hoa" type="button" data-i="' + k + '" style="left:' + ((k + 0.5) / soHoa * 100) + "%;width:" + rong + '%" aria-label="Lời chúc của ' + esc(l.tu) + '">' +
      '<svg viewBox="0 0 100 ' + V + '" style="filter:drop-shadow(0 0 10px ' + cm[0] + '88)">' +
      '<defs><radialGradient id="cm' + k + '" cx="50%" cy="85%" r="90%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="' + cm[0] + '"/><stop offset="1" stop-color="' + cm[1] + '"/></radialGradient></defs>' +
      '<g class="lac" style="animation-delay:-' + (k * 0.8) + 's">' +
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
    var h = e.target.closest(".hoa"); if (h) moThe(+h.dataset.i);
  });
  $("#the-dong").addEventListener("click", dongThe);
  lopPhu.addEventListener("click", function (e) { if (e.target === lopPhu) dongThe(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lopPhu.hidden) dongThe(); });

  /* ---------- Hộp quà ---------- */
  var hop = $("#hop");
  hop.addEventListener("click", function () {
    if (hop.dataset.daMo) return;
    hop.dataset.daMo = "1";
    hop.classList.add("lac-hop");
    setTimeout(function () {
      hop.classList.remove("lac-hop"); hop.classList.add("mo");
      var r = hop.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height * 0.35;
      no(x, y, 160, { tocDo: 7, len: -3, trongLuc: 0.12, mau: [0, 1, 4, 5, 6, 7] });
      tiengChuong();
      $("#qua-goi-y").textContent = "Quà của " + P.ban + " nè!";
      var q = $("#qua-hien");
      q.querySelector(".nho span").textContent = P.goi;
      q.querySelector(".ten-qua").textContent = P.qua;
      setTimeout(function () { q.hidden = false; q.scrollIntoView({ behavior: "smooth", block: "center" }); }, 500);
    }, 800);
  });
})();
