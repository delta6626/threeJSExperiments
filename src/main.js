import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Tween, Easing, Group } from "@tweenjs/tween.js";

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 4);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const pointLight = new THREE.PointLight(0xffffff, 2);
  pointLight.position.set(0, 1, 2);
  scene.add(pointLight);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: 0xc0fcc5 })
  );
  scene.add(cube);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshPhongMaterial({ color: 0xfff4d1, side: THREE.DoubleSide })
  );
  plane.position.set(0, -1, 0);
  plane.rotateX(degToRad(90));
  scene.add(plane);

  const gui = new dat.GUI();
  gui.add(pointLight, "intensity", 0, 5);
  gui.add(pointLight.position, "y", -10, 10);
  gui.add(pointLight.position, "x", -10, 10);
  gui.add(pointLight.position, "z", -10, 10);
  gui.add(cube.position, "y", -10, 10).name("Cube y");
  gui.add(cube.position, "x", -10, 10).name("Cube x");
  gui.add(cube.position, "z", -10, 10).name("Cube z");

  const tweenGroup = new Group();
  const tweenRight = new Tween(cube.position, tweenGroup)
    .to({ x: 2, z: -2, y: 2 }, 2000)
    .easing(Easing.Quadratic.Out);
  const tweenLeft = new Tween(cube.position, tweenGroup)
    .to({ x: 0, z: 0, y: 0 }, 2000)
    .easing(Easing.Quadratic.InOut);
  tweenRight.chain(tweenLeft);
  tweenLeft.chain(tweenRight);
  tweenRight.start();

  renderer.setAnimationLoop(animate);

  function animate(time) {
    controls.update();
    tweenGroup.update(time);
    renderer.render(scene, camera);
  }
}

init();
