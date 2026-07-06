# TodoList

Ứng dụng TodoList gồm **frontend** (React + TypeScript + Vite) và **backend** (Spring Boot + JPA).

**Link trang web** : https://todolist-app-xi-pied.vercel.app

## Cấu trúc dự án

```
.
├── frontend/          # React 18 + TypeScript + Vite
│   ├── public/        # Tài nguyên tĩnh
│   ├── src/           # Mã nguồn (components, App.tsx, main.tsx...)
│   └── package.json
└── backend/           # Spring Boot 4 + Spring Data JPA (Java 17, Maven)
    ├── src/           # Mã nguồn Java
    ├── Dockerfile     # Đóng gói app thành image
    ├── compose.yaml   # Chạy app bằng Docker Compose
    └── pom.xml
```

## Frontend (React + TypeScript + Vite)

Yêu cầu: Node.js >= 18.

```bash
cd frontend
npm install      # Cài dependencies
npm run dev      # Chạy dev server tại http://localhost:5173
npm run build    # Build production vào thư mục dist/
npm run preview  # Xem thử bản build
npm run lint     # Kiểm tra lint
```

Sau khi `npm run build`, thư mục `dist/` chứa các file tĩnh có thể deploy lên bất kỳ static hosting nào (Vercel, Netlify, GitHub Pages, S3/CDN...).

## Backend (Spring Boot)

Yêu cầu: Java 17+. Database dùng cloud (ví dụ [Neon](https://neon.tech) - PostgreSQL). Không cần cài Maven vì dự án đã có Maven Wrapper (`mvnw`).

### Cấu hình database

Sao chép file mẫu và điền thông tin kết nối DB cloud của bạn:

```bash
cd backend
cp .env.example .env      # Windows: copy .env.example .env
```

Nội dung `.env` cần điền:

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>/<db>?sslmode=require
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
SPRING_JPA_HIBERNATE_DDL_AUTO=update
```

> Lưu ý: cần thêm driver database tương ứng vào `pom.xml` (ví dụ `org.postgresql:postgresql`) nếu chưa có.

### Cách 1: Chạy bằng Docker (khuyến nghị)

```bash
cd backend
docker compose up --build
```

App chạy tại http://localhost:8080. Docker Compose tự nạp biến từ file `.env`.

### Cách 2: Chạy trực tiếp bằng Maven Wrapper

```bash
cd backend
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```

Cách này cần các biến `SPRING_DATASOURCE_*` có sẵn trong môi trường (hoặc khai báo trong `src/main/resources/application.properties`).

## Công nghệ sử dụng

- **Frontend**: React 18, TypeScript 5, Vite 5
- **Backend**: Spring Boot 4, Spring Data JPA, Java 17, Maven
- **Đóng gói**: Docker, Docker Compose
