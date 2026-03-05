// Helper function to handle any sequential numbering scheme easily
const createBook = ({ id, title, author, folder, prefix, suffix, padding, totalPages }) => {
    return {
        id,
        title,
        author,
        totalPages,
        // Generates the correct filename from the page index (e.g., 0 -> "001")
        getPageImage: (pageIndex) => {
            const numStr = String(pageIndex + 1).padStart(padding, '0');
            return `${folder}/${prefix}${numStr}${suffix}`;
        },
        // The cover is just the first page
        get coverImage() {
            return this.getPageImage(0);
        }
    };
};

export const MOCK_BOOKS = [
    // ADD YOUR SCANNED BOOK HERE:
    // Update the prefix, suffix, and padding below to match how your files are actually named.
    createBook({
        id: 'my-scanned-book',
        title: 'STAR',
        author: 'Ameya Chiyyodu',

        folder: '/my-scanned-book',
        prefix: '20260303192329_', // The exact text before the number
        suffix: '.jpg',            // The file extension
        padding: 3,                // How many zeros? (3 means '001', 1 means '1')
        totalPages: 24,            // Total number of images
    }),

    // This is the demo book so you can still see how it works while you add yours
    createBook({
        id: 'mock-book',
        title: 'Example Scanned Book',
        author: 'Demo',
        folder: '/mock-book',
        prefix: 'page',
        suffix: '.jpg',
        padding: 1,
        totalPages: 3,
    })
];
