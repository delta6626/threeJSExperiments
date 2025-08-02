import * as THREE from "three";

function init() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 1, 2);
  camera.lookAt(0, 0, 0);

  const cuboid = createCuboid(1, 1, 1, 0xffffff, 0, 0, 0);
  cuboid.position.y += cuboid.geometry.parameters.height / 2;
  scene.add(cuboid);

  const plane = createPlane(3, 3, 0xff0ff0);
  plane.rotateX(-Math.PI / 2);
  plane.rotateZ(Math.PI / 4);
  scene.add(plane);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  function animate() {
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);
}

init();

function createCuboid(w, h, d, c, x, y, z) {
  const cuboidGeometry = new THREE.BoxGeometry(w, h, d);
  const cuboidMaterial = new THREE.MeshBasicMaterial({ color: c });
  const cuboidMesh = new THREE.Mesh(cuboidGeometry, cuboidMaterial);

  cuboidMesh.position.x = x;
  cuboidMesh.position.y = y;
  cuboidMesh.position.z = z;

  return cuboidMesh;
}

function createPlane(w, h, c) {
  const planeGeometry = new THREE.PlaneGeometry(w, h);
  const planeMaterial = new THREE.MeshBasicMaterial({ color: c });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

  return planeMesh;
}
