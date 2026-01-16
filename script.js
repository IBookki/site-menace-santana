const albums = document.querySelectorAll(".album");
const mainPage = document.getElementById("main-page");
const scene = document.getElementById("scene");
const hero = document.querySelector(".hero");
let scrollY = 0,
  currentY = 0;
const heroHeight = window.innerHeight;
const maxScroll = albums.length * 1000;
let currentColor = "red";
let currentStyle = 1;
let pageScroll = 0;

function animate() {
  pageScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (pageScroll >= heroHeight * 0.8) {
    hero.classList.add("scrolled");
  } else {
    hero.classList.remove("scrolled");
  }
  
  if (pageScroll >= heroHeight) {
    const albumScroll = pageScroll - heroHeight;
    scrollY = Math.min(albumScroll * 2, maxScroll);
  } else {
    scrollY = 0;
  }
  
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

window.addEventListener("scroll", () => {
});

animate();

function drawCanvas(style, color = currentColor) {
  const canvas = document.getElementById("redCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = (canvas.width = canvas.height = 350);

  let colorScheme = {};
  if (color === "red") {
    colorScheme = {
      primary: "#ff0000",
      secondary: "#cc2200",
      tertiary: "#880000",
      dark: "#440000",
      light: "#ff3300",
      glow: "rgba(255,0,0,",
      gradient1: "#ffcc00",
      gradient2: "#ff6600",
      gradient3: "#cc2200",
      gradient4: "#440000",
    };
  } else if (color === "orange") {
    colorScheme = {
      primary: "#ff6600",
      secondary: "#ff8800",
      tertiary: "#cc4400",
      dark: "#663300",
      light: "#ff8833",
      glow: "rgba(255,102,0,",
      gradient1: "#ffaa00",
      gradient2: "#ff7700",
      gradient3: "#ff4400",
      gradient4: "#662200",
    };
  } else if (color === "white") {
    colorScheme = {
      primary: "#ffffff",
      secondary: "#cccccc",
      tertiary: "#999999",
      dark: "#333333",
      light: "#ffffff",
      glow: "rgba(255,255,255,",
      gradient1: "#ffffff",
      gradient2: "#cccccc",
      gradient3: "#999999",
      gradient4: "#666666",
    };
  }

  ctx.fillStyle = "#0a0500";
  ctx.fillRect(0, 0, w, w);

  if (style === 1) {
    ctx.fillStyle = "#020002";
    ctx.fillRect(0, 0, w, w);

    ctx.save();
    ctx.translate(w / 2, w / 2);
    for (let i = 15; i > 0; i--) {
      const size = (i / 15) * w * 0.6;
      const rotation = i * 0.08;
      ctx.save();
      ctx.rotate(rotation);
      ctx.strokeStyle = colorScheme.glow + (0.15 + (15 - i) * 0.04) + ")";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    }
    ctx.restore();

    const centerGlow = ctx.createRadialGradient(
      w / 2,
      w / 2,
      0,
      w / 2,
      w / 2,
      w * 0.2
    );
    centerGlow.addColorStop(0, colorScheme.light);
    centerGlow.addColorStop(0.3, colorScheme.primary);
    centerGlow.addColorStop(0.6, colorScheme.dark);
    centerGlow.addColorStop(1, "transparent");
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, w, w);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(
        w / 2 + Math.cos(angle) * w * 0.5,
        w / 2 + Math.sin(angle) * w * 0.5
      );
      ctx.lineTo(w / 2, w / 2);
      const lineGrad = ctx.createLinearGradient(
        w / 2 + Math.cos(angle) * w * 0.5,
        w / 2 + Math.sin(angle) * w * 0.5,
        w / 2,
        w / 2
      );
      lineGrad.addColorStop(0, "transparent");
      lineGrad.addColorStop(0.7, colorScheme.glow + "0.3)");
      lineGrad.addColorStop(1, colorScheme.glow + "0.6)");
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * w * 0.4;
      const px = w / 2 + Math.cos(angle) * dist;
      const py = w / 2 + Math.sin(angle) * dist;
      ctx.beginPath();
      ctx.arc(px, py, 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fillStyle = colorScheme.glow + (0.3 + Math.random() * 0.5) + ")";
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
      if (color === "white") {
        fogGrad.addColorStop(
          0,
          `rgba(${150 + i * 20}, ${150 + i * 20}, ${150 + i * 20}, 0.4)`
        );
      } else if (color === "orange") {
        fogGrad.addColorStop(
          0,
          `rgba(${150 + i * 30}, ${80 + i * 15}, ${10 + i * 5}, 0.4)`
        );
      } else {
        fogGrad.addColorStop(0, `rgba(${80 + i * 20}, 0, ${10 + i * 5}, 0.4)`);
      }
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
    moonGrad.addColorStop(0, colorScheme.secondary);
    moonGrad.addColorStop(0.5, colorScheme.tertiary);
    moonGrad.addColorStop(0.8, "#330000");
    moonGrad.addColorStop(1, "transparent");
    ctx.fillStyle = moonGrad;
    ctx.fillRect(0, 0, w, w);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 5; i++) {
      const x = w * 0.2 + (i / 4) * w * 0.6;
      const beamGrad = ctx.createLinearGradient(x, 0, x, w);
      if (color === "white") {
        beamGrad.addColorStop(0, "rgba(255,255,255,0.15)");
        beamGrad.addColorStop(0.5, "rgba(200,200,200,0.05)");
      } else if (color === "orange") {
        beamGrad.addColorStop(0, "rgba(255,102,30,0.15)");
        beamGrad.addColorStop(0.5, "rgba(200,80,10,0.05)");
      } else {
        beamGrad.addColorStop(0, "rgba(255,50,30,0.15)");
        beamGrad.addColorStop(0.5, "rgba(200,30,10,0.05)");
      }
      beamGrad.addColorStop(1, "transparent");
      ctx.fillStyle = beamGrad;
      ctx.fillRect(x - 15, 0, 30, w);
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = colorScheme.primary;
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
      if (color === "white") {
        smokeGrad.addColorStop(
          0,
          `rgba(200,200,200,${0.2 + Math.random() * 0.2})`
        );
      } else if (color === "orange") {
        smokeGrad.addColorStop(
          0,
          `rgba(100,50,0,${0.2 + Math.random() * 0.2})`
        );
      } else {
        smokeGrad.addColorStop(0, `rgba(50,0,0,${0.2 + Math.random() * 0.2})`);
      }
      smokeGrad.addColorStop(1, "transparent");
      ctx.fillStyle = smokeGrad;
      ctx.fillRect(0, 0, w, w);
    }
    ctx.restore();
  } else if (style === 3) {
    ctx.fillStyle = "#020005";
    ctx.fillRect(0, 0, w, w);
    
    ctx.save();
    ctx.translate(w / 2, w / 2);
    ctx.globalCompositeOperation = "lighter";
    
    for (let s = 0; s < 3; s++) {
      ctx.beginPath();
      for (let i = 0; i < 720; i++) {
        const angle = (i / 180) * Math.PI + (s * Math.PI * 2 / 3);
        const radius = (i / 720) * w * 0.48;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = colorScheme.glow + "0.4)";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.restore();
    
    const centerGlow = ctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w * 0.25);
    centerGlow.addColorStop(0, colorScheme.light);
    centerGlow.addColorStop(0.3, colorScheme.primary);
    centerGlow.addColorStop(0.6, colorScheme.dark);
    centerGlow.addColorStop(1, "transparent");
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, w, w);
    
    ctx.save();
    ctx.globalAlpha = 0.3;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(w / 2, w / 2, (i / 5) * w * 0.45, 0, Math.PI * 2);
      ctx.strokeStyle = colorScheme.primary;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
    
    ctx.save();
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = w * 0.1 + Math.random() * w * 0.35;
      const px = w / 2 + Math.cos(angle) * dist;
      const py = w / 2 + Math.sin(angle) * dist;
      const size = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = colorScheme.glow + (0.3 + Math.random() * 0.5) + ")";
      ctx.fill();
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
      if (color === "white") {
        smokeGrad.addColorStop(
          0,
          `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},${200 + Math.random() * 55},0.4)`
        );
        smokeGrad.addColorStop(0.5, `rgba(150,150,150,0.2)`);
      } else if (color === "orange") {
        smokeGrad.addColorStop(
          0,
          `rgba(${200 + Math.random() * 55},${100 + Math.random() * 30},${Math.random() * 20},0.4)`
        );
        smokeGrad.addColorStop(0.5, `rgba(150,60,5,0.2)`);
      } else {
        smokeGrad.addColorStop(
          0,
          `rgba(${100 + Math.random() * 80},${20 + Math.random() * 30},${Math.random() * 20},0.4)`
        );
        smokeGrad.addColorStop(0.5, `rgba(80,10,5,0.2)`);
      }
      smokeGrad.addColorStop(1, "transparent");
      ctx.fillStyle = smokeGrad;
      ctx.fillRect(0, 0, w, w);
    }
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = colorScheme.light;
    ctx.lineWidth = 2;
    ctx.shadowColor = colorScheme.primary;
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
    if (color === "white") {
      centerGlow.addColorStop(0, "rgba(255,255,255,0.3)");
      centerGlow.addColorStop(0.5, "rgba(200,200,200,0.15)");
    } else if (color === "orange") {
      centerGlow.addColorStop(0, "rgba(255,102,0,0.3)");
      centerGlow.addColorStop(0.5, "rgba(200,60,0,0.15)");
    } else {
      centerGlow.addColorStop(0, "rgba(255,50,0,0.3)");
      centerGlow.addColorStop(0.5, "rgba(150,20,0,0.15)");
    }
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
  () =>
    mainPage.classList.contains("visible") &&
    drawCanvas(currentStyle, currentColor)
);
if (mainPage)
  obs.observe(mainPage, { attributes: true, attributeFilter: ["class"] });

function updateCanvasBorder(color) {
  const canvas = document.getElementById("redCanvas");
  if (!canvas) return;

  if (color === "red") {
    canvas.style.borderColor = "#8b0000";
    canvas.style.boxShadow = "0 0 25px rgba(139, 0, 0, 0.5)";
  } else if (color === "orange") {
    canvas.style.borderColor = "#cc6600";
    canvas.style.boxShadow = "0 0 25px rgba(204, 102, 0, 0.5)";
  } else if (color === "white") {
    canvas.style.borderColor = "#666666";
    canvas.style.boxShadow = "0 0 25px rgba(255, 255, 255, 0.3)";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".style-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".style-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentStyle = parseInt(btn.dataset.style);
      drawCanvas(currentStyle, currentColor);
    });
  });

  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".color-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentColor = btn.dataset.color;
      updateCanvasBorder(currentColor);
      drawCanvas(currentStyle, currentColor);
    });
  });

  updateCanvasBorder(currentColor);
});
