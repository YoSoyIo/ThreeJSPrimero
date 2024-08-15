import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});

const cubeMesh =  new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
);

scene.add(cubeMesh);

const camera =  new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30);

/*const aspectRatio = window.innerWidth/window.innerHeight;

const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  200
);*/

// Posicion de la camara
camera.position.z = 5;

scene.add(camera);

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = false;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();