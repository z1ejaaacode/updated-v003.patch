/* =========================
   NOTIF SYSTEM
========================= */
function showNotif(message) {
  const notifBox = document.getElementById("notifBox");
  const notifMessage = document.getElementById("notifMessage");

  if (!notifBox || !notifMessage) return;

  notifMessage.innerText = message;

  notifBox.classList.add("show");

  setTimeout(() => {
    notifBox.classList.remove("show");
  }, 2500);
}


/* =========================
   SCRIPT UTAMA LANNEFY
========================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     FORCE LIGHT MODE
  ========================== */
  document.documentElement.style.colorScheme = "light";
  document.body.style.backgroundColor = "#fff";
  document.body.style.color = "#000";

  /* =========================
     SIDEBAR SYSTEM
  ========================== */
  const btn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  btn?.addEventListener("click", () => {
    const items = document.querySelectorAll(".sidebar-header, .menu a");
    items.forEach(el => { el.style.animation = "none"; el.offsetHeight; el.style.animation = null; });
    sidebar.classList.add("show");
    overlay.classList.add("show");
    btn.classList.add("active");
    document.body.classList.add("lock", "blur");
  });

  overlay?.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    btn.classList.remove("active");
    document.body.classList.remove("lock", "blur");
  });

  sidebar?.addEventListener("click", e => e.stopPropagation());

  document.querySelectorAll(".menu a").forEach(link => link.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    btn.classList.remove("active");
    document.body.classList.remove("lock", "blur");
  }));

  /* =========================
     ORDER SYSTEM
  ========================== */
  const orderBtn = document.getElementById("orderBtn");
  const usernameInput = document.getElementById("targetInput");
  const selectedText = document.getElementById("selectedService");

  let selectedPayment = "DANA";
  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener("change", () => {
      selectedPayment = radio.value;
    });
  });

  orderBtn?.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const activePrice = document.querySelector(".price-item.active");
    const serviceText = selectedText.innerText;

    /* =========================
       VALIDASI (NOTIF)
    ========================== */
    if (!username) {
      showNotif("Masukan link / username terlebih dahulu.");
      usernameInput.focus();
      return;
    }

    if (!activePrice) {
      showNotif("Pilih layanan terlebih dahulu.");
      return;
    }

    if (serviceText === "Pilih Layanan") {
      showNotif("Pilih layanan terlebih dahulu.");
      return;
    }

    /* =========================
       SIMPAN DATA
    ========================== */
    const orderData = {
      username: username,
      service: serviceText,
      qty: activePrice.querySelector(".qty")?.innerText || "",
      total: activePrice.querySelector(".price")?.innerText || "",
      payment: selectedPayment
    };

    localStorage.setItem("orderData", JSON.stringify(orderData));

    /* =========================
       DISABLE BUTTON
    ========================== */
    orderBtn.disabled = true;
    orderBtn.innerText = "Memproses...";

    /* =========================
       LOADING
    ========================== */
    startLoadingV2(() => {

      const paymentLower = selectedPayment.toLowerCase();

      if (paymentLower === "dana") {
        window.location.href = "pay/paydana.html";
      } else if (paymentLower === "gopay") {
        window.location.href = "pay/paygopay.html";
      } else if (paymentLower === "qris") {
        window.location.href = "pay/payqr.html";
      }

      // fallback (kalau balik ke halaman ini)
      orderBtn.disabled = false;
      orderBtn.innerText = "Buat Pesanan";

    });

  });

});