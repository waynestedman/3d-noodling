// example from Three.JS github

import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const threeCanvas = document.getElementById('threeroot');
const width = 1024; // window.innerWidth;
const height = 768; // window.innerHeight;

// Camera & scene setup
const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100);
camera.position.set(-0.5, 12, 1);
camera.up.set(0, 0, 1); // Z up
camera.lookAt(0, 0, 0,);

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xaaaaaa);

// lighting
// const ambientLight = new THREE.AmbientLight(0x404040, 0.6); // soft white light
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 0);
scene.add(directionalLight);

// Geometry & Materials
const geometry = new THREE.BoxGeometry(2, 2, 2);
const materialA = new THREE.MeshPhongMaterial({color: 0x5c735c});
const materialB = new THREE.MeshPhongMaterial({color: 0x83b7d0});

const cubeMeshA = new THREE.Mesh(geometry, materialA);
cubeMeshA.position.set(-2, 2, 0);
// scene.add(cubeMeshA);

const cubeMeshB = new THREE.Mesh(geometry, materialB);
cubeMeshB.position.set(2, -2, 0);
// scene.add(cubeMeshB);

const cubeGroup = new THREE.Group();
cubeGroup.add(cubeMeshA);
cubeGroup.add(cubeMeshB);
scene.add(cubeGroup);

const sphereGeometry = new THREE.SphereGeometry(0.5, 8, 8);
const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xe3ac91});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-4, 0, 0);

scene.add(sphere);

// show axes helper
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(axesHelper);

// renderer
const renderer = new THREE.WebGLRenderer({
	threeCanvas,
	alpha: true,
	premultipliedAlpha: false,
 });
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
threeCanvas.appendChild( renderer.domElement );

// controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 0, 0);
controls.update();

// animation
function animate( time ) {

	cubeMeshA.rotation.x = time / 2000;
	cubeMeshA.rotation.y = time / 1000;
	cubeMeshB.rotation.x = time / 1000;
	cubeMeshB.rotation.y = time / 3000;
	
	const orbitRadius = 6.5;
	const orbitSpeed = time/1500; 
	
	sphere.position.x = cubeGroup.position.x + Math.cos(orbitSpeed) * orbitRadius;
	sphere.position.y = cubeGroup.position.z + Math.sin(orbitSpeed) * orbitRadius;
	sphere.position.z = cubeGroup.position.y; 
	sphere.rotation.z = time/1000;

	renderer.render(scene, camera);
}