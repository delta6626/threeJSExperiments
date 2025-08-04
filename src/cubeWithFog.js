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

  scene.fog = new THREE.FogExp2("rgb(250,200,150)", 0.2);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshStandardMaterial({ color: 0x888888 })
  );

  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  scene.add(ground);

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
