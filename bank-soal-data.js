/*
 * DATA BANK SOAL
 * Tambahkan file PPT atau soal ke folder ppt/<mata-kuliah>/.
 * Contoh: ppt/matematika-diskrit/graf.pptx
 */

const m = (judul, extra = {}) => ({
  judul,
  dosen: "",
  semester: 1,
  tahun: 2026,
  kategori: "Materi",
  pengunggah: "",
  tanggal: "",
  berkas: [],
  ...extra,
});

const BANK_SOAL = [
  {
    id: "alpro",
    nama: "Algoritma dan Pemrograman",
    items: [
      m("Algoritma, Pseudocode, dan Flowchart"),
      m("Dasar C++ (Output, Variabel, Input, Tipe Data)"),
      m("Operator dan Boolean"),
      m("Percabangan (if..else, switch)"),
      m("Perulangan (while, for)"),
    ],
  },
  {
    id: "matematika-diskrit",
    nama: "Matematika Diskrit",
    items: [
      m("Graf"),
      m("Euler dan Hamilton"),
      m("Lintasan Terpendek"),
      m("Pohon (Prim dan Kruskal)"),
    ],
  },
  {
    id: "pengantar-tik",
    nama: "Pengantar Teknologi Informasi dan Komunikasi",
    items: [
      m("Jaringan Komputer (LAN, WAN, Topologi, Protokol)"),
      m("Routing Jaringan"),
    ],
  },
  {
    id: "piranti-komputer",
    nama: "Piranti Komputer",
    items: [],
  },
  {
    id: "sistem-operasi",
    nama: "Sistem Operasi",
    items: [
      m("Konsep Sistem Komputer"),
      m("Konsep Sistem Operasi"),
      m("Komponen Sistem Operasi dan Manajemen File"),
      m("Manajemen Proses dan Penjadwalan Proses"),
    ],
  },
];
