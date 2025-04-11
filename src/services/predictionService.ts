
// This service simulates ML model prediction since we're not using an actual ML model in this demo
export interface PredictionResult {
  grade: number;
  confidence: number;
  probabilities: number[];
}

export const predictImage = async (imageFile: File): Promise<PredictionResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate a deterministic but seemingly random result based on the file name
  // This is just for demonstration purposes
  const seed = Array.from(imageFile.name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const randomValue = (seed % 100) / 100;
  
  // Determine grade based on random value
  let grade: number;
  if (randomValue < 0.25) {
    grade = 0;
  } else if (randomValue < 0.45) {
    grade = 1;
  } else if (randomValue < 0.65) {
    grade = 2;
  } else if (randomValue < 0.85) {
    grade = 3;
  } else {
    grade = 4;
  }
  
  // Generate probabilities with highest for the selected grade
  const baseProbabilities = [0.05, 0.05, 0.05, 0.05, 0.05];
  
  // Add extra probability to the chosen grade
  const extraProb = 0.6 + (randomValue * 0.15);
  baseProbabilities[grade] += extraProb;
  
  // Distribute remaining probability
  const remainingProb = 1 - baseProbabilities.reduce((a, b) => a + b, 0);
  
  // Distribute the remaining across all grades with some randomness
  const normalizedProbabilities = baseProbabilities.map((prob, i) => {
    const adjustment = i === grade ? 0.4 : 0.15;
    return prob + (remainingProb * adjustment * (1 + Math.sin(seed + i)));
  });
  
  // Normalize to ensure sum is 1
  const sum = normalizedProbabilities.reduce((a, b) => a + b, 0);
  const finalProbabilities = normalizedProbabilities.map(p => p / sum);
  
  return {
    grade,
    confidence: finalProbabilities[grade],
    probabilities: finalProbabilities
  };
};
