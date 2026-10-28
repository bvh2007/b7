// Fail-safe: the open button must never be left inert if the photo API fails.
window.addEventListener("load", () => {
  const btn = document.getElementById("openGift"),
    skip = document.getElementById("skipGift"),
    intro = document.getElementById("giftIntro"),
    gallery = document.getElementById("gallery");
  if (!btn) return;
  const fallback = () => {
    intro.hidden = true;
    gallery.hidden = false;
    const area = document.getElementById("photoGallery");
    if (!area.children.length) {
      const p = document.createElement("p");
      p.textContent =
        "Chưa tải được ảnh. Hãy kiểm tra kết nối MySQL và đăng nhập.";
      area.append(p);
    }
  };
  if (!btn.onclick) btn.addEventListener("click", fallback);
  if (skip && !skip.onclick) skip.addEventListener("click", fallback);
});
