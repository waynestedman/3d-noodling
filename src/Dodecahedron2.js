// Dodecahedron Geometry

import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const width = window.innerWidth, height = window.innerHeight;
const gui = new GUI();

// camera
const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 5;

const scene = new THREE.Scene();

// lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.6); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// geometry & mesh
let geometry = new THREE.DodecahedronGeometry(1, 0);
const material = new THREE.MeshBasicMaterial({ color: 0x987654, wireframe: false });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Wireframe mesh (always visible)
const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x444444, wireframe: true });
const wireframeMesh = new THREE.Mesh(geometry.clone(), wireframeMaterial);
scene.add(wireframeMesh);

// Function to update geometry
function updateGeometry() {
	// Dispose of old geometry to prevent memory leaks
	mesh.geometry.dispose();
	
	// Create new geometry with current parameters
	geometry = new THREE.DodecahedronGeometry(obj.radius, obj.detail);
	mesh.geometry = geometry;
	
	// Update wireframe mesh geometry too
	if (wireframeMesh) {
		wireframeMesh.geometry.dispose();
		wireframeMesh.geometry = geometry.clone();
	}
}

// Function to update material
function updateMaterial() {
	let baseMaterial;
	if (obj.materialType === 'Basic') {
		baseMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	} else if (obj.materialType === 'Normal') {
		baseMaterial = new THREE.MeshNormalMaterial();
	} else if (obj.materialType === 'Lambert') {
		baseMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
	}
	
	// Update main mesh material
	mesh.material = baseMaterial;
}

// GUI
const obj = {
	radius: 1,
	detail: 0,
	materialType: 'Normal'
}
gui.add(obj, 'radius', 0, 20).onChange(updateGeometry);
gui.add(obj, 'detail', 0, 5).step(1).onChange(updateGeometry);
gui.add(obj, 'materialType', ['Basic', 'Normal', 'Lambert']).onChange(updateMaterial);

// renderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// animation
function animate(time) {
	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;
	
	wireframeMesh.rotation.x = time / 2000;
	wireframeMesh.rotation.y = time / 1000;

	renderer.render( scene, camera );
}