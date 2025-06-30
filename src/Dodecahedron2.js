// Dodecahedron Geometry

import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// camera & scene setup
const threeCanvas = document.getElementById('threeroot');
const width = 1280; // window.innerWidth;
const height = 1024; // window.innerHeight;
const gui = new GUI();

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.set(0, 0, 3);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);

// lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.6); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// geometry & mesh
let dodecageometry = new THREE.DodecahedronGeometry(1, 0);
const material = new THREE.MeshBasicMaterial({ color: 0x987654, wireframe: false });

const mesh = new THREE.Mesh(dodecageometry, material);
// scene.add(mesh);
const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x444444, wireframe: true });
const wireframeMesh = new THREE.Mesh(dodecageometry.clone(), wireframeMaterial);
// scene.add(wireframeMesh);

const dodecaGroup = new THREE.Group();
dodecaGroup.add(mesh);
dodecaGroup.add(wireframeMesh);
dodecaGroup.position.set(0, 1, 0);
scene.add(dodecaGroup);

// Function to update geometry
function updateGeometry() {
	// Dispose of old geometry to prevent memory leaks
	mesh.dodecageometry.dispose();
	
	// Create new geometry with current parameters
	dodecageometry = new THREE.DodecahedronGeometry(obj.radius, obj.detail);
	mesh.dodecageometry = dodecageometry;
	
	// Update wireframe mesh geometry
	if (wireframeMesh) {
		wireframeMesh.dodecageometry.dispose();
		wireframeMesh.dodecageometry = dodecageometry.clone();
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
threeCanvas.appendChild( renderer.domElement );

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