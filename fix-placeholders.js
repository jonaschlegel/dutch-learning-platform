const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'data', 'final-exam-exercises.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// Replace all underscores with dots
const updatedContent = fileContent.replace(/_______/g, '..........');

// Write back to file
fs.writeFileSync(filePath, updatedContent, 'utf-8');

console.log('Placeholders updated successfully! All _______ changed to ..........');
