# React + TypeScript + Docker

Khung dự án web cơ bản dùng **React 18**, **TypeScript** và **Vite**, kèm cấu hình **Docker** cho cả môi trường development và production.

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
├── vite.config.ts
├── Dockerfile            # Build + phục vụ qua nginx (production)
├── Dockerfile.dev        # Vite dev server (hot reload)
├── docker-compose.yml
├── nginx.conf
└── .dockerignore
```

## Chạy trực tiếp (không dùng Docker)

Yêu cầu: Node.js >= 18.

```bash
npm install      # Cài dependencies
npm run dev      # Chạy dev server tại http://localhost:5173
npm run build    # Build production vào thư mục dist/
npm run preview  # Xem thử bản build
npm run lint     # Kiểm tra lint
```

## Chạy bằng Docker

### Production (nginx)

```bash
docker compose up --build
```

Truy cập: http://localhost:8080

### Development (hot reload)

```bash
docker compose --profile dev up --build
```

Truy cập: http://localhost:5173

## Công nghệ sử dụng

- React 18
- TypeScript 5
- Vite 5
- Docker + nginx (production)
