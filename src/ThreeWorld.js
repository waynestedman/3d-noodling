// three js world
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const worldroot = document.querySelector('#threeroot');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
worldroot.appendChild(renderer.domElement);

// lighting
const color = 0xFFFFFF;
const intensity = 1;
const ambLight = new THREE.AmbientLight(color, intensity);
const directLight = new THREE.DirectionalLight(color, intensity);
directLight.position.set(5, 10, 7.5);
directLight.castShadow = true;
directLight.intensity = 2;
scene.add(directLight);

// geometry & materials
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(boxGeometry, material);
scene.add(cube);

camera.position.z = 5;
camera.position.y = -5;

// controls
const controls = new OrbitControls(camera, worldroot);
controls.target.set(0, 0, 0);
controls.update();

// animation loop
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}