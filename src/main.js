import * as THREE from "three";

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 4);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const pointLight = new THREE.PointLight("rgba(255, 255, 255, 1)");
  pointLight.position.set(0, 1, 2);
  scene.add(pointLight);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 256, 256),
    new THREE.MeshPhongMaterial({ color: "rgba(192, 252, 197, 1)" })
  );

  scene.add(cube);

  renderer.setAnimationLoop(animate);

  function animate() {
    renderer.render(scene, camera);
  }
}

init();
