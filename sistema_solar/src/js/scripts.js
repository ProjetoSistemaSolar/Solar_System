import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import moonTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);


const moonMesh =0;
function createPlanete(size, texture, position, ring, moon, moonTexture) {
    const systemPlanete = new THREE.Group();
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);

    systemPlanete.add(mesh);

    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);

        ringMesh.rotateX(3);

        systemPlanete.add(ringMesh);
    }
    if(moon) {
        const moonGeo = new THREE.SphereGeometry(size/5, 30, 30);
        const moonMat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(moonTexture)
        });
        var moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.x = 10;
        
        systemPlanete.add(moonMesh);
    }
    scene.add(systemPlanete);
    return {systemPlanete, moonMesh}
}

const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62, null, true, moonTexture);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

let time = 0;

function animate() {
    time += 0.09;

    sun.rotateY(0.005);
    mercury.systemPlanete.rotateY(0.005);
    venus.systemPlanete.rotateY(0.005);
    jupiter.systemPlanete.rotateY(0.005);
    pluto.systemPlanete.rotateY(0.005);
    //saturn.systemPlanete.rotateY(0.005);
    mars.systemPlanete.rotateY(0.005);
    earth.systemPlanete.rotateY(0.005);
    //uranus.systemPlanete.rotateY(0.005);
    neptune.systemPlanete.rotateY(0.005);




    mercury.systemPlanete.position.set(Math.cos(time * 0.7) *28, 0, Math.sin(time * 0.7) *28);
    venus.systemPlanete.position.set(Math.cos(time * 0.3) *44, 0, Math.sin(time * 0.3) *44);
    jupiter.systemPlanete.position.set(Math.cos(time * 0.01) *100, 0, Math.sin(time * 0.01) *100);
    pluto.systemPlanete.position.set(Math.cos(time * 0.00001) *216, 0, Math.sin(time * 0.00001) *216);
    saturn.systemPlanete.position.set(Math.cos(time * 0.009) *138, 0, Math.sin(time * 0.009) *138);
    mars.systemPlanete.position.set(Math.cos(time * 0.07) *78, 0, Math.sin(time * 0.07) *78);
    earth.systemPlanete.position.set(Math.cos(time * 0.1) *62, 0, Math.sin(time * 0.1) *62);
    uranus.systemPlanete.position.set(Math.cos(time * 0.003) *176, 0, Math.sin(time * 0.003) *176);
    neptune.systemPlanete.position.set(Math.cos(time * 0.0009) *200, 0, Math.sin(time * 0.0009) *200);
  
    earth.moonMesh.position.set(Math.cos(time * 0.9) *10, 0, Math.sin(time * 0.9) *10);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});