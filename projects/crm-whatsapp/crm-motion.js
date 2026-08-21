// CACIQUE CRM WHATSAPP — fondo de red de nodos (Three.js) + scroll reveals (GSAP)

function initBackground3D() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || !window.THREE) return;

  const THREE = window.THREE;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 16;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Nodos + líneas — metáfora de "conversaciones conectadas / red de mensajes"
  const COUNT = 60;
  const nodePositions = [];
  for (let i = 0; i < COUNT; i++) {
    nodePositions.push(new THREE.Vector3(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10
    ));
  }

  const pointsGeo = new THREE.BufferGeometry().setFromPoints(nodePositions);
  const pointsMat = new THREE.PointsMaterial({ color: 0x25d366, size: 0.08, transparent: true, opacity: 0.5 });
  const points = new THREE.Points(pointsGeo, pointsMat);
  scene.add(points);

  // Conecta nodos cercanos con líneas finas
  const linePositions = [];
  for (let i = 0; i < COUNT; i++) {
    for (let j = i + 1; j < COUNT; j++) {
      if (nodePositions[i].distanceTo(nodePositions[j]) < 6) {
        linePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
        linePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
      }
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.35 });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  let mouseX = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  });

  const clock = new THREE.Clock();
  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.02;
    lines.rotation.y = t * 0.02;
    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.015;
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

function initScrollReveals() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const groups = document.querySelectorAll('main .grid');
  groups.forEach((grid) => {
    const items = grid.children;
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: 26 });
    ScrollTrigger.batch(items, {
      start: 'top 90%',
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08, overwrite: true }),
      once: true,
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initBackground3D();
  initScrollReveals();
});
