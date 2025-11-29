export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Word {
    id: string;
    term: string;
    definition: string;
    example: string;
    synonyms: string[];
    level: Level;
    category: string;
}

export const vocabularyData: Word[] = [
    // Beginner
    {
        id: '1',
        term: 'Happy',
        definition: 'Feeling or showing pleasure or contentment.',
        example: 'She looked very happy about her new job.',
        synonyms: ['Joyful', 'Cheerful', 'Delighted'],
        level: 'Beginner',
        category: 'Emotions',
    },
    {
        id: '2',
        term: 'Big',
        definition: 'Of considerable size, extent, or intensity.',
        example: 'They have a big house in the country.',
        synonyms: ['Large', 'Huge', 'Giant'],
        level: 'Beginner',
        category: 'Adjectives',
    },
    {
        id: '3',
        term: 'Run',
        definition: 'Move at a speed faster than a walk.',
        example: 'The dog likes to run in the park.',
        synonyms: ['Sprint', 'Jog', 'Dash'],
        level: 'Beginner',
        category: 'Actions',
    },
    // Intermediate
    {
        id: '4',
        term: 'Analyze',
        definition: 'Examine methodically and in detail the constitution or structure of something.',
        example: 'We need to analyze the data before making a decision.',
        synonyms: ['Examine', 'Inspect', 'Study'],
        level: 'Intermediate',
        category: 'Academic',
    },
    {
        id: '5',
        term: 'Benevolent',
        definition: 'Well meaning and kindly.',
        example: 'The benevolent gentleman left a sum of money to the orphanage.',
        synonyms: ['Kind', 'Generous', 'Charitable'],
        level: 'Intermediate',
        category: 'Personality',
    },
    {
        id: '6',
        term: 'Diligent',
        definition: 'Having or showing care and conscientiousness in one\'s work or duties.',
        example: 'She is a diligent student who always does her homework.',
        synonyms: ['Hard-working', 'Assiduous', 'Conscientious'],
        level: 'Intermediate',
        category: 'Personality',
    },
    // Advanced
    {
        id: '7',
        term: 'Ephemeral',
        definition: 'Lasting for a very short time.',
        example: 'Fashions are ephemeral, changing with every season.',
        synonyms: ['Transitory', 'Fleeting', 'Short-lived'],
        level: 'Advanced',
        category: 'Abstract',
    },
    {
        id: '8',
        term: 'Ubiquitous',
        definition: 'Present, appearing, or found everywhere.',
        example: 'Smartphones have become ubiquitous in modern society.',
        synonyms: ['Omnipresent', 'Pervasive', 'Universal'],
        level: 'Advanced',
        category: 'Abstract',
    },
    {
        id: '9',
        term: 'Cacophony',
        definition: 'A harsh, discordant mixture of sounds.',
        example: 'A cacophony of deafening alarm bells.',
        synonyms: ['Din', 'Racket', 'Noise'],
        level: 'Advanced',
        category: 'Sensory',
    },
];

export const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

export const categories = Array.from(new Set(vocabularyData.map((word) => word.category)));
