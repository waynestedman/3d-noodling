// three js world

import GUI from 'lil-gui';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const gui = new GUI();

// light intensity variable
const settings = {
  intensity: 0.2, // Default intensity multiplier
};

// Add GUI slider
gui.add(settings, 'intensity', 0, 10).step(0.2).name('Light intensity');

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
const directColor = 0x654321;

const intensity = 1;
const ambLight = new THREE.AmbientLight(color, settings.intensity);
const directLight = new THREE.DirectionalLight(directColor, intensity);
directLight.position.set(5, 10, 7.5);
directLight.castShadow = true;
directLight.intensity = 20;
scene.add(ambLight, directLight);

// geometry & materials
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 0xbbbbbb });
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