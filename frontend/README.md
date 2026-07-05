# React + TypeScript + Vite

Khung dự án web cơ bản dùng **React 18**, **TypeScript** và **Vite**.

## Cấu trúc thư mục

```
.
├── public/               # Tài nguyên tĩnh
├── src/
│   ├── App.tsx           # Component chính
│   ├── App.css
│   ├── main.tsx          # Điểm khởi động ứng dụng
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig*.json        # Cấu hình TypeScript
└── vite.config.ts
```

## Chạy dự án

Yêu cầu: Node.js >= 18.

```bash
npm install      # Cài dependencies
npm run dev      # Chạy dev server tại http://localhost:5173
npm run build    # Build production vào thư mục dist/
npm run preview  # Xem thử bản build
npm run lint     # Kiểm tra lint
```

## Triển khai

Sau khi `npm run build`, thư mục `dist/` chứa các file tĩnh có thể deploy lên bất kỳ static hosting nào (Vercel, Netlify, GitHub Pages, S3/CDN...).

## Công nghệ sử dụng

- React 18
- TypeScript 5
- Vite 5
