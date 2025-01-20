import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Book } from './Book.js';
import { BOOKSHELF_DIMENSIONS, CAMERA_SETTINGS, SCENE_BACKGROUND, LIGHTING_SETTINGS } from './constants.js';

class BookshelfScene {
    constructor() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupTextures();
        this.setupLighting();
        this.setupControls();
        this.setupEventListeners();
        this.setupInteraction();
        
        // Initialize collections
        this.books = new Map();
        this.shelves = new Map();
        
        this.createBookshelf();
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
        
        // Store dimensions for responsive scaling
        this.dimensions = {
            width: BOOKSHELF_DIMENSIONS.WIDTH,
            height: BOOKSHELF_DIMENSIONS.HEIGHT,
            depth: BOOKSHELF_DIMENSIONS.DEPTH,
            baseDistance: BOOKSHELF_DIMENSIONS.BASE_DISTANCE
        };

        // Position camera
        const vFov = this.camera.fov * Math.PI / 180;
        const distance = this.dimensions.height / (2 * Math.tan(vFov / 2));
        const centerY = this.dimensions.height / 2;
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

    setupTextures() {
        this.textureLoader = new THREE.TextureLoader();
        this.woodTexture = this.textureLoader.load('assets/textures/wood2.png');
        this.woodTextureHorizontal = this.textureLoader.load('assets/textures/wood2-h-cropped.png');
        
        this.woodTexture.wrapS = this.woodTexture.wrapT = THREE.RepeatWrapping;
        this.woodTextureHorizontal.wrapS = this.woodTextureHorizontal.wrapT = THREE.RepeatWrapping;
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
        this.renderer.domElement.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.renderer.domElement.addEventListener('click', (event) => this.onClick(event));
    }

