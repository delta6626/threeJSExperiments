import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

let factor = 0;

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 1;
  camera.rotateX(degToRad(-10));

  const cuboidParent = createCube(1, 1, 2, 0xffffff, 0, 0, 0);
  scene.add(cuboidParent);

  const cube = createCube(1, 1, 1, 0xf77d7dff, 0, 1, 0);
  cuboidParent.add(cube);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setAnimationLoop(() => {
    update(renderer, scene, camera);
  });

  function update(renderer, scene, camera) {
    cuboidParent.rotation.z = Math.PI * factor;
    factor += 0.01;
    if (factor == 2) {
      factor = 0;
    }
    renderer.render(scene, camera);
  }
}

function createCube(w, h, d, c, x, y, z) {
  const cube = new THREE.BoxGeometry(w, h, d);
  const material = new THREE.MeshBasicMaterial({ color: c });
  const cubeMesh = new THREE.Mesh(cube, material);

  cubeMesh.position.set(x, y, z);

  return cubeMesh;
}

init();
