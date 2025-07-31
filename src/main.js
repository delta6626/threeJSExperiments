import * as THREE from "three";

function init() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 0;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const cuboid = createCuboid(1, 1, 1, 0xffffff, 0, -1, -2);
  scene.add(cuboid);

  function animate() {
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);
}

init();

function createCuboid(width, height, depth, color, posx, posy, posz) {
  const cuboid = new THREE.BoxGeometry(width, height, depth);
  const cuboidMaterial = new THREE.MeshBasicMaterial({ color: color });
  const cuboidMesh = new THREE.Mesh(cuboid, cuboidMaterial);

  cuboidMesh.position.set(posx, posy, posz);

  return cuboidMesh;
}
