import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = 2;
const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = -2;

//scene.add(cubeMesh);
const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

scene.add(group);

/*cubeMesh.position.y = 1;
cubeMesh.position.x = 1;

// Para cambiar la escala de las figuras

cubeMesh.scale.set(2, 2, 2);

*/
cubeMesh.rotation.reorder('YXZ');

cubeMesh.rotation.y = THREE.MathUtils.degToRad(45);
cubeMesh.rotation.y = THREE.MathUtils.degToRad(45);

const tempVector = new THREE.Vector3(0,0,0);
cubeMesh.position.copy(tempVector);

// Calcular distancia entre vectores

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})

// render the scene
const renderloop = () => {
  controls.update();  
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
console.log(cubeMesh.position.distanceTo(camera.position));