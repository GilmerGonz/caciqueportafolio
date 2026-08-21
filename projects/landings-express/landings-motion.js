// LANDINGS EXPRESS — grilla wireframe minimalista (Three.js, estética suiza) + scroll reveals (GSAP)

function initBackground3D() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || !window.THREE) return;

  const THREE = window.THREE;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 3, 14);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Plano wireframe tipo "grilla suiza" — geometría, sin adornos, coherente con la marca
  const gridGeo = new THREE.PlaneGeometry(40, 40, 20, 20);
  const gridMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a, wireframe: true, transparent: true, opacity: 0.05 });
  const grid = new THREE.Mesh(gridGeo, gridMat);
  grid.rotation.x = -Math.PI / 2.3;
  grid.position.y = -3;
  scene.add(grid);

  let mouseX = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  });

  const clock = new THREE.Clock();
  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    grid.position.z = (t * 1.2) % 2;
    camera.position.x += (mouseX * 1.0 - camera.position.x) * 0.02;
    camera.lookAt(0, -3, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else animate();
  });
}

function initScrollReveals() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const groups = document.querySelectorAll('main .grid');
  groups.forEach((grid) => {
    const items = grid.children;
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: 24 });
    ScrollTrigger.batch(items, {
      start: 'top 90%',
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08, overwrite: true }),
      once: true,
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initBackground3D();
  initScrollReveals();
});
