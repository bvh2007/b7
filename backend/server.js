require("dotenv").config();
const app = require("./app");
const db = require("./db");
const port = Number(process.env.PORT || 3000);
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ Đã kết nối MySQL thành công");
    app.listen(port, "0.0.0.0", () =>
      console.log(`🚀 Sorry Bloom đang chạy tại http://localhost:${port}`),
    );
  } catch (err) {
    console.error("❌ Kết nối MySQL thất bại:", err.message);
    process.exitCode = 1;
    db.end().catch(() => {});
  }
})();
