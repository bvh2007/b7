"use strict";
const $ = (s) => document.querySelector(s);
const page = document.body.dataset.page;
let motion = localStorage.getItem("motion") !== "off";
function updateMotion() {
  document.body.classList.toggle("reduce-motion", !motion);
  document
    .querySelectorAll(".motion")
    .forEach(
      (b) => (b.textContent = motion ? "Tắt chuyển động" : "Bật chuyển động"),
    );
}
updateMotion();
document.querySelectorAll(".motion").forEach(
  (b) =>
    (b.onclick = () => {
      motion = !motion;
      localStorage.setItem("motion", motion ? "on" : "off");
      updateMotion();
    }),
);
const sky = $("#spaceSky");
if (sky) {
  for (let i = 0; i < 145; i++) {
    let s = document.createElement("span");
    s.className = i % 8 === 0 ? "heart-float" : "twinkle";
    s.textContent = i % 8 === 0 ? "♡" : "✦";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.fontSize =
      (i % 8 === 0 ? 8 + Math.random() * 13 : 2 + Math.random() * 8) + "px";
    s.style.setProperty("--dur", 2 + Math.random() * 5 + "s");
    s.style.animationDelay = -Math.random() * 7 + "s";
    sky.append(s);
  }
}
async function api(url, opt) {
  const r = await fetch(url, { credentials: "same-origin", ...opt });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `HTTP ${r.status}`);
  return data;
}
function json(body) {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}
function text(el, s) {
  el.textContent = s || "";
}
function words(list) {
  if (!Array.isArray(list) || !list.length) return;
  document.addEventListener("pointerdown", (e) => {
    if (
      !motion ||
      e.target.closest("button,a,input,textarea,select,dialog,form")
    )
      return;
    const node = document.createElement("span");
    node.textContent = list[Math.floor(Math.random() * list.length)];
    Object.assign(node.style, {
      position: "fixed",
      left: e.clientX + "px",
      top: e.clientY + "px",
      zIndex: "50",
      pointerEvents: "none",
      color: "#ffc8ef",
      fontWeight: "bold",
      transition: "transform 1.8s, opacity 1.8s",
    });
    document.body.append(node);
    requestAnimationFrame(() => {
      node.style.transform = "translateY(-85px)";
      node.style.opacity = "0";
    });
    setTimeout(() => node.remove(), 1900);
  });
}
function photoDialog(photos) {
  const dialog = document.createElement("dialog");
  dialog.className = "overlay";
  const img = document.createElement("img"),
    h = document.createElement("h3"),
    message = document.createElement("p"),
    close = document.createElement("button");
  close.textContent = "Đóng ×";
  close.onclick = () => dialog.close();
  dialog.append(img, h, message, close);
  document.body.append(dialog);
  return (i) => {
    const p = photos[i];
    img.src = p.imageUrl || "";
    img.hidden = !p.imageUrl;
    text(h, p.title || `Ảnh ${i + 1}`);
    text(message, p.message || "");
    dialog.showModal();
  };
}
async function init() {
  if (page === "gate") {
    $("#showGate").onclick = () => {
      $("#gateForm").hidden = false;
      $("#showGate").setAttribute("aria-expanded", "true");
      $("#gatePassword").focus();
    };
    $("#gateForm").onsubmit = async (e) => {
      e.preventDefault();
      try {
        await api(
          "/api/visitor/login",
          json({ password: $("#gatePassword").value }),
        );
        location.assign("/welcome.html");
      } catch (err) {
        text($("#gateStatus"), err.message);
      }
    };
    return;
  }
  const data = await api("/api/message");
  words(data.clickMessages);
  if (page === "welcome") {
    text($("#welcomeTitle"), "toi mún nói nà");
    const msg = `hiluuu cham`;
    const target = $("#typewriter");
    if (!motion) {
      text(target, msg);
    } else {
      let i = 0;
      const timer = setInterval(() => {
        target.textContent = msg.slice(0, ++i);
        if (i >= msg.length) clearInterval(timer);
      }, 45);
    }
  }

  if (page === "apology") {
    const list = $("#apologyList");

    const reflections = [
      {
        title: "xin lỗi mà",
        body: "tha lỗi đi ",
      },
      {
        title: "cham tha lỗi cho tôi đi",
        body: "cinn lỗi",
      },
      {
        title: "muốn đc bỏ qua",
        body: "yesss",
      },
    ];

    reflections.forEach((r, i) => {
      const card = document.createElement("article");
      card.className = "page-card reveal";

      const h = document.createElement("h2");
      const p = document.createElement("p");

      text(h, r.title || `Đoạn ${i + 1}`);
      text(p, r.body);

      card.append(h, p);
      list.append(card);
    });
  }

  if (page === "memories") {
    const photos = await api("/api/photos");
    const open = photoDialog(photos),
      list = $("#memoryList");
    photos.forEach((p, i) => {
      const btn = document.createElement("button"),
        img = document.createElement("img"),
        label = document.createElement("span");
      img.src = p.imageUrl || "";
      img.alt = p.title || `Ảnh ${i + 1}`;
      img.hidden = !p.imageUrl;
      text(label, p.title || `Ảnh ${i + 1}`);
      btn.append(img, label);
      btn.onclick = () => open(i);
      list.append(btn);
    });
  }

  if (page === "letter") {
    // TIÊU ĐỀ LÁ THƯ
    const letterTitle = "Lá thư cuối dành cho chamm";

    // NỘI DUNG LÁ THƯ - BẠN CHỈ CẦN THAY CHỮ
    const letterParagraphs = ["tha lỗi đii..."];

    // HIỂN THỊ TIÊU ĐỀ
    text($("#letterTitle"), letterTitle);

    // HIỂN THỊ CÁC ĐOẠN VĂN
    const body = $("#letterBody");
    body.replaceChildren();

    letterParagraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      text(p, paragraph);
      body.append(p);
    });

    // NÚT MỞ LÁ THƯ
    $("#openLetter").onclick = () => {
      $("#letterSheet").hidden = false;
      $("#openLetter").hidden = true;
    };
  }

  if (page === "response") {
    $("#responseForm").onsubmit = async (e) => {
      e.preventDefault();
      const status = $("#responseStatus"),
        choice = $("#responseChoice").value,
        message = $("#responseText").value.trim();
      if (!choice && !message) {
        text(status, "Bạn có thể chọn một phản hồi hoặc viết lời nhắn.");
        return;
      }
      try {
        await api("/api/replies", json({ choice, message }));
        text(status, "Đã gửi phản hồi. Cảm ơn bạn.");
        e.target.reset();
      } catch (err) {
        text(status, err.message);
      }
    };
  }
  if (page === "game") {
    let score = 0,
      seconds = 20,
      timer = null;
    const area = $("#gameArea");
    $("#startGame").onclick = () => {
      if (timer) return;
      score = 0;
      seconds = 20;
      text($("#score"), "0");
      text($("#remaining"), "20");
      text($("#gameStatus"), "");
      const heart = document.createElement("button");
      heart.className = "game-heart";
      heart.textContent = "♡";
      heart.setAttribute("aria-label", "Chạm trái tim");
      function move() {
        heart.style.left = Math.random() * 85 + "%";
        heart.style.top = Math.random() * 75 + "%";
      }
      heart.onclick = () => {
        score++;
        text($("#score"), String(score));
        move();
      };
      area.replaceChildren(heart);
      move();
      timer = setInterval(() => {
        seconds--;
        text($("#remaining"), String(seconds));
        if (seconds <= 0) {
          clearInterval(timer);
          timer = null;
          heart.remove();
          text($("#gameStatus"), `Kết thúc! Bạn được ${score} điểm.`);
        }
      }, 1000);
    };
  }
}
init().catch((err) => {
  console.error(err);
  const m = document.createElement("p");
  m.className = "status";
  m.textContent = "Không tải được nội dung: " + err.message;
  document.querySelector("main")?.prepend(m);
});
