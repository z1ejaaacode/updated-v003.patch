// =========================
// LOADING PROGRESS 7 DETIK (PRO VERSION)
// =========================

function startLoadingV2(callback) {
  const overlay = document.getElementById("loadingOverlayNew");
  const bar = document.getElementById("progressBarFill");
  const text = document.getElementById("loadingText");
  const percentText = document.getElementById("loadingPercent");

  let progress = 0;

  overlay.style.display = "flex";
  bar.style.width = "0%";

  if (percentText) percentText.innerText = "0%";

  const interval = setInterval(() => {
    progress++;

    // =========================
    // PROGRESS (SMOOTH)
    // =========================
    bar.style.width = progress + "%";
    if (percentText) percentText.innerText = progress + "%";

    // =========================
    // TEXT STEP (FAKE PROCESS)
    // =========================
    if (progress < 15) {
      text.innerText = "Memvalidasi data pesanan...";
    } else if (progress < 30) {
      text.innerText = "Menghubungkan ke server...";
    } else if (progress < 50) {
      text.innerText = "Memproses pesanan...";
    } else if (progress < 70) {
      text.innerText = "Menyiapkan pembayaran...";
    } else if (progress < 90) {
      text.innerText = "Konfirmasi Pesanan...";
    } else {
      text.innerText = "Pesanan berhasil dibuat!";
    }

    // =========================
    // WARNA (BAR + PERSEN SINKRON)
    // =========================
    let color = "";

    if (progress < 35) {
      color = "red";
    } else if (progress < 70) {
      color = "orange";
    } else {
      color = "limegreen";
    }

    bar.style.background = color;

    if (percentText) {
      percentText.style.color = color;
    }

    // =========================
    // SELESAI
    // =========================
    if (progress >= 100) {
      clearInterval(interval);

      // pastikan full hijau + 100%
      if (percentText) percentText.innerText = "100%";

      setTimeout(() => {
        overlay.style.display = "none";
        if (callback) callback();
      }, 700);
    }

  }, 70); // 70ms x 100 ≈ 7 detik
}

// =========================
// FAQ ACCORDION
// =========================

document.querySelectorAll(".faq-question").forEach(item => {
  item.addEventListener("click", () => {
    const parent = item.parentElement;

    // toggle active
    parent.classList.toggle("active");
  });
});