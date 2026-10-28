# Sorry Bloom — 8 trang + Admin

## Các trang
`/` (cổng mật khẩu), `/welcome.html`, `/apology.html`, `/memories.html`, `/game.html`, `/gift.html`, `/letter.html`, `/response.html`, `/admin`.

## Chạy local
1. `npm install`
2. Sao chép `.env.example` thành `.env` và điền MySQL + `SESSION_SECRET`.
3. Tạo database trên MySQL và chạy `database/schema.sql`. Nếu đã dùng schema cũ, chỉ chạy `database/migrate_existing.sql` **một lần**.
4. Tạo mã hash cho mật khẩu người xem: `node scripts/hash-password.js "mat-khau-ban-muon"`. Sao chép kết quả vào `VISITOR_PASSWORD_HASH` trong `.env` hoặc Render Environment. Không lưu mật khẩu rõ vào Git.
5. Tạo Admin: xem `scripts/create-admin.js` (yêu cầu kết nối DB và các biến môi trường của script).
6. `npm start`, mở `http://localhost:3000`.

## Render
- Build: `npm install && npm run build`; Start: `npm start`.
- Khai báo MySQL Cloud (DATABASE_URL hoặc DB_*), `DB_SSL=true` nếu provider yêu cầu TLS, `SESSION_SECRET`, `VISITOR_PASSWORD_HASH`, Cloudinary credentials và `NODE_ENV=production` trong Render Environment.
- **Không** dùng `127.0.0.1` cho MySQL Cloud.
- Ảnh upload lưu ở Cloudinary `authenticated`; metadata ở MySQL; API yêu cầu phiên đăng nhập.
- `private-assets/gift/photo1.jpg`…`photo5.jpg` là ảnh mẫu **local only**. Thư mục này bị `.gitignore` bỏ qua vì chứa ảnh riêng tư. Để ảnh có trên Render, đăng nhập Admin và upload lên Cloudinary; không dùng Render filesystem để lưu ảnh lâu dài.
- `frontend/public/img/` chỉ dùng ảnh được phép công khai.

## Kiểm thử thủ công
- Sai mật khẩu bị từ chối, đúng mật khẩu vào `/welcome.html`.
- Truy cập trực tiếp `/gift.html` khi chưa đăng nhập bị chuyển về `/`.
- 7 trang chương và trang Admin có URL riêng.
- Mở quà và bỏ qua animation đều vào thư viện ảnh; nhấn 5 ảnh xem từng lời nhắn.
- Game có thể bỏ qua; response có thể chọn một trong hai trạng thái hoặc viết tin nhắn.
- Admin lưu nội dung, upload 5 ảnh, xem phản hồi.
- Kiểm tra lại sau deploy/restart Render, đặc biệt ảnh upload Cloudinary và MySQL.

## Giới hạn
- Cần MySQL Cloud và Cloudinary do chủ website cấu hình. Chưa có khả năng chạy kiểm thử tích hợp thực tế với tài khoản Render/MySQL Cloud của bạn.
- Các ảnh local được đưa vào gói ZIP nhưng **không** tự động deploy vì bị gitignore.
- Ảnh đã đưa lên GitHub công khai trước đây không thể trở thành riêng tư chỉ bằng thêm auth; cần xóa khỏi lịch sử Git nếu đã lộ.