    setupInteraction() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredBook = null;
    }

    createBookshelf() {
        // Create vertical panel material (for sides and back)
        const verticalPanelMaterial = new THREE.MeshStandardMaterial({
            map: this.woodTexture,
            normalMap: this.woodTexture,
            roughness: 0.8,
            metalness: 0.1,
            bumpMap: this.woodTexture,
            bumpScale: 0.02
        });

        // Create horizontal shelf material
        const horizontalShelfMaterial = new THREE.MeshStandardMaterial({
            map: this.woodTextureHorizontal,
            normalMap: this.woodTextureHorizontal,
            roughness: 0.8,
            metalness: 0.1,
            bumpMap: this.woodTextureHorizontal,
            bumpScale: 0.02
        });

        // Create back panel
        const backPanelGeometry = new THREE.BoxGeometry(
            this.dimensions.width, 
            this.dimensions.height, 
            BOOKSHELF_DIMENSIONS.FRAME_THICKNESS
        );
        const backPanel = new THREE.Mesh(backPanelGeometry, verticalPanelMaterial);
        backPanel.position.set(0, 0, -this.dimensions.depth/2);
        backPanel.castShadow = true;
        backPanel.receiveShadow = true;
        this.scene.add(backPanel);

        // Create side panels
        const sidePanelGeometry = new THREE.BoxGeometry(
            BOOKSHELF_DIMENSIONS.FRAME_THICKNESS, 
            this.dimensions.height, 
            this.dimensions.depth
        );
        
        const leftPanel = new THREE.Mesh(sidePanelGeometry, verticalPanelMaterial);
        leftPanel.position.set(-this.dimensions.width/2, 0, 0);
        leftPanel.castShadow = true;
        leftPanel.receiveShadow = true;
        this.scene.add(leftPanel);

        const rightPanel = new THREE.Mesh(sidePanelGeometry, verticalPanelMaterial);
        rightPanel.position.set(this.dimensions.width/2, 0, 0);
        rightPanel.castShadow = true;
        rightPanel.receiveShadow = true;
        this.scene.add(rightPanel);

        // Create shelves
        const shelfGeometry = new THREE.BoxGeometry(
            this.dimensions.width, 
            BOOKSHELF_DIMENSIONS.SHELF_THICKNESS, 
            this.dimensions.depth
        );

        const numShelves = Math.floor(this.dimensions.height / BOOKSHELF_DIMENSIONS.SHELF_SPACING);
        for (let i = 0; i <= numShelves; i++) {
            const shelf = new THREE.Mesh(shelfGeometry, horizontalShelfMaterial);
            const y = i * BOOKSHELF_DIMENSIONS.SHELF_SPACING - BOOKSHELF_DIMENSIONS.HEIGHT / 2;
            shelf.position.set(0, y, 0);
            shelf.castShadow = true;
            shelf.receiveShadow = true;
            this.scene.add(shelf);
            
            // Store shelf reference
            this.shelves.set(String.fromCharCode(65 + i), {
                object: shelf,
                y: y,
                books: new Map()
            });
        }
    }

    createBook(id, bookProps) {
        const book = new Book(id, bookProps);
        
        // Position the book
        const position = this.calculateShelfPosition(bookProps.shelf, bookProps.section, bookProps.height);
        book.position.set(position.x, position.y, position.z);
        book.initialY = position.y; // Store initial Y position
        book.rotation.y = Math.PI / 2;
        
        // Store book reference
        this.books.set(id, {
            object: book,
            modal: document.getElementById(`${id}Modal`),
            shelf: bookProps.shelf,
            section: bookProps.section
        });
        
        this.scene.add(book);
        return book;
    }

    calculateShelfPosition(shelf, section, bookHeight) {
        const shelfHeights = {
            'A': 1,      // Top shelf
            'B': 0,      // Middle shelf
            'C': -1      // Bottom shelf
        };

        const sectionPositions = {
            1: -0.75,    // Leftmost quarter
            2: -0.25,    // Center-left quarter
            3: 0.25,     // Center-right quarter
            4: 0.75      // Rightmost quarter
        };

        if (!shelfHeights.hasOwnProperty(shelf)) {
            throw new Error('Invalid shelf. Must be "A", "B", or "C"');
        }

        if (!sectionPositions.hasOwnProperty(section)) {
            throw new Error('Invalid section. Must be 1, 2, 3, or 4');
        }

        // Calculate base shelf position
        const shelfY = shelfHeights[shelf] * BOOKSHELF_DIMENSIONS.SHELF_SPACING;
        
        // Calculate vertical offset to place book on shelf
        const y = shelfY - (BOOKSHELF_DIMENSIONS.SHELF_SPACING - BOOKSHELF_DIMENSIONS.SHELF_THICKNESS - bookHeight) / 2;
        
        const x = sectionPositions[section] * (this.dimensions.width/2);
        
        return { x, y, z: 0 };
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        
        // Update camera
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Update book scales and positions
        this.books.forEach(({ object }) => {
            object.updateScale(window.innerWidth);
        });

        // Adjust camera distance based on screen size
        const distance = this.dimensions.baseDistance / Math.min(1, aspect);
        const centerY = this.dimensions.height / 2;
        this.camera.position.set(0, centerY, Math.max(this.dimensions.baseDistance, distance));
        this.camera.lookAt(0, centerY, 0);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.checkIntersection();
    }

    onClick(event) {
        if (this.hoveredBook) {
            const bookData = this.books.get(this.hoveredBook.userData.bookId);
            bookData.object.toggleOpen();
            if (bookData.modal) {
                bookData.modal.classList.add('modal-active');
            }
        }
    }

    checkIntersection() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        // Reset previously hovered book
        if (this.hoveredBook) {
            const book = this.books.get(this.hoveredBook.userData.bookId).object;
            book.setHovered(false);
            this.hoveredBook = null;
        }

        // Find and update newly hovered book
        for (const intersect of intersects) {
            if (intersect.object.parent?.userData?.isBook) {
                this.hoveredBook = intersect.object.parent;
                const book = this.books.get(this.hoveredBook.userData.bookId).object;
                book.setHovered(true);
                break;
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

export { BookshelfScene };
