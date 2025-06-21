function registerUser() {
  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value;
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!nama || !kelas || !username || !password) {
    alert("Semua kolom wajib diisi.");
    return;
  }

  // Validasi password: minimal 4 huruf dan 2 angka
  const huruf = password.replace(/[^a-zA-Z]/g, "").length;
  const angka = password.replace(/[^0-9]/g, "").length;
  if (password.length < 6 || huruf < 4 || angka < 2) {
    alert("Password harus terdiri dari minimal 4 huruf dan 2 angka.");
    return;
  }

  const siswa = JSON.parse(localStorage.getItem("siswa")) || [];

  // Cek jika username sudah digunakan
  if (siswa.find(s => s.username === username)) {
    alert("Username sudah digunakan, silakan pilih yang lain.");
    return;
  }

  // Simpan data siswa baru
  siswa.push({ nama, kelas, username, password });
  localStorage.setItem("siswa", JSON.stringify(siswa));

  alert("Pendaftaran berhasil! Silakan login.");
  window.location.href = "login.html";
}

function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const siswa = JSON.parse(localStorage.getItem("siswa")) || [];

  const akun = siswa.find(s =>
    s.username === username && s.password === password
  );

  if (akun) {
    // Jika belum punya ruangan dan posisi, cari otomatis dari daftar denah
    if (!akun.ruangan || !akun.posisi) {
      const denah = {
        "10-1": ["Ahmad", "Budi", "Cahyo", "Dedi", "Eko", "Anisa", "Bella", "Citra", "Diah", "Erika"],
        "10-2": ["Farhan", "Galih", "Hadi", "Iqbal", "Joko", "Fitri", "Gita", "Hani", "Intan", "Julia"],
        "11-1": ["Arif", "Bagus", "Candra", "Dani", "Ewan", "Ayu", "Bella", "Clara", "Dewi", "Erika"],
        "11-2": ["Fikri", "Guntur", "Julia", "Heru", "Irfan", "Jefri", "Fitri", "Gita", "Hani", "Intan"],
        "12-1": ["Agus", "Bayu", "Cipto", "Danu", "Endra", "Ayu", "Bella", "Citra", "Dinda", "Erika"],
        "12-2": ["Fikri", "Galang", "Hafiz", "Ilham", "Johan", "Fani", "Gisel", "Haniyah", "Indah", "Julia"]
      };

      for (const [ruang, namaList] of Object.entries(denah)) {
        const posisiIndex = namaList.findIndex(nama =>
          nama.toLowerCase().trim() === akun.nama.toLowerCase().trim()
        );
        if (posisiIndex !== -1) {
          akun.ruangan = ruang;
          akun.posisi = `Meja ${posisiIndex + 1}`;
          break;
        }
      }

      // Simpan perubahan kembali ke localStorage
      const index = siswa.findIndex(s => s.username === akun.username);
      if (index !== -1) siswa[index] = akun;
      localStorage.setItem("siswa", JSON.stringify(siswa));
    }

    // Simpan user login saat ini
    localStorage.setItem("loggedInUser", JSON.stringify(akun));
    window.location.href = "dashboard.html";
  } else {
    alert("Username atau password salah!");
  }
}
