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
    const g = ctx.createRadialGradient(w / 2, w * 0.85, 0, w / 2, w * 0.6, w);
    g.addColorStop(0, "#ffcc00");
    g.addColorStop(0.2, "#ff6600");
    g.addColorStop(0.5, "#cc2200");
    g.addColorStop(0.8, "#440000");
    g.addColorStop(1, "#0a0000");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, w);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI;
      ctx.beginPath();
      ctx.moveTo(w / 2, w * 0.85);
      ctx.lineTo(
        w / 2 + Math.cos(angle - Math.PI / 2) * w,
        w * 0.85 - Math.sin(angle - Math.PI / 2) * w
      );
      ctx.lineTo(
        w / 2 + Math.cos(angle - Math.PI / 2 + 0.08) * w,
        w * 0.85 - Math.sin(angle - Math.PI / 2 + 0.08) * w
      );
      ctx.closePath();
      const rayGrad = ctx.createLinearGradient(w / 2, w * 0.85, w / 2, 0);
      rayGrad.addColorStop(0, "rgba(255,150,50,0.4)");
      rayGrad.addColorStop(1, "transparent");
      ctx.fillStyle = rayGrad;
      ctx.fill();
    }
    ctx.restore();
  } else if (style === 2) {
    ctx.fillStyle = "#080005";
    ctx.fillRect(0, 0, w, w);

    for (let i = 0; i < 5; i++) {
      const fogGrad = ctx.createRadialGradient(
        w * (0.2 + Math.random() * 0.6),
        w * (0.3 + Math.random() * 0.5),
        0,
        w / 2,
        w / 2,
        w * 0.5
      );
      fogGrad.addColorStop(0, `rgba(${80 + i * 20}, 0, ${10 + i * 5}, 0.4)`);
      fogGrad.addColorStop(1, "transparent");
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, w, w);
    }

    const moonGrad = ctx.createRadialGradient(
      w * 0.5,
      w * 0.35,
      0,
      w * 0.5,
      w * 0.35,
      w * 0.2
    );
    moonGrad.addColorStop(0, "#cc2200");
    moonGrad.addColorStop(0.5, "#880000");
    moonGrad.addColorStop(0.8, "#330000");
    moonGrad.addColorStop(1, "transparent");
    ctx.fillStyle = moonGrad;
    ctx.fillRect(0, 0, w, w);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 5; i++) {
      const x = w * 0.2 + (i / 4) * w * 0.6;
      const beamGrad = ctx.createLinearGradient(x, 0, x, w);
      beamGrad.addColorStop(0, "rgba(255,50,30,0.15)");
      beamGrad.addColorStop(0.5, "rgba(200,30,10,0.05)");
      beamGrad.addColorStop(1, "transparent");
      ctx.fillStyle = beamGrad;
      ctx.fillRect(x - 15, 0, 30, w);
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2, w * 0.15);
    ctx.lineTo(w / 2, w * 0.7);
    ctx.moveTo(w * 0.35, w * 0.5);
    ctx.lineTo(w * 0.65, w * 0.5);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    for (let i = 0; i < 20; i++) {
      const sx = w * 0.2 + Math.random() * w * 0.6;
      const sy = w * 0.5 + Math.random() * w * 0.5;
      const smokeGrad = ctx.createRadialGradient(
        sx,
        sy,
        0,
        sx,
        sy,
        30 + Math.random() * 40
      );
      smokeGrad.addColorStop(0, `rgba(50,0,0,${0.2 + Math.random() * 0.2})`);
      smokeGrad.addColorStop(1, "transparent");
      ctx.fillStyle = smokeGrad;
      ctx.fillRect(0, 0, w, w);
    }
    ctx.restore();
  } else if (style === 3) {
    ctx.fillStyle = "#050000";
    ctx.fillRect(0, 0, w, w);

    const halo = ctx.createRadialGradient(
      w / 2,
      w / 2,
      w * 0.15,
      w / 2,
      w / 2,
      w * 0.5
    );
    halo.addColorStop(0, "transparent");
    halo.addColorStop(0.3, "#880000");
    halo.addColorStop(0.5, "#ff2200");
    halo.addColorStop(0.7, "#881100");
    halo.addColorStop(1, "transparent");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, w, w);

    ctx.beginPath();
    ctx.arc(w / 2, w / 2, w * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2;
      const len = w * 0.08 + Math.random() * w * 0.15;
      ctx.beginPath();
      ctx.moveTo(
        w / 2 + Math.cos(angle) * w * 0.18,
        w / 2 + Math.sin(angle) * w * 0.18
      );
      ctx.lineTo(
        w / 2 + Math.cos(angle) * (w * 0.18 + len),
        w / 2 + Math.sin(angle) * (w * 0.18 + len)
      );
      ctx.strokeStyle = `rgba(255,${50 + Math.random() * 100},0,${0.3 + Math.random() * 0.4})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.stroke();
    }
    ctx.restore();
  } else {
    const fogGrad = ctx.createLinearGradient(0, 0, w, w);
    fogGrad.addColorStop(0, "#1a0505");
    fogGrad.addColorStop(0.5, "#2a0a0a");
    fogGrad.addColorStop(1, "#0a0000");
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, 0, w, w);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 6; i++) {
      const cx = Math.random() * w;
      const cy = Math.random() * w;
      const radius = w * 0.2 + Math.random() * w * 0.3;
      const smokeGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      smokeGrad.addColorStop(
        0,
        `rgba(${100 + Math.random() * 80},${20 + Math.random() * 30},${Math.random() * 20},0.4)`
      );
      smokeGrad.addColorStop(0.5, `rgba(80,10,5,0.2)`);
      smokeGrad.addColorStop(1, "transparent");
      ctx.fillStyle = smokeGrad;
      ctx.fillRect(0, 0, w, w);
    }
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = "#ff3300";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#ff0000";
    ctx.shadowBlur = 20;
    for (let l = 0; l < 3; l++) {
      ctx.beginPath();
      let x = Math.random() * w;
      let y = 0;
      ctx.moveTo(x, y);
      while (y < w) {
        x += (Math.random() - 0.5) * 50;
        y += 20 + Math.random() * 40;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();

    const centerGlow = ctx.createRadialGradient(
      w / 2,
      w / 2,
      0,
      w / 2,
      w / 2,
      w * 0.4
    );
    centerGlow.addColorStop(0, "rgba(255,50,0,0.3)");
    centerGlow.addColorStop(0.5, "rgba(150,20,0,0.15)");
    centerGlow.addColorStop(1, "transparent");
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, w, w);
  }

  const v = ctx.createRadialGradient(
    w / 2,
    w / 2,
    w * 0.15,
    w / 2,
    w / 2,
    w * 0.75
  );
  v.addColorStop(0, "transparent");
  v.addColorStop(0.7, "rgba(0,0,0,0.3)");
  v.addColorStop(1, "rgba(0,0,0,0.7)");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, w, w);

  ctx.save();
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 2000; i++) {
    const gx = Math.random() * w;
    const gy = Math.random() * w;
    ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
    ctx.fillRect(gx, gy, 1, 1);
  }
  ctx.restore();
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
