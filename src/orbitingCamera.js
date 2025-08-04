import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

let factor = 0;
let orbitAngle = 0;

async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(1, 2, 5);
  camera.lookAt(0, 0, 0);

  const cuboidParent = createCube(1, 1, 2, 0xffffff, 0, 0, 0);
  scene.add(cuboidParent);

  const cube = createCube(1, 1, 1, 0xf77d7dff, 0, 1, 0);
  cuboidParent.add(cube);

  const skybox = await createTexturedSphere("/assets/textures/sky.webp", 1000);
  scene.add(skybox);

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

    camera.position.x = 5 * Math.cos(orbitAngle);
    camera.position.z = 5 * Math.sin(orbitAngle);

    orbitAngle += 0.01;

    camera.lookAt(0, 0, 0);
    skybox.position.copy(camera.position);

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

async function createTexturedSphere(texturePath, radius) {
  const loader = new THREE.TextureLoader();
  const texture = await loader.loadAsync(texturePath);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
  });

  const sphere = new THREE.SphereGeometry(radius, 128, 128);

  const sphereMesh = new THREE.Mesh(sphere, material);
  return sphereMesh;
}

init();
