const albums = document.querySelectorAll('.album');
let scrollY = 0;
let currentY = 0;

function animate() {
  currentY += (scrollY - currentY) * 0.08;

  albums.forEach((album, i) => {
    const z = -i * 1000 + currentY;
    const x = i % 2 === 0 ? -450 : 450;
    album.style.transform = `translate3d(${x}px, 0, ${z}px)`;
    album.style.opacity = z > 200 || z < -3000 ? 0 : 1;
  });
  requestAnimationFrame(animate);
}
window.addEventListener('wheel', (e) => {
  scrollY += e.deltaY * 2;
  scrollY = Math.max(0, Math.min(scrollY, (albums.length - 1) * 1000));
});

animate();