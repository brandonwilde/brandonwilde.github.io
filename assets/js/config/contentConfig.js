import { colors } from './constants.js';

// Book configurations by shelf
export const bookConfigs = {
    // Education books (top shelf)
    education: {
        bachelors: {
            id: 'bachelors',
            width: 6,
            height: 9.6,
            thickness: 3,
            color: colors.red,
            content: 'B.S. Chemical Engineering & German',
            shelf: 'A',
            section: 1
        },
        masters: {
            id: 'masters',
            width: 6,
            height: 9.6,
            thickness: 3,
            color: colors.red,
            content: 'M.S. Computational Linguistics',
            shelf: 'A',
            section: 2
        }
    },
    
    // Professional experience books (middle shelf)
    professional: {
        translate: {
            id: 'translate',
            width: 6,
            height: 7.2,
            thickness: 2.4,
            color: colors.yellow,
            content: 'Freelance Translation',
            shelf: 'B',
            section: 1
        },
        montco: {
            id: 'montco',
            width: 5.5,
            height: 7.8,
            thickness: 2.4,
            color: colors.purple,
            content: 'Montco Hunger Solutions',
            shelf: 'B',
            section: 2
        },
        aei: {
            id: 'aei',
            width: 6,
            height: 8.4,
            thickness: 2.4,
            color: colors.gray,
            content: 'AEI',
            shelf: 'B',
            section: 3
        },
        msu1: {
            id: 'msu1',
            width: 6,
            height: 7.2,
            thickness: 2.4,
            color: colors.red,
            content: 'MSU',
            shelf: 'B',
            section: 4
        },
        msu2: {
            id: 'msu2',
            width: 6,
            height: 7.8,
            thickness: 2.4,
            color: colors.red,
            content: 'MSU',
            shelf: 'B',
            section: 4
        }
    },
    
    // Recent work books (bottom shelf)
    recent: {
        inventives: {
            id: 'inventives',
            width: 6.1,
            height: 9,
            thickness: 2.4,
            color: colors.yellowGreen,
            content: 'Inventives',
            shelf: 'C',
            section: 1
        },
        syera: {
            id: 'syera',
            width: 5.9,
            height: 6.6,
            thickness: 2.4,
            color: colors.blue,
            content: 'Syera',
            shelf: 'C',
            section: 2
        }
    }
};

// Modal configurations
export const modalConfig = {
    templates: {
        education: 'educationModalTemplate',
        job: 'jobModalTemplate',
        businessCard: 'businessCardModalTemplate',
        bookReviews: 'bookReviewsModalTemplate'
    },
    closeOnOutsideClick: true
};

// Scene configurations
export const sceneConfig = {
    // Add any scene-specific configurations here
    // For example, camera positions, lighting setups, etc.
    // These can be moved from constants.js if they're more configuration than constant
};
