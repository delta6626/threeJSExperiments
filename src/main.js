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

  const cube = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: "rgb(100,0,0)" });
  const cubeMesh = new THREE.Mesh(cube, cubeMaterial);

  scene.add(cubeMesh);

  renderer.setAnimationLoop(animate);

  function animate() {
    renderer.render(scene, camera);
  }
}

init();
