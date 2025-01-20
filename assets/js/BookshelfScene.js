import * as THREE from 'three';
import { Book } from './components/Book.js';
import { Shelf } from './components/Shelf.js';
import { SceneManager } from './managers/SceneManager.js';
import { InteractionManager } from './managers/InteractionManager.js';
import { BOOKSHELF_DIMENSIONS } from './config/constants.js';

export class BookshelfScene {
    constructor() {
        // Initialize managers
        this.sceneManager = new SceneManager();
        this.interactionManager = new InteractionManager(
            this.sceneManager.camera, 
            this.sceneManager.renderer
        );
        
        // Initialize collections
        this.shelves = new Map();
        this.books = new Map();
        this.setupTextures();
        this.createBookshelf();
    }

    setupTextures() {
        this.textureLoader = new THREE.TextureLoader();
        this.woodTexture = this.textureLoader.load('assets/textures/wood2.png');
        this.woodTextureHorizontal = this.textureLoader.load('assets/textures/wood2-h-cropped.png');
        
        this.woodTexture.wrapS = this.woodTexture.wrapT = THREE.RepeatWrapping;
        this.woodTextureHorizontal.wrapS = this.woodTextureHorizontal.wrapT = THREE.RepeatWrapping;
    }

    createBookshelf() {
        // Create back panel
        const backPanelGeometry = new THREE.BoxGeometry(
            BOOKSHELF_DIMENSIONS.WIDTH, 
            BOOKSHELF_DIMENSIONS.HEIGHT, 
            BOOKSHELF_DIMENSIONS.FRAME_THICKNESS
        );
        const backPanel = new THREE.Mesh(backPanelGeometry, this.createWoodMaterial(this.woodTexture));
        backPanel.position.set(0, 0, -BOOKSHELF_DIMENSIONS.DEPTH/2);
        backPanel.castShadow = true;
        backPanel.receiveShadow = true;
        this.sceneManager.add(backPanel);

        // Create side panels
        const sidePanelGeometry = new THREE.BoxGeometry(
            BOOKSHELF_DIMENSIONS.FRAME_THICKNESS, 
            BOOKSHELF_DIMENSIONS.HEIGHT, 
            BOOKSHELF_DIMENSIONS.DEPTH
        );
        
        const leftPanel = new THREE.Mesh(sidePanelGeometry, this.createWoodMaterial(this.woodTexture));
        leftPanel.position.set(-BOOKSHELF_DIMENSIONS.WIDTH/2, 0, 0);
        leftPanel.castShadow = true;
        leftPanel.receiveShadow = true;
        this.sceneManager.add(leftPanel);

        const rightPanel = new THREE.Mesh(sidePanelGeometry, this.createWoodMaterial(this.woodTexture));
        rightPanel.position.set(BOOKSHELF_DIMENSIONS.WIDTH/2, 0, 0);
        rightPanel.castShadow = true;
        rightPanel.receiveShadow = true;
        this.sceneManager.add(rightPanel);

        // Create shelves
        const numShelves = Math.floor(BOOKSHELF_DIMENSIONS.HEIGHT / BOOKSHELF_DIMENSIONS.SHELF_SPACING);
        for (let i = 0; i <= numShelves; i++) {
            const y = i * BOOKSHELF_DIMENSIONS.SHELF_SPACING - BOOKSHELF_DIMENSIONS.HEIGHT / 2;
            const shelf = new Shelf(String.fromCharCode(65 + i), y, this.woodTextureHorizontal);
            this.sceneManager.add(shelf.mesh);
            this.shelves.set(shelf.id, shelf);
        }
    }

    createWoodMaterial(texture) {
        return new THREE.MeshStandardMaterial({
            map: texture,
            normalMap: texture,
            roughness: 0.8,
            metalness: 0.1,
            bumpMap: texture,
            bumpScale: 0.02
        });
    }

    createBook(id, bookProps) {
        const book = new Book(id, bookProps);
        const shelf = this.shelves.get(bookProps.shelf);
        
        if (shelf) {
            shelf.addBook(book, bookProps.section);
            this.sceneManager.add(book);
            this.interactionManager.registerBook(id, book, document.getElementById(`${id}Modal`));
            this.books.set(id, {
                object: book,
                modal: document.getElementById(`${id}Modal`),
                shelf: bookProps.shelf,
                section: bookProps.section
            });
        }
        
        return book;
    }

    animate() {
        this.sceneManager.animate();
    }
}
