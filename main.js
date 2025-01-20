import { BookshelfScene } from './assets/js/three-scene.js';
import { colors } from './assets/js/constants.js';

// Initialize the scene
const bookshelfScene = new BookshelfScene();

// Create the bookshelf structure
bookshelfScene.createBookshelf();

// Create education books (top shelf)
const bachelorsBook = bookshelfScene.createBook('bachelors', {
    width: 0.38,
    height: 0.8,
    depth: 0.25,
    color: colors.red,
    content: 'B.S. Chemical Engineering & German',
    shelf: 'A',
    section: 1
});

const mastersBook = bookshelfScene.createBook('masters', {
    width: 0.33,
    height: 0.8,
    depth: 0.25,
    color: colors.red,
    content: 'M.S. Computational Linguistics',
    shelf: 'A',
    section: 2
});

// Create some decorative books for variety
// const decorativeBooks = [
//     { width: 0.25, height: 0.7, color: colors.gray, x: -0.8 },
//     { width: 0.2, height: 0.75, color: colors.purple, x: -0.5 },
//     { width: 0.3, height: 0.65, color: colors.purple, x: -0.1 },
//     { width: 0.28, height: 0.85, color: colors.yellowGreen, x: 0.3 }
// ].forEach((book, index) => {
//     bookshelfScene.createBook(`decorative${index}`, {
//         width: book.width,
//         height: book.height,
//         depth: 0.2,
//         color: book.color,
//         position: { x: book.x, y: 2, z: 0 }
//     });
// });

// Create professional experience books (bottom shelf)
const translateBook = bookshelfScene.createBook('translate', {
    width: 0.25,
    height: 0.6,
    depth: 0.2,
    color: colors.yellow,
    content: 'Freelance Translation',
    shelf: 'B',
    section: 1
});

const montcoBook = bookshelfScene.createBook('montco', {
    width: 0.24,
    height: 0.65,
    depth: 0.2,
    color: colors.purple,
    content: 'Montco Hunger Solutions',
    shelf: 'B',
    section: 2
});

const aeiBook = bookshelfScene.createBook('aei', {
    width: 0.2,
    height: 0.7,
    depth: 0.2,
    color: colors.gray,
    content: 'AEI',
    shelf: 'B',
    section: 3
});

const msu1Book = bookshelfScene.createBook('msu1', {
    width: 0.15,
    height: 0.6,
    depth: 0.2,
    color: colors.red,
    content: 'MSU',
    shelf: 'B',
    section: 4
});

const msu2Book = bookshelfScene.createBook('msu2', {
    width: 0.12,
    height: 0.65,
    depth: 0.2,
    color: colors.red,
    content: 'MSU',
    shelf: 'B',
    section: 4
});

const inventivesBook = bookshelfScene.createBook('inventives', {
    width: 0.25,
    height: 0.75,
    depth: 0.2,
    color: colors.yellowGreen,
    content: 'Inventives',
    shelf: 'C',
    section: 1
});

const syeraBook = bookshelfScene.createBook('syera', {
    width: 0.18,
    height: 0.55,
    depth: 0.2,
    color: colors.blue,
    content: 'Syera',
    shelf: 'C',
    section: 2
});

// Initialize modals
function initializeModals() {
    const modalTemplates = {
        education: document.getElementById('educationModalTemplate'),
        job: document.getElementById('jobModalTemplate'),
        businessCard: document.getElementById('businessCardModalTemplate'),
        bookReviews: document.getElementById('bookReviewsModalTemplate')
    };

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal-container')) {
            event.target.classList.remove('modal-active');
        }
    };

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
