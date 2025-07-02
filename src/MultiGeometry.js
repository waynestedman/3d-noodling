// Dodecahedron Geometry

import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// camera & scene setup
const threeCanvas = document.getElementById('threeroot');
const width = 1024; // window.innerWidth;
const height = 768; // window.innerHeight;
const gui = new GUI();

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.set(0, 0, 30);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);

// lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.6); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 50);
scene.add(directionalLight);

// geometry & mesh
const radius = 7;
const octaGeometry = new THREE.OctahedronGeometry(radius); 
const octaMaterial = new THREE.MeshBasicMaterial({color: 0x5c735c});

const octaHedron1 = new THREE.Mesh(octaGeometry, octaMaterial);
octaHedron1.position.set(10, 10, 0);

// const octaHedron2 = new THREE.Mesh(octaGeometry, octaMaterial);
// octaHedron2.position.set(-10, -10, 0);

// const octaGroup = new THREE.Group();
// octaGroup.add(octaHedron1);
// octaGroup.add(octaHedron2);

// scene.add(octaGroup);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({color: 0x5c735c});

const cubeA = new THREE.Mesh(geometry, material);
cubeA.position.set(10, 10, 0);
scene.add(cubeA);

const cubeB = new THREE.Mesh(geometry, material);
cubeB.position.set(-10, -10, 0);
scene.add(cubeB);

const group = new THREE.Group();
// group.add(cubeA);
// group.add(cubeB);

// scene.add(group);
// GUI
/* const obj = {
	radius: 1,
	detail: 0,
	materialType: 'Normal'
}
gui.add(obj, 'radius', 0, 20).onChange(updateGeometry);
gui.add(obj, 'detail', 0, 5).step(1).onChange(updateGeometry);
gui.add(obj, 'materialType', ['Basic', 'Normal', 'Lambert']).onChange(updateMaterial);
*/

// renderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
threeCanvas.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// animation
function animate(time) {
	// octaGroup.rotation.x = time / 2000;
	// octaGroup.rotation.y = time / 1000;
	// group.rotation.x = time/2000;
	renderer.render( scene, camera );
}