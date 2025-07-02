// Dodecahedron Geometry

import * as THREE from 'three';
// import DodecahedronGeometry from 'three';
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
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// Function to update geometry
function updateGeometry() {
	// Dispose of old geometry to prevent memory leaks
	mesh.geometry.dispose();
	
	// Create new geometry with current parameters
	geometry = new THREE.DodecahedronGeometry(obj.radius, obj.detail);
	mesh.geometry = geometry;
}

// Function to update material
function updateMaterial() {
	// Dispose of old material to prevent memory leaks
	if (mesh.material) {
		mesh.material.dispose();
	}
	
	let baseMaterial;
	if (obj.materialType === 'Basic') {
		baseMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	} else if (obj.materialType === 'Normal') {
		baseMaterial = new THREE.MeshNormalMaterial();
	} else if (obj.materialType === 'Lambert') {
		baseMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
	}
	
	if (obj.renderMode === 'Wireframe Only') {
		mesh.material = baseMaterial.clone();
		mesh.material.wireframe = true;
	} else if (obj.renderMode === 'Material Only') {
		mesh.material = baseMaterial.clone();
		mesh.material.wireframe = false;
	} else if (obj.renderMode === 'Wireframe + Material') {
		// Create a group to hold both wireframe and solid versions
		scene.remove(mesh);
		
		// Solid mesh
		const solidMesh = new THREE.Mesh(geometry, baseMaterial.clone());
		solidMesh.material.wireframe = false;
		
		// Wireframe mesh
		const wireframeMesh = new THREE.Mesh(geometry, baseMaterial.clone());
		wireframeMesh.material.wireframe = true;
		wireframeMesh.material.color.setHex(0x000000); // Black wireframe
		
		// Add both to scene
		scene.add(solidMesh);
		scene.add(wireframeMesh);
		
		// Update references for animation
		mesh.userData.solidMesh = solidMesh;
		mesh.userData.wireframeMesh = wireframeMesh;
		return;
	}
	
	// Make sure mesh is in scene for single material modes
	if (!scene.children.includes(mesh)) {
		scene.add(mesh);
	}
}

// GUI
const obj = {
	radius: 1,
	detail: 0,
	renderMode: 'Material Only',
	materialType: 'Basic'
}
gui.add(obj, 'radius', 0, 20).onChange(updateGeometry);
gui.add(obj, 'detail', 0, 5).step(1).onChange(updateGeometry);
gui.add(obj, 'renderMode', ['Wireframe Only', 'Material Only', 'Wireframe + Material']).onChange(updateMaterial);
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
function animate( time ) {
	// Handle rotation for different render modes
	if (obj.renderMode === 'Wireframe + Material') {
		// Rotate both solid and wireframe meshes if they exist
		if (mesh.userData.solidMesh) {
			mesh.userData.solidMesh.rotation.x = time / 2000;
			mesh.userData.solidMesh.rotation.y = time / 1000;
		}
		if (mesh.userData.wireframeMesh) {
			mesh.userData.wireframeMesh.rotation.x = time / 2000;
			mesh.userData.wireframeMesh.rotation.y = time / 1000;
		}
	} else {
		// Rotate the main mesh
		mesh.rotation.x = time / 2000;
		mesh.rotation.y = time / 1000;
	}

	renderer.render( scene, camera );
}