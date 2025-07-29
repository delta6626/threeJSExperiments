import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 5, 5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Loader

var football;

const loader = new OBJLoader();
loader.load("/ball.obj", (object) => {
  football = object;
  scene.add(football);
  football.position.set(0, 0, 0);

  football.scale.set(1, 1, 1);
});

camera.position.z = 5;

function animate() {
  if (football) {
    football.rotateX(0.01);
    football.rotateY(0.1);
    football.rotateZ(0.05);
  }
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
