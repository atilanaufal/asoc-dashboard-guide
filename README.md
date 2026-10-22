# ASOC Client Dashboard - User Guide (Static Web Documentation)

Dokumentasi web statis panduan pengguna (*User Guideline*) untuk platform **ASOC Client Dashboard**.

---

## 📌 Deskripsi

Repositori ini berisi file statis HTML, CSS, JavaScript, dan tangkapan layar (*screenshots*) yang disajikan sebagai portal panduan pengguna terisolasi pada server produksi ASOC. Portal ini dilindungi oleh autentikasi sesi melalui Nginx reverse proxy subrequest (`ngx_http_auth_request_module`) ke endpoint Next.js `/api/auth/me`.

---

## 📁 Struktur Direktori

```text
.
├── assets/
│   ├── css/
│   │   └── styles.css                                    # Stylesheet dokumentasi (responsive light/blue theme)
│   ├── js/
│   │   └── app.js                                        # Search modal (Ctrl+K), Scrollspy, Mobile Drawer
│   └── images/
│       ├── logo/
│       │   └── infoguard.png                             # Logo identitas sistem
│       └── screenshots/                                  # Tangkapan layar antarmuka per modul
│           ├── auth/
│           ├── dashboard/
│           ├── devices/
│           ├── header/
│           ├── incidents/
│           ├── navigation/
│           ├── reports/
│           └── vulnerabilities/
├── docs/
│   └── ASOC Dashboard User Guideline.md                  # Dokumen sumber panduan markdown
├── authentication.html                                   # Panduan Autentikasi & Single Active Session
├── dashboard.html                                        # Panduan Metrik Dashboard, Severity & Risk Index
├── devices.html                                          # Panduan Inventaris Endpoint Wazuh & Status Agen
├── faq.html                                              # Pertanyaan Umum & Pemecahan Masalah (Troubleshooting)
├── header.html                                           # Panduan Filter Waktu, Jam Operasional & Profil
├── incidents.html                                        # Panduan Investigasi Alerts & Incidents Grouping
├── index.html                                            # Halaman Utama (Pendahuluan & Gambaran Umum)
├── reports.html                                          # Panduan Laporan DFIR-IRIS & Ekspor PDF
├── risk-score-formula.html                               # Formula Matematis Tenant & Host Risk Score
└── vulnerabilities.html                                  # Panduan Manajemen Kerentanan & Remediasi CVE
```

---

## 🚀 Deployment di VM Produksi

Di server VM produksi (`10.20.100.86`), repositori ini di-clone langsung ke direktori publik `/var/www/asoc-guide`:

```bash
# 1. Clone repositori ke direktori web statis
sudo git clone https://github.com/atilanaufal/asoc-dashboard-guide.git /var/www/asoc-guide

# 2. Atur kepemilikan dan hak akses (Least Privilege)
sudo chown -R www-data:www-data /var/www/asoc-guide
sudo find /var/www/asoc-guide -type d -exec chmod 755 {} +
sudo find /var/www/asoc-guide -type f -exec chmod 644 {} +

# 3. Pembaruan di kemudian hari cukup dengan git pull
cd /var/www/asoc-guide && sudo git pull origin main
```
