import * as THREE from 'three';

export class InteractionManager {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredBook = null;
        this.books = new Map();
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.renderer.domElement.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.renderer.domElement.addEventListener('click', (event) => this.onClick(event));
    }

    registerBook(id, book, modal) {
        this.books.set(id, { object: book, modal });
    }

    unregisterBook(id) {
        this.books.delete(id);
    }

    onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Find all intersected objects
        const intersects = this.raycaster.intersectObjects(
            Array.from(this.books.values()).map(book => book.object), 
            true
        );

        // Handle hover states
        const intersectedBook = intersects.length > 0 ? 
            this.findBookFromMesh(intersects[0].object) : null;

        if (this.hoveredBook !== intersectedBook) {
            if (this.hoveredBook) {
                this.hoveredBook.setHovered(false);
            }
            if (intersectedBook) {
                intersectedBook.setHovered(true);
            }
            this.hoveredBook = intersectedBook;
        }
    }

    onClick(event) {
        if (this.hoveredBook) {
            const bookId = this.hoveredBook.bookId;
            const bookData = this.books.get(bookId);
            if (bookData && bookData.modal) {
                bookData.modal.classList.add('modal-active');
                this.hoveredBook.toggleOpen();
            }
        }
    }

    findBookFromMesh(mesh) {
        // Find the Book instance that contains this mesh
        for (const bookData of this.books.values()) {
            if (bookData.object.userData.isBook && 
                (mesh === bookData.object || mesh.parent === bookData.object)) {
                return bookData.object;
            }
        }
        return null;
    }
}
