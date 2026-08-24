// CODENOVA ACADEMY — motion: fondo 3D del hero (Three.js) + scroll reveals (GSAP)

function initHero3D() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || !window.THREE) return;

  const THREE = window.THREE;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 14;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Campo de puntos tipo "constelación de código"
  const COUNT = 320;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.05, transparent: true, opacity: 0.7 });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Torus wireframe girando — referencia abstracta a "red/conexión"
  const torusGeo = new THREE.TorusKnotGeometry(3, 0.6, 100, 12);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0x00f0a0, wireframe: true, transparent: true, opacity: 0.18 });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(5, -1, -4);
  scene.add(torus);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const clock = new THREE.Clock();
  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.025;
    torus.rotation.x = t * 0.12;
    torus.rotation.y = t * 0.09;
    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 1.0 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
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

// Nota: el resto del sitio ya anima con IntersectionObserver + .fade-in-up (ver script inline
// al final del body) — no se duplica con GSAP aquí para evitar que compitan dos sistemas de
// motion sobre los mismos elementos. GSAP queda disponible para el reveal del hero (torus/puntos).
document.addEventListener('DOMContentLoaded', () => {
  initHero3D();
});
