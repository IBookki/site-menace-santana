const albums = document.querySelectorAll(".album");
const mainPage = document.getElementById("main-page");
const scene = document.getElementById("scene");
let scrollY = 0;
let currentY = 0;
const maxScroll = albums.length * 1000

function animate() {
  currentY += (scrollY - currentY) * 0.08;

  albums.forEach((album, i) => {
    const z = -i * 1000 + currentY;
    const x = i % 2 === 0 ? -450 : 450;
    album.style.transform = `translate3d(${x}px, 0, ${z}px)`;
    album.style.opacity = z > 200 || z < -3000 ? 0 : 1;
  });

  if (currentY >= maxScroll - 500) {
    mainPage.classList.add("visible");
    scene.style.opacity = "0";
  } else {
    mainPage.classList.remove("visible");
    scene.style.opacity = "1";
  }

  requestAnimationFrame(animate);
}

window.addEventListener("wheel", (e) => {
  scrollY += e.deltaY * 2;
  scrollY = Math.max(0, Math.min(scrollY, maxScroll));
});

animate();
