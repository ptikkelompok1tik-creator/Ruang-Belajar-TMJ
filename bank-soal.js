(() => {
  const D = BANK_SOAL;
  const root = document.getElementById("bs-root");
  const get = (id) => document.getElementById(id);

  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (char) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char],
    );

  const dash = (value) => (value ? esc(value) : "—");
  const bc = (...parts) =>
    `<div class="bc">${parts.join('<span>/</span>')}</div>`;
  const A = '<a href="index.html">Beranda</a>';

  function home() {
    root.innerHTML =
      bc(A, "<b>Bank Soal</b>") +
      `<div class="bs-head">
        <h1>Program Studi<br><span>Teknik Multimedia &amp; Jaringan</span></h1>
        <input id="bs-cari" type="search" placeholder="Cari mata kuliah...">
      </div>
      <h3 class="bs-lbl">Mata Kuliah</h3>
      <div id="bs-mk"></div>`;

    const draw = () => {
      const search = get("bs-cari").value.toLowerCase();
      const result = D.filter((course) =>
        course.nama.toLowerCase().includes(search),
      );

      get("bs-mk").innerHTML = result.length
        ? result
            .map(
              (course) =>
                `<a class="mk" href="#${course.id}">
                  <span>${esc(course.nama)}</span>
                  <small>${course.items.length} materi</small>
                  <i>›</i>
                </a>`,
            )
            .join("")
        : '<p class="note">Mata kuliah tidak ditemukan.</p>';
    };

    get("bs-cari").oninput = draw;
    draw();
  }

  function mk(course) {
    const unique = (key) =>
      [...new Set(course.items.map((item) => item[key]))].sort();

    const select = (id, title, key) =>
      `<label>${title}
        <select id="${id}">
          <option value="">Semua</option>
          ${unique(key)
            .map((value) => `<option>${esc(value)}</option>`)
            .join("")}
        </select>
      </label>`;

    root.innerHTML =
      bc(A, '<a href="bank-soal.html">Bank Soal</a>', `<b>${esc(course.nama)}</b>`) +
      `<a class="back" href="bank-soal.html">← Kembali</a>
      <h1>${esc(course.nama)}</h1>
      <div class="fp">
        <label>Pencarian
          <input id="bs-cari" type="search" placeholder="Cari materi atau soal...">
        </label>
        ${select("bs-sem", "Semester", "semester")}
        ${select("bs-kat", "Kategori", "kategori")}
        ${select("bs-thn", "Tahun", "tahun")}
      </div>
      <p class="bs-lbl" id="bs-n"></p>
      <div class="grid" id="bs-g"></div>`;

    const draw = () => {
      const search = get("bs-cari").value.toLowerCase();
      const semester = get("bs-sem").value;
      const category = get("bs-kat").value;
      const year = get("bs-thn").value;

      const result = course.items.filter(
        (item) =>
          item.judul.toLowerCase().includes(search) &&
          (!semester || String(item.semester) === semester) &&
          (!category || item.kategori === category) &&
          (!year || String(item.tahun) === year),
      );

      get("bs-n").textContent = `${result.length} materi ditemukan`;
      get("bs-g").innerHTML = result.length
        ? result
            .map((item) => {
              const index = course.items.indexOf(item);
              return `<div class="card bs-c" data-i="${index}" tabindex="0">
                <h3>${esc(item.judul)}</h3>
                <p>${dash(item.dosen)}</p>
                <small>Semester ${item.semester} • ${item.tahun} • ${esc(item.kategori.toUpperCase())}</small>
              </div>`;
            })
            .join("")
        : `<p class="note">${course.items.length ? "Materi tidak ditemukan." : "Belum ada materi untuk mata kuliah ini."}</p>`;
    };

    ["bs-cari", "bs-sem", "bs-kat", "bs-thn"].forEach((id) => {
      get(id).addEventListener("input", draw);
      get(id).addEventListener("change", draw);
    });

    const open = (event) => {
      const card = event.target.closest(".bs-c");
      if (card) modal(course, course.items[card.dataset.i]);
    };

    get("bs-g").onclick = open;
    get("bs-g").onkeydown = (event) => {
      if (event.key === "Enter") open(event);
    };
    draw();
  }

  function modal(course, item) {
    const files = item.berkas;
    let current = 0;
    const overlay = document.createElement("div");
    overlay.className = "ov";

    overlay.innerHTML =
      `<div class="md">
        <div class="md-l">
          <button class="md-x" type="button" aria-label="Tutup">←</button>
          <span class="tag s">${esc(item.kategori.toUpperCase())}</span>
          <h2>${esc(item.judul)}</h2>
          <p>
            <span class="tag">🎓 ${esc(course.nama)}</span>
            <span class="tag">👤 ${dash(item.dosen)}</span>
          </p>
          <div class="md-g">
            <div><small>Semester</small><b>Semester ${item.semester}</b></div>
            <div><small>Tahun</small><b>${item.tahun}</b></div>
            <div><small>Pengunggah</small><b>${dash(item.pengunggah)}</b></div>
            <div><small>Tanggal unggah</small><b>${dash(item.tanggal)}</b></div>
          </div>
        </div>
        <div class="md-r">
          <div class="ic">📄</div>
          <small>Daftar berkas (${files.length})</small>
          <div class="md-f">
            ${files.length
              ? files
                  .map(
                    (file, index) =>
                      `<button type="button" data-i="${index}" class="${index ? "" : "on"}">${esc(file.nama)}</button>`,
                  )
                  .join("")
              : "<p>Belum ada berkas.</p>"}
          </div>
          <a class="btn md-d${files.length ? "" : " off"}">Unduh</a>
        </div>
      </div>`;

    const close = () => {
      overlay.remove();
      document.removeEventListener("keydown", key);
    };

    const key = (event) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", key);
    const download = overlay.querySelector(".md-d");

    const setDownload = () => {
      if (files.length) {
        download.href = files[current].path;
        download.setAttribute("download", "");
      }
    };

    setDownload();

    overlay.onclick = (event) => {
      if (event.target === overlay || event.target.closest(".md-x")) close();

      const button = event.target.closest(".md-f button");
      if (button) {
        current = Number(button.dataset.i);
        overlay.querySelectorAll(".md-f button").forEach((buttonElement, index) => {
          buttonElement.classList.toggle("on", index === current);
        });
        setDownload();
      }
    };

    document.body.appendChild(overlay);
  }

  const route = () => {
    document.querySelectorAll(".ov").forEach((overlay) => overlay.remove());
    const course = D.find((item) => item.id === location.hash.slice(1));
    if (course) mk(course);
    else home();
    window.scrollTo(0, 0);
  };

  addEventListener("hashchange", route);
  route();
})();
