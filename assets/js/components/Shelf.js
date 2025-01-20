import * as THREE from 'three';
import { BOOKSHELF_DIMENSIONS } from '../config/constants.js';

export class Shelf {
    constructor(id, y, texture) {
        this.id = id;
        this.y = y;
        this.books = new Map();
        this.sections = new Map();
        this.createGeometry(texture);
    }

    createGeometry(texture) {
        // Create material with wood texture
        this.material = new THREE.MeshStandardMaterial({
            map: texture,
            normalMap: texture,
            roughness: 0.8,
            metalness: 0.1,
            bumpMap: texture,
            bumpScale: 0.02
        });

        // Create shelf geometry
        this.geometry = new THREE.BoxGeometry(
            BOOKSHELF_DIMENSIONS.WIDTH,
            BOOKSHELF_DIMENSIONS.SHELF_THICKNESS,
            BOOKSHELF_DIMENSIONS.DEPTH
        );

        // Create mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, this.y, 0);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }

    calculateBookPosition(section, bookHeight) {
        // Define section positions as fractions of shelf width
        const sectionPositions = {
            1: -0.75,    // Leftmost quarter
            2: -0.25,    // Center-left quarter
            3: 0.25,     // Center-right quarter
            4: 0.75      // Rightmost quarter
        };

        if (!sectionPositions.hasOwnProperty(section)) {
            throw new Error('Invalid section. Must be 1, 2, 3, or 4');
        }

        // Calculate x position based on section
        const x = sectionPositions[section] * (BOOKSHELF_DIMENSIONS.WIDTH/2);
        
        // Calculate y position (on top of shelf)
        const y = this.y + BOOKSHELF_DIMENSIONS.SHELF_THICKNESS/2 + bookHeight/2;
        
        // Keep z position at 0 (centered on shelf)
        const z = 0;
        
        return { x, y, z };
    }

    addBook(book, section) {
        const position = this.calculateBookPosition(section, book.dimensions.height);
        book.position.set(position.x, position.y, position.z);
        book.rotation.y = Math.PI / 2; // Rotate 90 degrees around Y axis
        book.initialY = position.y; // Store initial Y position for animations
        this.books.set(book.bookId, { object: book, section });
    }

    removeBook(bookId) {
        this.books.delete(bookId);
    }

    getBookCount() {
        return this.books.size;
    }

    getBooks() {
        return Array.from(this.books.values()).map(book => book.object);
    }
}
