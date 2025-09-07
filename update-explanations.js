const fs = require('fs');
const path = require('path');

// Read the file
const filePath = path.join(__dirname, 'data', 'final-exam-exercises.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// Function to update explanation by adding the correct answer
function updateExplanation(content) {
  // Pattern to match exercise objects
  const exercisePattern =
    /{\s*id:\s*'([^']+)',[\s\S]*?correctAnswer:\s*'([^']+)',\s*explanation:\s*'([^']+)',/g;

  return content.replace(
    exercisePattern,
    (match, id, correctAnswer, explanation) => {
      // Skip if explanation already starts with "Correct answer:"
      if (explanation.startsWith('Correct answer:')) {
        return match;
      }

      // Create new explanation with correct answer included
      const newExplanation = `Correct answer: "${correctAnswer}" ${explanation}`;

      // Replace the explanation in the match
      return match.replace(
        `explanation: '${explanation}',`,
        `explanation: '${newExplanation}',`,
      );
    },
  );
}

// Update the content
const updatedContent = updateExplanation(fileContent);

// Write back to file
fs.writeFileSync(filePath, updatedContent, 'utf-8');

console.log('Explanations updated successfully!');
