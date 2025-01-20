import { colors } from './constants.js';

// Book configurations organized by shelf and section
export const shelfConfigs = {
    A: { // Education and Skills
        sections: {
            1: ['bachelors', 'masters'],  // Education
            3: ['skillsA', 'skillsB', 'skillsC', 'skillsD']  // Skills/Certifications
        }
    },
    B: { // Projects and Reviews
        sections: {
            1: ['projectsA', 'projectsB', 'projectsC', 'projectsD', 'projectsE', 'projectsF', 'projectsG'],
            3: ['reviewsA', 'reviewsB'],
            4: ['bookReviews', 'recentReads']
        }
    },
    C: { // Professional Experience and Contact
        sections: {
            1: ['blog'],
            2: ['misc'],
            3: ['translate', 'montco', 'aei', 'msu1', 'msu2', 'inventives', 'syera'],
            4: ['contact']
        }
    }
};

export const bookConfigs = {
    // Education books
    education: {
        bachelors: {
            id: 'bachelors',
            width: 6,
            height: 9.6,
            thickness: 3,
            color: colors.brown,
            content: 'B.S. Chemical Engineering & German',
        },
        masters: {
            id: 'masters',
            width: 6,
            height: 9.6,
            thickness: 3,
            color: colors.red,
            content: 'M.S. Computational Linguistics',
        }
    },

    // Skills/Certifications books
    skills: {
        skillsA: {
            id: 'skillsA',
            width: 5.5,
            height: 7.2,
            thickness: 2,
            color: colors.gray,
            content: 'Programming Languages'
        },
        skillsB: {
            id: 'skillsB',
            width: 3,
            height: 7.2,
            thickness: 1.5,
            color: colors.purple,
            content: 'Tools & Frameworks'
        },
        skillsC: {
            id: 'skillsC',
            width: 3.5,
            height: 7.2,
            thickness: 1.5,
            color: colors.purple,
            content: 'Languages'
        },
        skillsD: {
            id: 'skillsD',
            width: 5,
            height: 8,
            thickness: 2,
            color: colors.yellowGreen,
            content: 'Other Skills'
        }
    },
    
    // Professional experience books (middle shelf)
    experience: {
        translate: {
            id: 'translate',
            width: 4,
            height: 7.8,
            thickness: 2.4,
            color: colors.yellow,
            content: 'Freelance Translation',
        },
        montco: {
            id: 'montco',
            width: 4,
            height: 7.8,
            thickness: 2.4,
            color: colors.purple,
            content: 'Montco Hunger Solutions',
        },
        aei: {
            id: 'aei',
            width: 3.5,
            height: 7.2,
            thickness: 2,
            color: colors.gray,
            content: 'AEI',
        },
        msu1: {
            id: 'msu1',
            width: 3,
            height: 7.2,
            thickness: 2,
            color: colors.red,
            content: 'MSU',
        },
        msu2: {
            id: 'msu2',
            width: 2.5,
            height: 8,
            thickness: 2,
            color: colors.red,
            content: 'MSU',
        },
        inventives: {
            id: 'inventives',
            width: 4,
            height: 9,
            thickness: 2.4,
            color: colors.yellowGreen,
            content: 'Inventives',
        },
        syera: {
            id: 'syera',
            width: 3.5,
            height: 6.5,
            thickness: 2,
            color: colors.blue,
            content: 'Syera',
        }
    },

    // Project books
    projects: {
        projectsA: {
            id: 'projectsA',
            width: 5.5,
            height: 6.5,
            thickness: 2,
            color: colors.gray,
            content: 'Project A',
        },
        projectsB: {
            id: 'projectsB',
            width: 3,
            height: 7.5,
            thickness: 1.5,
            color: colors.yellowGreen,
            content: 'Project B'
        },
        projectsC: {
            id: 'projectsC',
            width: 4,
            height: 7.3,
            thickness: 1.8,
            color: colors.brown,
            content: 'Project C'
        },
        projectsD: {
            id: 'projectsD',
            width: 3.5,
            height: 7.0,
            thickness: 1.5,
            color: colors.gray,
            content: 'Project D'
        },
        projectsE: {
            id: 'projectsE',
            width: 2.7,
            height: 6.5,
            thickness: 1.5,
            color: colors.blue,
            content: 'Project E'
        },
        projectsF: {
            id: 'projectsF',
            width: 4,
            height: 6.5,
            thickness: 1.8,
            color: colors.red,
            content: 'Project F'
        },
        projectsG: {
            id: 'projectsG',
            width: 3.5,
            height: 6.5,
            thickness: 1.5,
            color: colors.green,
            content: 'Project G'
        }
    },

    // Review books
    reviews: {
        reviewsA: {
            id: 'reviewsA',
            width: 5.5,
            height: 6.5,
            thickness: 2,
            color: colors.green,
            content: 'Reviews A'
        },
        reviewsB: {
            id: 'reviewsB',
            width: 3,
            height: 6.5,
            thickness: 1.5,
            color: colors.blue,
            content: 'Reviews B'
        },
        bookReviews: {
            id: 'bookReviews',
            width: 4,
            height: 6.5,
            thickness: 1.8,
            color: colors.tan,
            content: 'Book Reviews'
        },
        recentReads: {
            id: 'recentReads',
            width: 3.5,
            height: 6.5,
            thickness: 1.5,
            color: colors.gray,
            content: 'Recent Reads'
        }
    },

    // Other books
    other: {
        blog: {
            id: 'blog',
            width: 6,
            height: 1,
            thickness: 8,
            color: colors.white,
            content: 'Blog'
        },
        misc: {
            id: 'misc',
            width: 2.5,
            height: 6.5,
            thickness: 1.2,
            color: colors.blue,
            content: 'Miscellaneous'
        },
        contact: {
            id: 'contact',
            width: 2,
            height: 1,
            thickness: 3,
            color: colors.white,
            content: 'Contact Info'
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
