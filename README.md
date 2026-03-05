# Book-o-rama
Your personal library for scanned books.

## Getting Started
To run this application locally:

1. \`npm install\`
2. \`npm run dev\`

Then visit the URL provided in the terminal (usually \`http://localhost:5173\`).

## Adding your book
1. Go into the \`public\` folder.
2. Create a folder named \`my-book\`.
3. Place all your scanned JPEG files inside \`my-book\`, naming them sequentially: \`page1.jpg\`, \`page2.jpg\`, \`page3.jpg\`, etc.
4. In \`src/pages/Library.jsx\`, update the \`MOCK_BOOKS\` array entry to point to your new folder and set the correct \`totalPages\`.
