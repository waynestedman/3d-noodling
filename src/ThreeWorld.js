// three js world
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const worldroot = document.querySelector('#threeroot');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(worldroot.innerWidth, worldroot.innerHeight);
renderer.setAnimationLoop(animate);
worldroot.appendChild(renderer.domElement);

// lighting
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

// geometry & materials
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(boxGeometry, material);
scene.add(cube);

camera.position.z = 5;

// controls
// const controls = new OrbitControls(camera, canvas);
// controls.target.set(0, 5, 0);
// controls.update();

// animation loop
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}