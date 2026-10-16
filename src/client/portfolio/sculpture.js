import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// A closed, flattened ribbon: a real mesh visitors can turn in three dimensions.
class RibbonCurve extends THREE.Curve {
  constructor(shape) {
    super();
    this.shape = shape;
  }
  getPoint(t, target = new THREE.Vector3()) {
    const a = t * Math.PI * 2;
    if (this.shape === "Orbit") {
      return target.set(
        2 * Math.cos(a),
        1.45 * Math.sin(a),
        0.6 * Math.sin(2 * a),
      );
    }
    if (this.shape === "Wave") {
      return target.set(
        1.8 * Math.cos(a),
        1.55 * Math.sin(a),
        0.8 * Math.sin(3 * a),
      );
    }
    const r = 1.3 + 0.48 * Math.cos(3 * a);
    return target.set(
      r * Math.cos(2 * a),
      r * Math.sin(2 * a),
      0.85 * Math.sin(3 * a),
    );
  }
}
function ribbonGeometry(shape) {
  const curve = new RibbonCurve(shape),
    segments = 240,
    sides = 12;
  const frames = curve.computeFrenetFrames(segments, true);
  const positions = [],
    indices = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments,
      center = curve.getPoint(t);
    const twist = t * Math.PI * (shape === "Knot" ? 4 : 2);
    const normal = frames.normals[i]
      .clone()
      .applyAxisAngle(frames.tangents[i], twist);
    const binormal = frames.binormals[i]
      .clone()
      .applyAxisAngle(frames.tangents[i], twist);
    for (let j = 0; j <= sides; j++) {
      const angle = (j / sides) * Math.PI * 2;
      const p = center
        .clone()
        .addScaledVector(normal, Math.cos(angle) * 0.48)
        .addScaledVector(binormal, Math.sin(angle) * 0.075);
      positions.push(p.x, p.y, p.z);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  // Group the two finishes into two draw calls, rather than one per face.
  for (let material = 0; material < 2; material++) {
    const start = indices.length;
    for (let i = 0; i < segments; i++) {
      for (
        let j = (material * sides) / 2;
        j < ((material + 1) * sides) / 2;
        j++
      ) {
        const a = i * (sides + 1) + j,
          b = a + sides + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    geometry.addGroup(start, indices.length - start, material);
  }
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function createSculpture(host, { paused, onFailure }) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.setClearColor(0x171715, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 9);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const materials = [
    new THREE.MeshStandardMaterial({
      color: 0xf14d0e,
      metalness: 0.94,
      roughness: 0.24,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x1c201e,
      metalness: 1,
      roughness: 0.2,
      side: THREE.DoubleSide,
    }),
  ];
  const mesh = new THREE.Mesh(ribbonGeometry("Knot"), materials);
  mesh.rotation.set(0.28, -0.35, -0.35);
  scene.add(mesh);
  const light = new THREE.DirectionalLight(0xffe1ca, 2.8);
  light.position.set(2, 5, 4);
  scene.add(light);
  const rim = new THREE.DirectionalLight(0xffffff, 3);
  rim.position.set(-4, 1, -2);
  scene.add(rim);
  let frame = 0,
    disposed = false,
    visible = true,
    isPaused = paused,
    dragging = false,
    last = 0;
  const target = { x: 0.28, y: -0.35 };
  function render(time = 0) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    // A deliberate 30fps cap keeps the decorative scene light on laptops.
    if (time - last < 1000 / 30 && last > 0) {
      wake();
      return;
    }
    const delta = Math.min((time - last) / 1000, 0.05);
    last = time;
    if (!isPaused && !dragging) target.y += delta * 0.16;
    mesh.rotation.x += (target.x - mesh.rotation.x) * 0.12;
    mesh.rotation.y += (target.y - mesh.rotation.y) * 0.12;
    renderer.render(scene, camera);
    if (
      (!isPaused && !dragging) ||
      Math.abs(target.y - mesh.rotation.y) +
        Math.abs(target.x - mesh.rotation.x) >
        0.001
    )
      wake();
  }
  function wake() {
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(render);
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 0.85 ? 10.8 : 8.8;
    camera.updateProjectionMatrix();
    wake();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      last = performance.now();
      wake();
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  visibilityObserver.observe(host);
  const visibilityChange = () => {
    last = performance.now();
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else wake();
  };
  const lost = (event) => {
    event.preventDefault();
    onFailure();
  };
  document.addEventListener("visibilitychange", visibilityChange);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  resize();
  return {
    pause(value) {
      isPaused = value;
      wake();
    },
    drag(value) {
      dragging = value;
      wake();
    },
    rotate(dx, dy) {
      target.y += dx;
      target.x = THREE.MathUtils.clamp(target.x + dy, -1.5, 1.5);
      wake();
    },
    reset() {
      target.x = 0.28;
      target.y = -0.35;
      wake();
    },
    shape(value) {
      const old = mesh.geometry;
      mesh.geometry = ribbonGeometry(value);
      old.dispose();
      wake();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", visibilityChange);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      mesh.geometry.dispose();
      materials.forEach((m) => m.dispose());
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
