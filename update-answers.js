const fs = require('fs');
const path = require('path');

// Read the current file
const filePath = path.join(__dirname, 'data', 'final-exam-exercises.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Function to create multiple answer variations (with and without punctuation)
function createAnswerVariations(baseAnswer) {
  const variations = [baseAnswer];

  // Add version without ending punctuation
  if (baseAnswer.endsWith('.') || baseAnswer.endsWith(',')) {
    variations.push(baseAnswer.slice(0, -1));
  }

  // Add version with punctuation if it doesn't have any
  if (!baseAnswer.endsWith('.') && !baseAnswer.endsWith(',')) {
    variations.push(baseAnswer + '.');
  }

  return variations;
}

// Function to update single string answers to arrays
function updateAnswers() {
  // Pattern to match correctAnswer: 'single string' format
  const singleAnswerPattern = /correctAnswer:\s*'([^']+)'/g;

  content = content.replace(singleAnswerPattern, (match, answer) => {
    // Skip if it's already an array (contains [ or ])
    if (match.includes('[') || match.includes(']')) {
      return match;
    }

    const variations = createAnswerVariations(answer);
    const arrayString = "['" + variations.join("', '") + "']";
    return `correctAnswer: ${arrayString}`;
  });

  return content;
}

// Update the content
const updatedContent = updateAnswers();

// Write back to file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('Updated final-exam-exercises.ts with multiple answer variations');
console.log(
  '✓ Added punctuation-optional variations for all single-string answers',
);
