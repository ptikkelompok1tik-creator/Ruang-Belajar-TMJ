const MATERI = [
  { t: "Teknik Pomodoro", k: "Manajemen Waktu", i: "⏱️", d: "Belajar 25 menit, istirahat 5 menit agar fokus terjaga.", ok: 1 },
  { t: "Membuat Catatan Efektif", k: "Teknik Belajar", i: "📝", d: "Metode Cornell dan peta konsep untuk merangkum materi kuliah.", ok: 1 },
  { t: "Menyusun Jadwal Belajar", k: "Manajemen Waktu", i: "📅", d: "Cara membagi waktu antara kuliah, tugas, dan istirahat.", ok: 1 },
  { t: "Dasar Berpikir Algoritma", k: "Dasar TI", i: "💡", d: "Mengenal langkah berurutan untuk menyelesaikan masalah.", ok: 1 },
  { t: "Belajar dari Sumber Digital", k: "Dasar TI", i: "🌐", d: "Memilih sumber belajar online yang tepercaya.", ok: 0 },
  { t: "Persiapan Ujian", k: "Teknik Belajar", i: "🎯", d: "Strategi mengulang materi menjelang UTS dan UAS.", ok: 0 },
];

const $ = (selector) => document.querySelector(selector);
const nav = $("nav");
const burger = $("#burger");

if (burger) {
  burger.onclick = () => {
    const isOpen = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  };
}

document.querySelectorAll("nav a").forEach((link) => {
  const page = location.pathname.split("/").pop();
  if (link.getAttribute("href") === page || (!page && link.getAttribute("href") === "index.html")) {
    link.classList.add("on");
  }
});

const list = $("#list");
if (list) {
  const q = $("#q");
  const f = $("#f");

  const draw = () => {
    const search = q.value.toLowerCase();
    const category = f.value;
    const result = MATERI.filter(
      (materi) =>
        (!category || materi.k === category) &&
        (materi.t + materi.d).toLowerCase().includes(search),
    );

    list.innerHTML = result.length
      ? result
          .map(
            (materi) =>
              `<div class="card${materi.ok ? "" : " off"}">
                <div class="ic">${materi.i}</div>
                <span class="tag">${materi.k}</span>
                ${materi.ok ? "" : '<span class="tag s">Segera hadir</span>'}
                <h3>${materi.t}</h3>
                <p>${materi.d}</p>
              </div>`,
          )
          .join("")
      : '<p class="note">Materi tidak ditemukan.</p>';
  };

  q.oninput = draw;
  f.onchange = draw;
  draw();
}

const form = $("#kontak");
if (form) {
  form.onsubmit = (event) => {
    event.preventDefault();
    let ok = true;

    const check = (id, invalid, message) => {
      const el = $("#" + id);
      const hasError = invalid(el.value.trim());
      $("#e-" + id).textContent = hasError ? message : "";
      if (hasError) ok = false;
    };

    check("nama", (value) => value.length < 3, "Nama minimal 3 karakter.");
    check("email", (value) => !/^\S+@\S+\.\S+$/.test(value), "Format email belum benar.");
    check("pesan", (value) => value.length < 10, "Pesan minimal 10 karakter.");

    $("#hasil").textContent = ok
      ? "Terima kasih! (Simulasi: pesan tidak dikirim ke server.)"
      : "";
    if (ok) form.reset();
  };
}
