import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import * as dat from "dat.gui";

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

  const pointLight = new THREE.PointLight("rgba(255, 255, 255, 1)", 2);
  pointLight.position.set(0, 1, 2);
  scene.add(pointLight);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 256, 256),
    new THREE.MeshPhongMaterial({ color: "rgba(192, 252, 197, 1)" })
  );

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshPhongMaterial({
      color: "rgba(255, 244, 209, 1)",
      side: THREE.DoubleSide,
    })
  );
  plane.position.set(0, -1, 0);
  plane.rotateX(degToRad(90));
  scene.add(plane);

  scene.add(cube);

  const controllerGUI = new dat.GUI();
  controllerGUI.add(pointLight, "intensity", 0, 5);
  controllerGUI.add(pointLight.position, "y", -10, 10);
  controllerGUI.add(pointLight.position, "x", -10, 10);
  controllerGUI.add(pointLight.position, "z", -10, 10);

  controllerGUI.add(cube.position, "y", -10, 10).name("Cube y");
  controllerGUI.add(cube.position, "x", -10, 10).name("Cube x");
  controllerGUI.add(cube.position, "z", -10, 10).name("Cube z");

  renderer.setAnimationLoop(animate);

  function animate() {
    renderer.render(scene, camera);
  }
}

init();
