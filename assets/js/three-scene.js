import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class BookshelfScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.books = new Map();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredBook = null;
        this.textureLoader = new THREE.TextureLoader();
        
        // Load textures
        this.woodTexture = this.textureLoader.load('assets/textures/wood2.png');
        this.woodTextureHorizontal = this.textureLoader.load('assets/textures/wood2-h-cropped.png');
        
        // Configure textures
        this.woodTexture.wrapS = this.woodTexture.wrapT = THREE.RepeatWrapping;
        this.woodTextureHorizontal.wrapS = this.woodTextureHorizontal.wrapT = THREE.RepeatWrapping;
        
        this.init();
        this.setupLighting();
        this.setupControls();
        this.setupEventListeners();
    }

    init() {
        this.scene.background = new THREE.Color(0xf7f3e9);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);

        // Calculate dimensions based on viewport
        const aspect = window.innerWidth / window.innerHeight;
        
        // Store initial dimensions for responsive scaling
        this.dimensions = {
            width: 5,
            height: 3,
            depth: 0.6,
            baseDistance: 20
        };

        // Position camera to be centered on bookcase
        const vFov = this.camera.fov * Math.PI / 180;
        const distance = this.dimensions.height / (2 * Math.tan(vFov / 2));
        const centerY = this.dimensions.height / 2;

        // Position camera at center height, slightly elevated for better view
        this.camera.position.set(0, centerY, distance);
        this.camera.lookAt(0, centerY, 0);

        this.createBookshelf();
    }

    setupLighting() {
        // Ambient light for general illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);  
        this.scene.add(ambientLight);

        // Main directional light (simulating sun)
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);  
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 20;
        this.scene.add(mainLight);

        // Fill light from opposite direction
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);  
        fillLight.position.set(-5, 5, -5);
        this.scene.add(fillLight);

        // Add some subtle point lights to enhance book details
        const pointLight1 = new THREE.PointLight(0xffcc88, 0.5);  
        pointLight1.position.set(2, 2, 1);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffcc88, 0.5);  
        pointLight2.position.set(-2, 2, 1);
        this.scene.add(pointLight2);
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;  
        this.controls.maxPolarAngle = Math.PI / 1.5;
        this.controls.minDistance = 1;  
        this.controls.maxDistance = 30;
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

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        
        // Update camera
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Calculate new dimensions based on viewport
        const vFov = this.camera.fov * Math.PI / 180;
        const centerY = this.dimensions.height / 2;

        // Scale bookshelf based on aspect ratio
        const scale = Math.min(1.2, aspect);
        this.scene.children.forEach(child => {
            if (child.geometry) {
                if (child.geometry.type === 'BoxGeometry') {
                    // Scale the bookshelf elements while maintaining proportions
                    if (child.geometry.parameters.width >= 1) {  // Only scale larger elements (shelves/panels)
                        child.scale.x = scale;
                    }
                }
            }
        });

        // Adjust camera distance based on screen size while maintaining center position
        const distance = this.dimensions.baseDistance / Math.min(1, aspect);
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
            const bookData = this.books.get(this.hoveredBook.userData.id);
            if (bookData.modal) {
                bookData.modal.classList.add('modal-active');
            }
        }
    }

    checkIntersection() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (this.hoveredBook) {
            // Reset all materials in the book
            this.hoveredBook.traverse((object) => {
                if (object.material) {
                    object.material.emissive.setHex(0x000000);
                }
            });
            this.hoveredBook = null;
        }

        for (const intersect of intersects) {
            if (intersect.object.userData.isBook) {
                this.hoveredBook = intersect.object;
                // Set emissive for all materials in the book
                this.hoveredBook.traverse((object) => {
                    if (object.material) {
                        object.material.emissive.setHex(0x333333);
                    }
                });
                break;
            }
        }
    }

    createBookshelf() {
        // Create materials with wood texture
        const shelfMaterial = new THREE.MeshStandardMaterial({
            map: this.woodTexture,
            normalMap: this.woodTexture,
            roughness: 0.8,
            metalness: 0.1,
            bumpMap: this.woodTexture,
            bumpScale: 0.02
        });

        const horizontalShelfMaterial = new THREE.MeshStandardMaterial({
            map: this.woodTextureHorizontal,
            normalMap: this.woodTextureHorizontal,
            roughness: 0.8,
            metalness: 0.1,
            bumpMap: this.woodTextureHorizontal,
            bumpScale: 0.02
        });

        // Calculate center point
        const centerY = this.dimensions.height / 2;

        // Back panel - positioned relative to center
        const backPanel = new THREE.Mesh(
            new THREE.BoxGeometry(this.dimensions.width, this.dimensions.height, 0.1),
            shelfMaterial
        );
        backPanel.position.set(0, 0, -0.3);
        backPanel.castShadow = true;
        backPanel.receiveShadow = true;
        this.scene.add(backPanel);

        // Create shelves - adjust number based on height
        const numShelves = 3;
        const shelfSpacing = this.dimensions.height / numShelves;
        const shelfGeometry = new THREE.BoxGeometry(this.dimensions.width, 0.05, this.dimensions.depth);
        
        // Position shelves relative to center
        for (let i = 0; i <= numShelves; i++) {
            const shelf = new THREE.Mesh(shelfGeometry, horizontalShelfMaterial);
            const shelfY = (i * shelfSpacing) - (this.dimensions.height / 2);
            shelf.position.set(0, shelfY, 0);
            shelf.castShadow = true;
            shelf.receiveShadow = true;
            this.scene.add(shelf);
        }

        // Side panels - positioned relative to center
        const sidePanelGeometry = new THREE.BoxGeometry(0.1, this.dimensions.height, this.dimensions.depth);
        
        const leftPanel = new THREE.Mesh(sidePanelGeometry, shelfMaterial);
        leftPanel.position.set(-this.dimensions.width/2 - 0.5, 0, 0);
        leftPanel.castShadow = true;
        leftPanel.receiveShadow = true;
        this.scene.add(leftPanel);

        const rightPanel = new THREE.Mesh(sidePanelGeometry, shelfMaterial);
        rightPanel.position.set(this.dimensions.width/2 + 0.5, 0, 0);
        rightPanel.castShadow = true;
        rightPanel.receiveShadow = true;
        this.scene.add(rightPanel);

        // Initial scaling based on current aspect ratio
        this.onWindowResize();
    }

    calculateShelfPosition(shelf, section, bookHeight) {
        const SHELF_THICKNESS = 0.05;  // Matches the thickness we set in createBookshelf
        const SHELF_HEIGHT = 1;        // Height between shelves

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
        const shelfY = shelfHeights[shelf] * SHELF_HEIGHT;
        
        // Calculate vertical offset to place book on shelf
        const y = shelfY - (SHELF_HEIGHT - SHELF_THICKNESS - bookHeight) / 2;
        
        const x = sectionPositions[section] * (this.dimensions.width - 1);
        
        return { x, y, z: 0 };
    }

    createBook(id, { width = 0.4, height = 0.8, depth = 0.2, color = [255, 0, 0], content = "", shelf = "B", section = 1 }) {
        // Add slight random variations to dimensions for more realism
        const actualWidth = width * (1 + (Math.random() - 0.5) * 0.1);
        const actualHeight = height * (1 + (Math.random() - 0.5) * 0.05);
        const actualDepth = depth * (1 + (Math.random() - 0.5) * 0.1);

        // Cover thickness and page inset amount
        const coverThickness = 0.02;  // Thickness of the cover
        const pageInset = 0.015;      // How far the pages are inset from the cover edges

        // Create the main book geometry
        const bookGroup = new THREE.Group();

        // Create front and back covers (slightly larger than pages)
        const coverGeometry = new THREE.BoxGeometry(coverThickness, actualHeight, actualWidth);
        const spineGeometry = new THREE.BoxGeometry(actualDepth, actualHeight, coverThickness);
        
        // Create pages (slightly smaller than covers)
        const pagesGeometry = new THREE.BoxGeometry(
            actualDepth - coverThickness * 2,  // Pages are thinner than total depth
            actualHeight - pageInset * 2,      // Pages are shorter than covers
            actualWidth - pageInset * 2        // Pages are narrower than covers
        );

        // Calculate position based on shelf and section, using actual height
        const position = this.calculateShelfPosition(shelf, section, actualHeight);

        // Create procedural textures
        // Pages texture
        const pagesCanvas = document.createElement('canvas');
        pagesCanvas.width = 512;
        pagesCanvas.height = 512;
        const ctx = pagesCanvas.getContext('2d');
        
        // Fill with base color
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, 512, 512);
        
        // Add page lines
        ctx.strokeStyle = '#d0d0d0';
        for (let i = 0; i < 50; i++) {
            const y = (i / 50) * 512;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(512, y);
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Add noise pattern
        for (let i = 0; i < 20000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            ctx.fillStyle = `rgba(0,0,0,${0.2 * Math.random()})`;
            ctx.fillRect(x, y, 1, 1);
        }

        // Create page edge darkening
        const gradient = ctx.createLinearGradient(0, 0, 512, 0);
        gradient.addColorStop(0, 'rgba(0,0,0,0.4)');
        gradient.addColorStop(0.1, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.9, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        
        const pagesTexture = new THREE.CanvasTexture(pagesCanvas);
        pagesTexture.wrapS = THREE.RepeatWrapping;
        pagesTexture.wrapT = THREE.RepeatWrapping;
        pagesTexture.repeat.set(4, 4);

        // Cover texture
        const coverCanvas = document.createElement('canvas');
        coverCanvas.width = 512;
        coverCanvas.height = 512;
        const coverCtx = coverCanvas.getContext('2d');
        
        coverCtx.fillStyle = `rgb(${color.join(',')})`;
        coverCtx.fillRect(0, 0, 512, 512);
        
        // Add leather-like texture
        for (let i = 0; i < 50000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            coverCtx.fillStyle = `rgba(0,0,0,${0.5 * Math.random()})`;
            coverCtx.fillRect(x, y, 1, 1);
        }
        
        // Add edge wear
        const coverGradient = coverCtx.createLinearGradient(0, 0, 512, 512);
        coverGradient.addColorStop(0, 'rgba(255,255,255,0.1)');
        coverGradient.addColorStop(0.5, 'rgba(0,0,0,0.1)');
        coverGradient.addColorStop(1, 'rgba(0,0,0,0.2)');
        coverCtx.fillStyle = coverGradient;
        coverCtx.fillRect(0, 0, 512, 512);
        
        const coverTexture = new THREE.CanvasTexture(coverCanvas);
        coverTexture.wrapS = THREE.RepeatWrapping;
        coverTexture.wrapT = THREE.RepeatWrapping;

        // Create materials
        const pagesMaterial = new THREE.MeshPhysicalMaterial({
            map: pagesTexture,
            color: 0xf5f5f5,
            roughness: 0.9,
            metalness: 0.0,
            normalMap: pagesTexture,
            normalScale: new THREE.Vector2(0.1, 0.1),
            clearcoat: 0.0,
            clearcoatRoughness: 0.8,
            reflectivity: 0.2,
        });

        const coverMaterial = new THREE.MeshPhysicalMaterial({
            map: coverTexture,
            color: new THREE.Color(`rgb(${color.join(',')})`),
            roughness: 0.5,
            metalness: 0.1,
            normalMap: coverTexture,
            normalScale: new THREE.Vector2(0.5, 0.5),
            clearcoat: 0.3,
            clearcoatRoughness: 0.4,
            reflectivity: 0.1,
        });

        const spineMaterial = new THREE.MeshPhysicalMaterial({
            map: coverTexture,
            color: new THREE.Color(`rgb(${color.map(c => Math.round(c * 0.8)).join(',')})`),
            roughness: 0.5,
            metalness: 0.1,
            normalMap: coverTexture,
            normalScale: new THREE.Vector2(0.5, 0.5),
            clearcoat: 0.3,
            clearcoatRoughness: 0.4,
            reflectivity: 0.1,
        });

        // Create meshes
        const frontCover = new THREE.Mesh(coverGeometry, coverMaterial);
        const backCover = new THREE.Mesh(coverGeometry, coverMaterial);
        const spine = new THREE.Mesh(spineGeometry, spineMaterial);
        const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);

        // Position the components (with book opening facing forward)
        frontCover.position.x = actualDepth/2 - coverThickness/2;
        backCover.position.x = -actualDepth/2 + coverThickness/2;
        spine.position.x = 0;
        spine.position.z = -actualWidth/2 + coverThickness/2;
        pages.position.x = 0;

        // Add all parts to the group
        bookGroup.add(frontCover);
        bookGroup.add(backCover);
        bookGroup.add(spine);
        bookGroup.add(pages);

        // Position the book group
        bookGroup.position.set(position.x, position.y, position.z);
        bookGroup.rotation.y = Math.PI;
        
        // Add slight random rotation for more natural look
        bookGroup.rotation.z += (Math.random() - 0.5) * 0.05;
        
        // Set up shadows
        bookGroup.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });

        bookGroup.userData = { isBook: true, id: id };

        this.scene.add(bookGroup);
        this.books.set(id, { mesh: bookGroup, content: content });

        return bookGroup;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

export { BookshelfScene };
