const albums = document.querySelectorAll(".album");
const mainPage = document.getElementById("main-page");
const scene = document.getElementById("scene");
let scrollY = 0,
  currentY = 0;
const maxScroll = albums.length * 1000;

function animate() {
  currentY += (scrollY - currentY) * 0.08;
  albums.forEach((album, i) => {
    const z = -i * 1000 + currentY;
    album.style.transform = `translate3d(${i % 2 === 0 ? -450 : 450}px, 0, ${z}px)`;
    album.style.opacity = z > 200 || z < -3000 ? 0 : 1;
  });
  mainPage.classList.toggle("visible", currentY >= maxScroll - 500);
  scene.style.opacity = currentY >= maxScroll - 500 ? "0" : "1";
  requestAnimationFrame(animate);
}

window.addEventListener("wheel", (e) => {
  scrollY = Math.max(0, Math.min(scrollY + e.deltaY * 2, maxScroll));
});
animate();

function drawCanvas(style) {
  const canvas = document.getElementById("redCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = (canvas.width = canvas.height = 350);

  ctx.fillStyle = "#0a0500";
  ctx.fillRect(0, 0, w, w);

  if (style === 1) {
    const g = ctx.createRadialGradient(
      w / 2,
      w * 0.7,
      0,
      w / 2,
      w * 0.5,
      w * 0.8
    );
    g.addColorStop(0, "#ffaa00");
    g.addColorStop(0.3, "#ff6600");
    g.addColorStop(0.6, "#cc3300");
    g.addColorStop(1, "#1a0500");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, w);
  } else if (style === 2) {
    const g1 = ctx.createRadialGradient(0, w / 2, 0, 0, w / 2, w * 0.9);
    g1.addColorStop(0, "#ff8800");
    g1.addColorStop(0.4, "#aa3300");
    g1.addColorStop(1, "transparent");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, w);
    const g2 = ctx.createRadialGradient(w, w * 0.3, 0, w, w * 0.3, w * 0.7);
    g2.addColorStop(0, "#ffcc00");
    g2.addColorStop(0.5, "#884400");
    g2.addColorStop(1, "transparent");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, w);
  } else if (style === 3) {
    const g = ctx.createLinearGradient(0, w, 0, 0);
    g.addColorStop(0, "#ff6600");
    g.addColorStop(0.3, "#aa2200");
    g.addColorStop(0.6, "#440000");
    g.addColorStop(1, "#0a0000");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, w);
    const g2 = ctx.createRadialGradient(w / 2, w, 0, w / 2, w, w * 0.6);
    g2.addColorStop(0, "rgba(255,170,0,0.5)");
    g2.addColorStop(1, "transparent");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, w);
  } else {
    const g1 = ctx.createRadialGradient(
      w * 0.3,
      w * 0.4,
      0,
      w * 0.3,
      w * 0.4,
      w * 0.5
    );
    g1.addColorStop(0, "#ff9900");
    g1.addColorStop(0.5, "#662200");
    g1.addColorStop(1, "transparent");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, w);
    const g2 = ctx.createRadialGradient(
      w * 0.7,
      w * 0.6,
      0,
      w * 0.7,
      w * 0.6,
      w * 0.4
    );
    g2.addColorStop(0, "#ffcc00");
    g2.addColorStop(0.5, "#883300");
    g2.addColorStop(1, "transparent");
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, w);
  }

  const v = ctx.createRadialGradient(
    w / 2,
    w / 2,
    w * 0.2,
    w / 2,
    w / 2,
    w * 0.7
  );
  v.addColorStop(0, "transparent");
  v.addColorStop(1, "rgba(0,0,0,0.6)");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, w, w);
}

const obs = new MutationObserver(
  () => mainPage.classList.contains("visible") && drawCanvas(1)
);
if (mainPage)
  obs.observe(mainPage, { attributes: true, attributeFilter: ["class"] });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".style-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".style-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      drawCanvas(parseInt(btn.dataset.style));
    });
  });
});
