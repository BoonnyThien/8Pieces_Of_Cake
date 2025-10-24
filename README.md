
# Happy Vietnamese Women's Day 💐
Love → Kindness → Courage → Passion → Hope → Joy → Luck → Peace

Một dự án 3D nhỏ được tạo ra để chúc mừng Ngày Phụ nữ Việt Nam 20/10, sử dụng Vue 3 và TresJS.

**✨ Live Demo:** https://happy-vietnamese-women-day-ni.netlify.app/

## 🌟 Tính năng chính

-   **Giao diện 3D tương tác**: Người dùng có thể xoay, phóng to/thu nhỏ để xem các mô hình 3D.
-   **Hiển thị nhiều mô hình hoa**: Cho phép chuyển đổi và hiển thị nhiều loại hoa khác nhau.
-   **Lời chúc ý nghĩa**: Hiển thị các lời chúc mừng ngày 20/10.
-   **Tùy chỉnh giao diện**: Cho phép người dùng thay đổi màu nền của không gian 3D.
-   **Giao diện responsive**: Tương thích tốt trên các thiết bị di động.

## 🛠️ Công nghệ sử dụng

-   **Framework**: Vue 3 (Composition API)
-   **Thư viện 3D**: TresJS (wrapper cho Three.js trong Vue)
-   **Plugins**: @tresjs/cientos (GLTFModel, OrbitControls, ...)
-   **Build Tool**: Vite
-   **Animation**: GSAP
-   **Deployment**: Netlify

## 🚀 Hướng dẫn cài đặt và chạy dự án (local)

1.  Clone repository:

	git clone https://github.com/BoonnyThien/Happy-Vietnamese-Women-s-Day.git

2.  Mở thư mục dự án:

	cd "Happy-Vietnamese Women's Day"

3.  Cài dependencies:

	npm install

4.  Chạy môi trường phát triển:

	npm run dev -- --force

5.  Build production:

	npm run build

## 📂 Cấu trúc dự án (tóm tắt)

```
.
├── public/                  # Chứa assets tĩnh (models, textures)
├── src/
│   ├── assets/              # CSS, textures
│   ├── components/
│   │   ├── canvas/          # 3D components (TresJS)
│   │   └── ui/              # UI components
│   ├── composables/         # reusable logic (useUI)
│   ├── App.vue              # Root component
│   └── main.js              # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 📝 Ghi chú kỹ thuật & debugging

- Nếu bạn thấy cảnh báo `Failed to resolve component: Tres*` — kiểm tra `src/main.js` có `app.use(Tres)` và `app.use(Cientos)` chưa. Sau đó khởi động lại Vite với `--force`.
- Nếu có lỗi khi load GLB, kiểm tra đường dẫn trong `path` prop của `GLTFModel` và console log của trình duyệt.

---

Cảm ơn bạn đã xem dự án — nếu cần thêm tính năng (ví dụ: nút chuyển vị trí các hoa, đổi màu nền, screenshot), tôi sẽ triển khai tiếp.

