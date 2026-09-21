<div align="center">

# 🌟 Tạ Ngọc Dũng (DungX) | Personal Portfolio & Mini Apps Hub

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://ngocdungvn.github.io/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](manifest.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Trang cá nhân & Bộ sưu tập hơn 14 Mini Apps, Games và Tiện ích tương tác trực tuyến</b><br>
  Thiết kế theo phong cách hiện đại (Glassmorphism & Neumorphism), tương thích hoàn hảo 100% với thiết bị di động.
</p>

[🌐 Trải nghiệm Trực tiếp (Live Demo)](https://ngocdungvn.github.io/) • [🚀 Danh sách Mini Apps](#-kho-mini-apps--tiện-ích-tương-tác) • [🛠️ Công nghệ Sử dụng](#-công-nghệ-sử-dụng) • [📫 Kết nối](#-kết-nối)

---

</div>

## 📖 Giới Thiệu (About)

Chào mừng bạn đến với kho mã nguồn trang cá nhân của **Tạ Ngọc Dũng (DungX)**. Website được xây dựng với mục tiêu vừa là Portfolio giới thiệu kỹ năng, lộ trình phát triển và các chứng chỉ công nghệ, vừa đóng vai trò như một **Hub ứng dụng web nhỏ (Mini Apps Hub)** phục vụ nhu cầu giải trí, tính toán và tiện ích thường nhật.

### ✨ Điểm Nổi Bật
- **Thiết kế chuẩn UI/UX**: Tích hợp chế độ **Sáng / Tối (Light/Dark Mode)** linh hoạt với độ tương phản cao, bảng màu tuyển chọn và hệ thống vi viền (micro-borders) tinh tế.
- **Tối ưu hóa 100% cho Di động**: Toàn bộ game và tiện ích đều được trang bị phím cảm ứng ảo (Virtual D-pad, nút bấm cảm ứng đa điểm, vuốt chạm mượt mà).
- **Trải nghiệm Tab độc lập**: Mọi mini app khi kích hoạt đều mở sang tab mới, loại bỏ các nút thừa thãi để tối đa hóa không gian màn hình di động.
- **Hiệu ứng Âm thanh Nội tại**: Ứng dụng Web Audio API để phát âm thanh tổng hợp (synth, pops, chimes) mà không phụ thuộc vào việc tải file âm thanh ngoài.
- **Tiện ích 1 Chạm**: Sao chép số tài khoản ngân hàng, thông báo Zalo chia tiền chỉ với 1 cú click kèm hiệu ứng Toast phản hồi tức thì.

---

## 🚀 Kho Mini Apps & Tiện Ích Tương Tác

Hệ thống mini apps được phân chia khoa học thành 3 danh mục chính:

### 🛠️ 1. Nhóm Tiện Ích (Tools & Utilities)

| STT | Ứng Dụng | Tệp Tin | Mô Tả & Tính Năng Nổi Bật |
|:---:|---|---|---|
| 01 | **Quay Số Ngẫu Nhiên** | [`project/random_number.html`](project/random_number.html) | Bốc thăm trúng thưởng và quay số ngẫu nhiên dải tùy chỉnh (A-Z), thời gian quay 1.5s mượt mà, hiệu ứng pháo giấy Confetti Canvas, giao diện Light sang trọng. |
| 02 | **Chia Tiền Kèo Bóng Đá** | [`project/share_bill.html`](project/share_bill.html) | Tính toán chia tiền ăn nhậu, kèo phạt bóng đá theo tag chips liền dòng; hỗ trợ làm tròn linh hoạt, kiểm tra khớp bill thông minh và sao chép thông báo gửi Zalo chuẩn format. |
| 03 | **Máy Tính Neumorphic** | [`project/Calculator.html`](project/Calculator.html) | Máy tính cầm tay bỏ túi phong cách kính mờ Neumorphism, bộ phân tích biểu thức toán học an toàn (Safe Math Parser), hỗ trợ đầy đủ phím số học. |
| 04 | **Downloads Android TV** | [`project/downloads.html`](project/downloads.html) | Cổng tải nhanh các tệp tin APK xem phim, truyền hình và tiện ích tối ưu cho Android Box / Smart TV với bộ lọc danh mục và nút sao chép link 1 chạm. |
| 05 | **Color Clock Sắc Màu** | [`project/colorclock.html`](project/colorclock.html) | Đồng hồ thời gian thực chuyển đổi màu nền theo mã Hex của giờ:phút:giây, co giãn linh hoạt bằng CSS `clamp()`, tích hợp drawer tùy chỉnh hiển thị. |

### 🎮 2. Nhóm Trò Chơi (Interactive Games)

| STT | Trò Chơi | Tệp Tin | Mô Tả & Cơ Chế Điều Khiển |
|:---:|---|---|---|
| 06 | **Rắn Săn Mồi Cổ Điển** | [`project/Snakegame.html`](project/Snakegame.html) | Tái hiện trò chơi Snake huyền thoại với tỉ lệ canvas 1:1, trang bị **D-pad cảm ứng ảo** trên điện thoại, bảng HUD điểm số và kỷ lục High Score. |
| 07 | **Nhảy Tầng Fall Game** | [`project/fall_game.html`](project/fall_game.html) | Điều khiển bóng rơi qua các khe hở vô tận, vật lý 2D mượt mà, nút cảm ứng Trái/Phải phản hồi liên tục khi giữ ngón tay. |
| 08 | **Cá Lớn Nuốt Cá Bé** | [`project/fishies.html`](project/fishies.html) | Trò chơi săn mồi biển sâu kinh điển trên Canvas 2D, hỗ trợ chạm vuốt đa điểm (`touchstart`/`touchmove`) để đàn cá bơi theo đầu ngón tay. |
| 09 | **Pi Đi Tìm Sữa** | [`project/BabyWantsMilk.html`](project/BabyWantsMilk.html) | Game phiêu lưu mê cung tìm bình sữa cho bé Pi, hỗ trợ cụm phím D-pad 4 hướng và nút Action cảm ứng ảo. |
| 10 | **Bóng Bàn 2D Ping Pong** | [`project/ping-pong.html`](project/ping-pong.html) | Game bóng bàn cổ điển đối đầu AI Bot thông minh, hỗ trợ vuốt chạm điều khiển vợt trực tiếp trên sàn đấu hoặc nút bấm ảo. |
| 11 | **Thử Thách Simon Memory** | [`project/simon-game.html`](project/simon-game.html) | Game rèn luyện trí nhớ thính giác và thị giác qua chuỗi tín hiệu màu sắc, âm thanh tổng hợp bằng Web Audio API không có độ trễ. |

### 🎨 3. Nhóm Hiệu Ứng & Nghệ Thuật (Visual & Creative Arts)

| STT | Trải Nghiệm | Tệp Tin | Mô Tả & Hiệu Ứng |
|:---:|---|---|---|
| 12 | **Bánh Sinh Nhật Thổi Nến** | [`project/birthday-cake.html`](project/birthday-cake.html) | Chiếc bánh sinh nhật 3 tầng tương tác trực quan, tự động scale vừa mọi kích cỡ màn hình, tương tác 1 click để thổi nến hoặc double click để thắp lại nến kèm âm thanh puff & chime. |
| 13 | **Pháo Hoa Chạm Bắn** | [`project/click-fireworks.html`](project/click-fireworks.html) | Chạm hoặc nhấp chuột vào bất kỳ vị trí nào trên màn hình để kích nổ chùm pháo hoa rực rỡ với âm thanh nổ sống động và fade-out tự nhiên. |
| 14 | **Pháo Hoa Tương Tác 2023** | [`project/firework/index.html`](project/firework/index.html) | Trình diễn pháo hoa chào năm mới với hệ thống điều khiển âm thanh, pause/play và thanh chỉnh kích thước hạt. |

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

Dự án ưu tiên tôn chỉ **tối ưu hiệu năng, giảm thiểu thư viện ngoài nặng nề** và khai thác tối đa sức mạnh của nền tảng web hiện đại:

- **Frontend Core**: HTML5 Semantic, CSS3 (Modern Flexbox & Grid, CSS Custom Properties / Design Tokens), Vanilla JavaScript (ES6+).
- **Hiệu Ứng & Đồ Họa**: HTML5 Canvas API, WebGL, CSS 3D Transforms, `VanillaTilt.js`.
- **Âm Thanh**: Web Audio API (tạo sóng âm Oscillation, Noise buffer tạo tiếng pháo và nến thổi chân thực).
- **Lưu Trữ & Trạng Thái**: `localStorage` (lưu tùy chọn Theme Sáng/Tối, kỷ lục trò chơi).
- **PWA Ready**: Web App Manifest, Service Worker caching cho trải nghiệm cài đặt mượt mà trên iOS và Android.
- **Biểu Tượng & Phông Chữ**: [Unicons (IconScout)](https://iconscout.com/unicons), Google Fonts (Inter, Outfit).

---

## 💻 Hướng Dẫn Chạy Cục Bộ (Local Development)

Dự án là một **Static Web Application thuần túy**, không yêu cầu cài đặt `npm`, `node_modules` hay bước build bundle phức tạp nào.

1. **Clone kho lưu trữ**:
   ```bash
   git clone https://github.com/ngocdungvn/ngocdungvn.github.io.git
   cd ngocdungvn.github.io
   ```

2. **Khởi chạy Local Server**:
   Bạn có thể mở trực tiếp tệp `index.html` trên bất kỳ trình duyệt nào, hoặc dùng local HTTP server để kiểm thử Service Worker và PWA:

   - **Cách 1: Sử dụng Python (khuyên dùng)**:
     ```bash
     # Python 3
     python -m http.server 8000
     ```
     Sau đó truy cập: `http://localhost:8000`

   - **Cách 2: Sử dụng VS Code Live Server**:
     Nhấp chuột phải vào `index.html` và chọn **"Open with Live Server"**.

   - **Cách 3: Sử dụng Node.js (nếu có)**:
     ```bash
     npx serve .
     ```

---

## 📂 Cấu Trúc Thư Mục (Project Structure)

```text
ngocdungvn.github.io/
├── assets/                  # Tài nguyên dùng chung
│   ├── css/
│   │   └── styles.css       # Toàn bộ hệ thống CSS & Design Tokens
│   ├── js/
│   │   └── main.js          # Logic giao diện chính, lọc dự án, theme toggle
│   └── img/                 # Hình ảnh, chứng chỉ, favicons, PWA icons
├── project/                 # Thư mục chứa 15 Mini Apps độc lập
│   ├── random_number.html   # Quay số ngẫu nhiên A-Z
│   ├── share_bill.html      # Chia tiền kèo bóng đá
│   ├── Calculator.html      # Máy tính Neumorphic
│   ├── downloads.html       # Cổng tải app Android TV
│   ├── colorclock.html      # Đồng hồ đổi màu Hex
│   ├── Snakegame.html       # Rắn săn mồi cổ điển (touch D-pad)
│   ├── fall_game.html       # Nhảy tầng Fall Game
│   ├── fishies.html         # Cá lớn nuốt cá bé Canvas
│   ├── BabyWantsMilk.html   # Pi đi tìm sữa
│   ├── ping-pong.html       # Bóng bàn 2D Ping Pong (đấu AI)
│   ├── simon-game.html      # Thử thách Simon Memory
│   ├── birthday-cake.html   # Bánh sinh nhật thổi nến tương tác
│   ├── click-fireworks.html # Pháo hoa chạm bắn
│   └── firework/            # Pháo hoa tương tác 2023
├── index.html               # Trang Portfolio chính
├── manifest.json            # Cấu hình PWA
├── serviceWorker.js         # Service worker offline
└── README.md                # Tài liệu dự án
```

---

## 📫 Kết Nối & Ủng Hộ (Connect & Support)

Nếu bạn thấy các dự án nhỏ này thú vị hoặc có ích, hãy để lại một ⭐️ **Star** cho kho lưu trữ này nhé!

- **Họ và tên**: Tạ Ngọc Dũng
- **Facebook**: [facebook.com/61592643973967](https://www.facebook.com/profile.php?id=61592643973967)
- **Zalo**: [0969 080 811](https://zalo.me/0969080811)
- **YouTube**: [@tangocdung](https://www.youtube.com/@tangocdung)
- **X (Twitter)**: [@ngocdungvn](https://x.com/ngocdungvn)
- **Website cá nhân**: [https://ngocdungvn.github.io/](https://ngocdungvn.github.io/)

---

<div align="center">
  <sub>Bản quyền &copy; 2026 Tạ Ngọc Dũng. Mọi quyền được bảo lưu.</sub>
</div>
