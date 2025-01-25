import * as THREE from 'three';
import { BOOK_DEFAULTS } from '../config/constants.js';

export class Book extends THREE.Group {
    constructor(bookId, { 
        width = BOOK_DEFAULTS.WIDTH, 
        height = BOOK_DEFAULTS.HEIGHT, 
        thickness = BOOK_DEFAULTS.THICKNESS, 
        color, 
        content 
    }) {
        super();
        this.bookId = bookId;
        this.dimensions = { width, height, thickness };
        this.color = color;
        this.content = content;
        this.isHovered = false;
        this.isOpen = false;
        this.initialY = 0; // Store initial Y position
        
        this.createGeometry();
        this.setupAnimations();
    }

    createGeometry() {
        // Add slight random variations to dimensions for more realism
        const actualWidth = this.dimensions.width;  
        const actualHeight = this.dimensions.height;
        const actualThickness = this.dimensions.thickness;

        // Cover thickness and page inset amount
        const coverThickness = BOOK_DEFAULTS.COVER.THICKNESS;
        const pageInset = BOOK_DEFAULTS.PAGE.INSET;

        // Create materials
        this.materials = {
            cover: new THREE.MeshStandardMaterial({
                color: new THREE.Color(`rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`),
                roughness: BOOK_DEFAULTS.MATERIAL.ROUGHNESS,
                metalness: BOOK_DEFAULTS.MATERIAL.METALNESS
            }),
            pages: new THREE.MeshStandardMaterial({
                color: BOOK_DEFAULTS.MATERIAL.PAGE_COLOR,
                roughness: BOOK_DEFAULTS.MATERIAL.ROUGHNESS,
                metalness: BOOK_DEFAULTS.MATERIAL.METALNESS
            })
        };

        // Create geometries
        const coverGeometry = new THREE.BoxGeometry(actualWidth, actualHeight, coverThickness);
        const spineGeometry = new THREE.BoxGeometry(coverThickness, actualHeight, actualThickness);
        const pagesGeometry = new THREE.BoxGeometry(
            actualWidth - pageInset * 2,
            actualHeight - pageInset * 2,
            actualThickness - coverThickness * 2
        );

        // Create meshes
        this.parts = {
            frontCover: new THREE.Mesh(coverGeometry, this.materials.cover),
            backCover: new THREE.Mesh(coverGeometry, this.materials.cover),
            spine: new THREE.Mesh(spineGeometry, this.materials.cover),
            pages: new THREE.Mesh(pagesGeometry, this.materials.pages)
        };

        // Position parts - centering everything around the origin
        this.parts.frontCover.position.set(0, 0, actualThickness/2 - coverThickness/2);
        this.parts.backCover.position.set(0, 0, -actualThickness/2 + coverThickness/2);
        this.parts.spine.position.set(-actualWidth/2 + coverThickness/2, 0, 0);
        this.parts.pages.position.set(0, 0, 0);

        // Create a container for all parts
        const container = new THREE.Group();
        Object.values(this.parts).forEach(part => {
            part.castShadow = true;
            part.receiveShadow = true;
            container.add(part);
        });

        this.add(container);

        // Set user data for raycasting
        this.userData.isBook = true;
        this.userData.bookId = this.bookId;
    }

    setupAnimations() {
        // Define animation states
        this.animations = {
            hover: {
                y: BOOK_DEFAULTS.HOVER.HEIGHT,
                duration: BOOK_DEFAULTS.HOVER.DURATION,
                ease: BOOK_DEFAULTS.HOVER.EASE
            },
            open: {
                rotateY: BOOK_DEFAULTS.OPEN.ANGLE,
                duration: BOOK_DEFAULTS.OPEN.DURATION,
                ease: BOOK_DEFAULTS.OPEN.EASE
            }
        };
    }

    setHovered(isHovered) {
        if (this.isHovered === isHovered) return;
        this.isHovered = isHovered;

        window.gsap.to(this.position, {
            y: isHovered ? this.initialY + this.animations.hover.y : this.initialY,
            duration: this.animations.hover.duration,
            ease: this.animations.hover.ease
        });

        // Update materials
        Object.values(this.parts).forEach(part => {
            if (part.material) {
                part.material.emissive.setHex(
                    isHovered ? 
                    BOOK_DEFAULTS.MATERIAL.HOVER_EMISSIVE : 
                    BOOK_DEFAULTS.MATERIAL.DEFAULT_EMISSIVE
                );
            }
        });
    }

    toggleOpen() {
        console.log('Toggle open called, current state:', this.isOpen);
        this.isOpen = !this.isOpen;
        
        window.gsap.to([this.parts.frontCover.rotation, this.parts.pages.rotation], {
            y: this.isOpen ? this.animations.open.rotateY : 0,
            duration: this.animations.open.duration,
            ease: this.animations.open.ease,
            onStart: () => console.log('Animation started'),
            onComplete: () => console.log('Animation completed')
        });
    }

    updateScale(screenWidth) {
        // Adjust book spacing based on screen size
        const baseScale = Math.min(1, screenWidth / 1200);
        this.scale.set(baseScale, baseScale, baseScale);
    }
}
