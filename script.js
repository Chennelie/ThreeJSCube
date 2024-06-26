import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';

import { TrackballControls } from "https://cdn.skypack.dev/three-trackballcontrols-ts@0.2.3";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#283c57");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

//Trackball Controls for Camera 
const controls = new TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

// Create Box
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
const boxMesh = new THREE.Mesh(boxGeometry, 
boxMaterial);
boxMesh.rotation.set(40, 0, 40);
scene.add(boxMesh);

//Rendering
const rendering = function() {
    requestAnimationFrame(rendering);
    // Constantly rotate box
    scene.rotation.z -= 0.005;
    scene.rotation.x -= 0.01;
    // Update trackball controls
    controls.update();
    renderer.render(scene, camera);
}
rendering();

// Lights
const lights = [];
const lightHelpers = [];
const lightValues = [
    {colour: 0xb85412, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
    {colour: 0x17bfb1, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
    {colour: 0x1566a1, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
    {colour: 0x541cbd, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
    {colour: 0xad18a8, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
    {colour: 0xb51638, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {
    lights[i] = new THREE.PointLight(
        lightValues[i]['colour'], 
        lightValues[i]['intensity'], 
        lightValues[i]['dist']);
    lights[i].position.set(
        lightValues[i]['x'], 
        lightValues[i]['y'], 
        lightValues[i]['z']);
    scene.add(lights[i]);

    //Helpers
    // lightHelpers[i] = new THREE.PointLightHelper(lights[i], 0.7);
    // scene.add(lightHelpers[i]);
}

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);