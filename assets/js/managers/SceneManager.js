import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CAMERA_SETTINGS, SCENE_BACKGROUND, LIGHTING_SETTINGS } from '../config/constants.js';

export class SceneManager {
    constructor() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();
        this.setupControls();
        this.setupEventListeners();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(SCENE_BACKGROUND);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            CAMERA_SETTINGS.FOV, 
            window.innerWidth / window.innerHeight, 
            CAMERA_SETTINGS.NEAR, 
            CAMERA_SETTINGS.FAR
        );
        
        // Position camera
        const vFov = this.camera.fov * Math.PI / 180;
        const centerY = 18; // Half of bookshelf height
        const distance = 36 / (2 * Math.tan(vFov / 2)); // Height / (2 * tan(fov/2))
        this.camera.position.set(0, centerY, distance);
        this.camera.lookAt(0, centerY, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    }

    setupLighting() {
        // Ambient light for general illumination
        const ambientLight = new THREE.AmbientLight(
            LIGHTING_SETTINGS.MAIN_LIGHT_COLOR, 
            LIGHTING_SETTINGS.AMBIENT_INTENSITY
        );
        this.scene.add(ambientLight);

        // Main directional light (simulating sun)
        const mainLight = new THREE.DirectionalLight(
            LIGHTING_SETTINGS.MAIN_LIGHT_COLOR, 
            LIGHTING_SETTINGS.MAIN_LIGHT_INTENSITY
        );
        mainLight.position.set(60, 60, 60);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = LIGHTING_SETTINGS.SHADOW_MAP_SIZE;
        mainLight.shadow.mapSize.height = LIGHTING_SETTINGS.SHADOW_MAP_SIZE;
        this.scene.add(mainLight);

        // Fill light from opposite direction
        const fillLight = new THREE.DirectionalLight(
            LIGHTING_SETTINGS.FILL_LIGHT_COLOR, 
            LIGHTING_SETTINGS.FILL_LIGHT_INTENSITY
        );
        fillLight.position.set(-60, 60, -60);
        this.scene.add(fillLight);

        // Add point lights for local illumination
        const pointLight1 = new THREE.PointLight(
            LIGHTING_SETTINGS.POINT_LIGHT_COLOR, 
            LIGHTING_SETTINGS.POINT_LIGHT_INTENSITY
        );
        pointLight1.position.set(24, 24, 12);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(
            LIGHTING_SETTINGS.POINT_LIGHT_COLOR, 
            LIGHTING_SETTINGS.POINT_LIGHT_INTENSITY
        );
        pointLight2.position.set(-24, 24, 12);
        this.scene.add(pointLight2);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 1.5;
        this.controls.minDistance = 12;
        this.controls.maxDistance = 360;
        this.controls.zoomSpeed = 3;
        this.controls.rotateSpeed = 0.8;
        this.controls.enablePan = true;
        this.controls.panSpeed = 0.8;
        this.controls.screenSpacePanning = true;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    add(object) {
        this.scene.add(object);
    }

    remove(object) {
        this.scene.remove(object);
    }
}
