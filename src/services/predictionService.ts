
// This service simulates ML model prediction since we're not using an actual ML model in this demo
export interface PredictionResult {
  grade: number;
  confidence: number;
  probabilities: number[];
}

export const predictImage = async (imageFile: File): Promise<PredictionResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // Read first part of the file to generate a more unique hash
    const arrayBuffer = await imageFile.slice(0, 1024).arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Generate a more unique seed based on file content and metadata
    let seed = 0;
    for (let i = 0; i < Math.min(50, bytes.length); i++) {
      seed += bytes[i];
    }
    
    // Add file size and modification date to seed
    seed += imageFile.size % 100;
    seed += Math.floor(imageFile.lastModified / 1000) % 100;
    
    // Normalize to 0-1 range
    const randomValue = (seed % 100) / 100;
    
    // Determine grade based on random value with a distribution that favors middle grades
    let grade: number;
    if (randomValue < 0.15) {
      grade = 0;
    } else if (randomValue < 0.35) {
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
    const extraProb = 0.55 + (randomValue * 0.2);
    baseProbabilities[grade] += extraProb;
    
    // Distribute remaining probability
    const remainingProb = 1 - baseProbabilities.reduce((a, b) => a + b, 0);
    
    // Distribute the remaining across all grades with some randomness
    const normalizedProbabilities = baseProbabilities.map((prob, i) => {
      // Neighboring grades get more probability
      const distance = Math.abs(i - grade);
      const adjustment = 1 / (distance + 1) * 0.3;
      return prob + (remainingProb * adjustment * (1 + Math.sin(seed + i)));
    });
    
    // Normalize to ensure sum is 1
    const sum = normalizedProbabilities.reduce((a, b) => a + b, 0);
    const finalProbabilities = normalizedProbabilities.map(p => p / sum);
    
    console.log(`Generated prediction for ${imageFile.name}:`, {
      grade,
      seed,
      randomValue,
      probabilities: finalProbabilities
    });
    
    return {
      grade,
      confidence: finalProbabilities[grade],
      probabilities: finalProbabilities
    };
  } catch (e) {
    console.error("Error generating prediction:", e);
    
    // Fallback to simple filename-based prediction
    const seed = Array.from(imageFile.name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const randomValue = (seed % 100) / 100;
    
    const grade = Math.floor(randomValue * 5);
    const probabilities = [0.1, 0.1, 0.1, 0.1, 0.1];
    probabilities[grade] = 0.6;
    
    return {
      grade,
      confidence: probabilities[grade],
      probabilities
    };
  }
};
