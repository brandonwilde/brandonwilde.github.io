import { BookshelfScene } from './assets/js/BookshelfScene.js';
import { bookConfigs, shelfConfigs, modalConfig } from './assets/js/config/contentConfig.js';

// Initialize the scene
const bookshelfScene = new BookshelfScene();

// Create the bookshelf structure
bookshelfScene.createBookshelf();

// Add books using the shelf configuration
bookshelfScene.addBooksFromConfig(bookConfigs, shelfConfigs);

// Initialize modals
function initializeModals() {
    const modalTemplates = {};
    Object.entries(modalConfig.templates).forEach(([key, templateId]) => {
        modalTemplates[key] = document.getElementById(templateId);
    });

    // Close modal when clicking outside
    if (modalConfig.closeOnOutsideClick) {
        window.onclick = function(event) {
            if (event.target.classList.contains('modal-container')) {
                event.target.classList.remove('modal-active');
            }
        };
    }

    // Add close button functionality to all modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.onclick = function() {
            this.closest('.modal-container').classList.remove('modal-active');
        };
    });
}

// Start the animation loop
bookshelfScene.animate();

// Initialize modals
initializeModals();
