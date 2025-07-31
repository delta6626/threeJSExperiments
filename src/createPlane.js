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
  camera.position.z = 2;

  const plane = createPlane(10, 30, 0xffffff);
  plane.rotateX(90);
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

function createPlane(width, height, color) {
  const plane = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
  });

  const planeMesh = new THREE.Mesh(plane, material);
  return planeMesh;
}
