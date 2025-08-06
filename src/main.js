import * as three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new three.WebGLRenderer();
const controller = new OrbitControls(camera, renderer.domElement);

function init() {
  camera.position.set(0, 1, 5);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setAnimationLoop(animate);

  let cubeGrid = createCubeGrid(1, 12, 2, 4);
  cubeGrid.position.set(0, 0, 0);
  scene.add(cubeGrid);
}

function createCube(sideLength, posX, posY, posZ) {
  const cube = new three.Mesh(
    new three.BoxGeometry(sideLength, sideLength, sideLength, 256, 256),
    new three.MeshBasicMaterial({ color: "rgba(247, 255, 255, 1)" })
  );

  if (posX == null) {
    posX = 0;
  }
  if (posY == null) {
    posY = 0;
  }
  if (posZ == null) {
    posZ = 0;
  }

  cube.position.set(posX, posY, posZ);
  return cube;
}

function createCubeGrid(sizeLength, amount, distance, maxItems) {
  const cubeGroup = new three.Group();
  let currentRow = 0;
  let column = 0;
  for (let i = 0; i < amount; i++) {
    if (i != 0 && i % maxItems == 0) {
      currentRow++;
      column = 0;
    }
    const cube = createCube(
      sizeLength,
      distance * column,
      0,
      currentRow * distance
    );
    cubeGroup.add(cube);
    column++;
  }

  return cubeGroup;
}

function animate() {
  controller.update();
  renderer.render(scene, camera);
}

init();
